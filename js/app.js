//import * as stats from './stats.js';
import * as math from './math.js';
import { chartData, eventData, surpriseData, immuData, guerisonData, aleaData, depistageData } from './stats.js';

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

//evoChart
let sickEvolution = [];
let days = [];
let newSick = [];
let dead = [];

//eventChart
let depiCount = 0;
let aleaCount = 0;
let guerisonCount = 0;
let surpCount = 0;
let immuCount = 0;


//surpriseChart
let surpRoundNb = [];
let playerNb = [];
let successNb = [];
let addSickNb = [];

//immunityChart
let immunityNb = [];

//guerisonChart
let guerisonName = ["Statimune", "Dolimac", "Gausspray"];
let guChoice1 = 0;
let guChoice2 = 0;
let guChoice3 = 0;

let gueSuccess1 = 0;
let gueSuccess2 = 0;
let gueSuccess3 = 0;


//aleaChart 
let aleaRoundNb = [];
let aleaNb = [];

//depistageChart
let depistageName = ["Géomédic", "Statistix", "Poissanté"];
let dpChoice1 = 0;
let dpChoice2 = 0;
let dpChoice3 = 0;

let dpSuccess1 = 0;
let dpSuccess2 = 0;
let dpSuccess3 = 0;


let endOfRound = true;
let eventEnded = true;

//recuperation div
const ctx = document.getElementById('stats');
const ctx2 = document.getElementById('stats2');
const ctx3 = document.getElementById('stats3');
const ctx4 = document.getElementById('stats4');
const ctx5 = document.getElementById('stats5');
const ctx6 = document.getElementById('stats6');
const ctx7 = document.getElementById('stats7');
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

let  statBtn = document.getElementById('show-stats');
statBtn.style.display = "none";


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
  endGame();

};

eventBtn.onclick = () => {
  let resultEvent = eventType[Math.floor(Math.random() * eventType.length)];
  addText(resultEvent, eventNameContainer);

  //on appelle la fonction qui correspond à l'event
  eval(resultEvent + "()");
  eventContainer.style.display = "flex";
};

function endGame(){
    
    if(malades + deads >= originalPopulation ){
        console.log("bad end");
        nextRoundbtn.classList.add('disabled');
        eventBtn.classList.add('disabled');

        statBtn.style.display = "block";
        addText("Perdu ! ", gameContainer);
       
    }

    if(count >= 30){
        statBtn.style.display = "block";

        if(originalPopulation - (malades + deads) <= 0.1 * originalPopulation){
            nextRoundbtn.classList.add('disabled');
            eventBtn.classList.add('disabled');
            addText("Perdu ! ", gameContainer)
         
            console.log("bad end")
        }else{
            nextRoundbtn.classList.add('disabled');
            eventBtn.classList.add('disabled');
            addText("Gagné ! ", gameContainer)
            

          
            console.log("good end")
        }

    } 

}

statBtn.onclick = () => {
    let eventNb = [depiCount, aleaCount, guerisonCount, surpCount, immuCount];
    let successGuNb = [gueSuccess1, gueSuccess2, gueSuccess3];
    let choiceGuNb = [guChoice1, guChoice2, guChoice3];

    let contaminationNb = [dpSuccess1, dpSuccess2, dpSuccess3];
    let choiceDpNb = [dpChoice1, dpChoice2, dpChoice3];


    chartData(ctx, sickEvolution, days, newSick, dead);
    eventData(ctx2, eventType, eventNb);
    surpriseData(ctx3, surpRoundNb, playerNb, successNb, addSickNb);
    immuData(ctx4, days,immunityNb);
    guerisonData(ctx5, guerisonName, successGuNb, choiceGuNb);
    aleaData(ctx6, aleaRoundNb, aleaNb);
    depistageData(ctx7, depistageName, contaminationNb, choiceDpNb)
}


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
    depiCount++
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
        dpChoice1++;
       
        proba = geoMalade;
        dpSuccess1 +=  depistageChoice(proba)
    };

    dbtn2.onclick = () => {
        dpChoice2++;
        proba = statiMalade;
        dpSuccess2 += depistageChoice(proba)
    };

    dbtn3.onclick = () => {
        dpChoice3++;
        proba = poissanMalade;
        dpSuccess3 += depistageChoice(proba)
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

    return addContamination;

}

function aleas() {
    aleaCount++;
    aleaRoundNb.push(count);
    endOfRound = true;
    eventEnded = true;

    let pop = {
        sick: malades,
        total: originalPopulation
    }
    const newDeads = math.markovChain(pop)
    aleaNb.push(newDeads);
    deads += newDeads
    malades -= pop.sick
    originalPopulation -= newDeads
    addText(`Des mouches sont encores tombées, ${newDeads} nouvelles victime de l'épidémie, pour un total de ${deads} morts`, eventContentContainer);

    updateState();
}

function immunity() {
    immuCount++;
    addText("Immunité générale !!", eventContentContainer);
    endOfRound = true;
    eventEnded = true;
    immunityCount = math.generateImmunityDuration();
    updateState();
}


function guerison() {
    guerisonCount++
    addText("", eventContentContainer);
    guerisonContentContainer.style.display = "block";
    guerisonPresentationContainer.style.display = "block";


    let proba = 0; 

    let gbtn1 =  document.getElementById('g1');
    let gbtn2 =  document.getElementById('g2');
    let gbtn3 =  document.getElementById('g3');

    gbtn1.onclick = () => {
        guChoice1++
        proba = 0.3;
        guerisonChoice(proba, 0.5)
    };

    gbtn2.onclick = () => {
        guChoice2++
        proba = 0.5;
        guerisonChoice(proba, 0.25)
    };

    gbtn3.onclick = () => {
        guChoice3++
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

        //que qqun me pardonne pour ce code cracra

        if(proba==0.3){
            gueSuccess1+=  -addSick
        }

        if(proba==0.5){
            gueSuccess2+= -addSick

        }

        if(proba==0.9){
            gueSuccess3+= -addSick
        }   

    }else{
        addText("Zut...Une mauvaise rumeur autour du remède a dissuadé la population de l'utiliser", resultContainer);
    }
}

function surprise() {
    surpCount++
    surpRoundNb.push(count);

    let playerNumber = math.rollDice(100); //on tire un nombre aléatoire entre 1 et 1000
    playerNb.push(playerNumber);
 
    let successNumber = math.successGeo();

    successNb.push(successNumber);

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

    addSickNb.push(addSick);

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
    days.push(count);
    let popText;
    let dailySicks = math.poissonDistribution(lambda)
    immunityNb.push( immunityCount);
    if (immunityCount > 0) { // Immunity state has been triggered by immunity event
        dailySicks = 0; // If immunized, no sickness for today
        // While on immunity we count how many days does it last
        immunityCount--;
    }

    nbMalades = dailySicks + eventResult + contaminationResult;
    newSick.push(nbMalades);
    malades += nbMalades;
    addSick = 0;
    addContamination = 0;
    malades = Math.min(malades, originalPopulation)
    sickEvolution.push(malades);
    dead.push(deads);

    popText = `${nbMalades} nouvelles personnes ont été contaminées aujourd'hui dont ${eventResult} 
                causés par l'évènement de la veille et ${contaminationResult} causés par contamination. 
                <br> Le nombre de personnes contaminées total JOUR ${count} est ${malades} <br> 
                Population en bonne santé : ${originalPopulation - malades - deads}
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
