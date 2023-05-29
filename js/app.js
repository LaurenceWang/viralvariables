import * as math from './math.js';

let originalPopulation = 15000;
let deads = 0;
let lambda = 50;
let count = 0; // Nombre de jours
let immunityCount = 0;
let malades = 0;
let nbMalades = 0;
let addSick = 0;
let addContamination = 0;
const eventType = ["depistage", "aleas", "guerison", "surprise", "immunity"];

let endOfRound = true;
let eventEnded = true;

//recuperation div
let gameContainer = document.getElementById('game');
let countryContainer = document.getElementById('country-choice');
let virusContainer = document.getElementById('virus-choice');
let popEvoContainer = document.getElementById('popEvolution');
let eventContainer = document.getElementById('event');
let eventNameContainer = document.getElementById('eventName');
let eventContentContainer = document.getElementById('eventContent');
let guerisonContentContainer = document.getElementById('guerisonContainer');
let guerisonPresentationContainer = document.getElementById('guerison-presentation');
let depistageContentContainer = document.getElementById('depistageContainer');
let depistagePresentationContainer = document.getElementById('depistage-presentation');

let geoMalade = document.getElementById('geo_malade');
let geoPasMalade = document.getElementById('geo_pasmalade');
let statiMalade = document.getElementById('stati_malade');
let statiPasMalade = document.getElementById('stati_pasmalade');
let poissanMalade = document.getElementById('poissan_malade');
let poissanPasMalade = document.getElementById('poissan_pasmalade');

//recuperation boutons
let nextRoundbtn = document.getElementById('nextRound');
let eventBtn = document.getElementById('dice');

window.onload = function () {
    let modal = document.getElementById('modal');
    let modalClose = document.getElementById('modal-close');
    let countryContainer = document.getElementById('country-choice');
    let virusContainer = document.getElementById('virus-choice');
  
    modal.style.display = 'block';
  
    modalClose.onclick = function () {
      modal.style.display = 'none';
      countryContainer.style.display = 'block';
    };
  
    let countryClose = document.getElementsByClassName('close-country-button');
    for (let i = 0; i < countryClose.length; i++) {
      countryClose[i].onclick = function () {
        if (i==0){
            originalPopulation = math.generateRandomFromNormalDistribution(10_000, 500);
        }
        if (i==1){
            originalPopulation = math.generateRandomFromNormalDistribution(70_000, 3_500);
        }
    
        if (i==2){
            originalPopulation = math.generateRandomFromNormalDistribution(300_000, 15_000);
        }
        console.log("Updated originalPopulation:", originalPopulation);
        countryContainer.style.display = 'none';
        virusContainer.style.display = 'block';
      };
    }
    let virusClose = document.getElementsByClassName('close-virus-button');
        for (let i = 0; i < virusClose.length; i++) {
        let lambdaValue;
        if (i == 0) {
            lambdaValue = 10;
        } else if (i == 1) {
            lambdaValue = 50;
        } else if (i == 2) {
            lambdaValue = 100;
        }

  virusClose[i].onclick = function () {
    lambda = lambdaValue;
    console.log("Updated contamination:", lambda);
    virusContainer.style.display = 'none';
    gameContainer.style.display = 'block';
  };
}
  };
  

//fin de tour
nextRoundbtn.onclick = () => {
  maladeEvolution(addSick, addContamination);
  endOfRound = false;
  eventEnded = false;
  eventContainer.style.display = "none";
  guerisonContentContainer.style.display = "none";
  depistageContentContainer.style.display = "none";
  updateState();
};

eventBtn.onclick = () => {
  let resultEvent = eventType[Math.floor(Math.random() * eventType.length)];
  addText(resultEvent, eventNameContainer);

  //on appelle la fonction qui correspond à l'event
  eval(resultEvent + "()");
  eventContainer.style.display = "flex";
};

function updateState() {
  //rendre les boutons inactifs
  if (!endOfRound) {
    nextRoundbtn.classList.add('disabled');
  } else {
    nextRoundbtn.classList.remove('disabled');
  }

  if (!eventEnded) {
    eventBtn.classList.remove('disabled');
  } else {
    eventBtn.classList.add('disabled');
  }
}

function changePopulation(population) {
  originalPopulation = population;
  console.log("Updated originalPopulation:", originalPopulation);
}

function changeVirus(contamination) {
    lambda = contamination;
    console.log("Updated contamination:", contamination);
  }

/***** fonctions des events *****/
function depistage() {
    addText(`${math.rand()}`, statiMalade);
    addText(`${math.rand()}`, statiPasMalade);
    addText(`${math.rand()}`, geoMalade);
    addText(`${math.rand()}`, geoPasMalade);
    addText(`${math.rand()}`, poissanMalade);
    addText(`${math.rand()}`, poissanPasMalade);
    depistageContentContainer.style.display = "block";
    depistagePresentationContainer.style.display = "block";


    let proba = 0; 

    let dbtn1 =  document.getElementById('d1');
    let dbtn2 =  document.getElementById('d2');
    let dbtn3 =  document.getElementById('d3');

    dbtn1.onclick = () => {
        proba = geoMalade;
        depistageChoice(proba)
    };

    dbtn2.onclick = () => {
        proba = statiMalade;
        depistageChoice(proba)
    };

    dbtn3.onclick = () => {
        proba = poissanMalade;
        depistageChoice(proba)
    };

    endOfRound = true;
    eventEnded = true;
    updateState();
}

function depistageChoice(proba){


    let resultContainer = document.getElementById('depistage-result');
    depistagePresentationContainer.style.display = "none";

    addContamination=(math.binomiale(malades, Number(proba.innerText)))*3;
    addText(`Aie ${Math.abs(addContamination/3)} personnes ont été déclarées négatives alors qu'elles étaient bien malades et ont fait ${Math.abs(addContamination)} contaminations`, resultContainer);
}

function aleas() {
    endOfRound = true;
    eventEnded = true;

    let pop = {
        sick: malades,
        total: originalPopulation
    }
    const newDeads = math.markovChain(pop)
    deads += newDeads
    malades -= pop.sick
    originalPopulation -= newDeads
    addText(`Des mouches sont encores tombées, ${newDeads} nouvelles victime de l'épidémie, pour un total de ${deads} morts`, eventContentContainer);

    updateState();
}

function immunity() {
    addText("Immunité générale !!", eventContentContainer);
    endOfRound = true;
    eventEnded = true;
    immunityCount = math.generateImmunityDuration();
    updateState();
}


function guerison() {

    addText("", eventContentContainer);
    guerisonContentContainer.style.display = "block";
    guerisonPresentationContainer.style.display = "block";


    let proba = 0; 

    let gbtn1 =  document.getElementById('g1');
    let gbtn2 =  document.getElementById('g2');
    let gbtn3 =  document.getElementById('g3');

    gbtn1.onclick = () => {
        proba = 0.3;
        guerisonChoice(proba, 0.5)
    };

    gbtn2.onclick = () => {
        proba = 0.5;
        guerisonChoice(proba, 0.25)
    };

    gbtn3.onclick = () => {
        proba = 0.9;
        guerisonChoice(proba, 0.10)
    };


    endOfRound = true;
    eventEnded = true;
    updateState();
}

function guerisonChoice(proba, percentage){

    let resultContainer = document.getElementById('guerison-result');
    guerisonPresentationContainer.style.display = "none";

    if(math.binomiale(3, proba) >= 2){
        addSick = - Math.floor(nbMalades*percentage);
        addText(`Super !! ${Math.abs(addSick)} personnes ont été guéri par le remède`, resultContainer);
    }else{
        addText("Zut...Une mauvaise rumeur autour du remède a dissuadé la population de l'utiliser", resultContainer);
    }
}

function surprise() {

    let playerNumber = math.rollDice(100); //on tire un nombre aléatoire entre 1 et 1000
    let successNumber = math.successGeo();
    let msgNumber = math.rollDice(4);

    if (playerNumber > successNumber) {
        addSick = math.rollDice(malades/2); //Valeur a ajuster ici 
        addText(negSurprise(msgNumber, addSick), eventContentContainer)

        console.log("event negatif")
    } else {
        addSick = -math.rollDice(malades/2);
        addText(posSurprise(msgNumber, addSick), eventContentContainer)

        console.log("event positif")
    }

    endOfRound = true;
    eventEnded = true;
    updateState();
}


/*** text ***/

function posSurprise(messageNb, sickNb){
    let posSurprises = [`Un médecin étranger en visite a guéri ${Math.abs(sickNb)} personnes ! Malheureusement il est rentré dans son pays après sa bonne action`, `Une variante étrange du virus a permi de l'éliminer chez ${Math.abs(sickNb)} personnes ! Malheureusement elle ne s'est pas répandue.`, `${Math.abs(sickNb)} ont mangé un doliprane...tiens ça va mieux !`, `${Math.abs(sickNb)} personnes ont suivi l'incroyable cours de probabilités d'IMAC2 et se sentent beaucoup mieux`]

    return posSurprises[messageNb];
}

function negSurprise(messageNb, sickNb){
    let negSurprises = [`${sickNb} personnes ont mangé un drôle de tacos hier...Oh`, `Le pays ennemi envoie une armée de moustiques porteur du virus !! ${sickNb} personnes ont été piqués`, `L'âge de départ à la retraite a encore reculé... le corps médical décide de faire grêve...${sickNb} personnes en plus attrapent le virus`, `${sickNb} étudiants ont enchainé des nuits blanches pour finir leurs projets...ils sont si fatigués que leur corp n'a pas produit d'anti-corps` ]

    return negSurprises[messageNb];
}

function addText(text, div){
    let message = document.createElement('p');
    message.innerHTML = text;
    div.innerHTML = '';
    div.appendChild(message);
}


/** malade evolution **/

function maladeEvolution(eventResult, contaminationResult) {
    count++;
    let popText;
    let dailySicks = math.poissonDistribution(lambda)

    if (immunityCount > 0) { // Immunity state has been triggered by immunity event
        dailySicks = 0; // If immunized, no sickness for today
        // While on immunity we count how many days does it last
        immunityCount--;
    }

    nbMalades = dailySicks + eventResult + contaminationResult;
    malades += nbMalades;
    addSick = 0;
    addContamination = 0;
    malades = Math.min(malades, originalPopulation)

    popText = `${nbMalades} nouvelles personnes ont été contaminées aujourd'hui dont ${eventResult} 
                causés par l'évènement de la veille et ${contaminationResult} causés par contamination. 
                <br> Le nombre de personnes contaminées total JOUR ${count} est ${malades} <br> 
                Population en bonne santé : ${originalPopulation - malades}
                Nombre de décès: ${deads}`;
    addText(popText, popEvoContainer);
}

//j'ai changé de fonction pour la loi de poisson cf math.js
//
//probablement à utiliser pour la vision particules
function nbMaladeMacro(Y, lambda) { // elle renvoit beaucoup de fois 0, c'est abérant ou j'ai pas compris un truc ?
    let nbMalades = 0;
    for (let i = 0; i < Y; i++) {
        const p = math.poisson(lambda, i);
        //const rand = Math.random();
        if (math.rand() < p) {
            nbMalades = i;
            break;
        }
    }
    return nbMalades;
}


//const nbMalades = nbMaladeMacro(Y, lambda);
//console.log(`Le nombre de malades contaminés dans une population de ${Y} personnes avec un paramètre lambda de ${lambda} est ${nbMalades}`);
