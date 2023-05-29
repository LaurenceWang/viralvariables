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
let game = document.getElementById('viralvariable');
let montagne = document.getElementById('montagne');
const ctx = document.getElementById('stats');
const ctx2 = document.getElementById('stats2');
const ctx3 = document.getElementById('stats3');
const ctx4 = document.getElementById('stats4');
const ctx5 = document.getElementById('stats5');
const ctx6 = document.getElementById('stats6');
const ctx7 = document.getElementById('stats7');


let statsContainer = document.getElementById('stats-container');
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

///result 

let depistageResult = document.getElementById('depistage-result');
let guerisonResult = document.getElementById('guerison-result');


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

let playAgain = document.getElementById('play-again');
playAgain.style.display = "none";

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
            originalPopulation = math.NormalDistribution(10_000, 500);
        }
        if (i==1){
            originalPopulation = math.NormalDistribution(70_000, 3_500);
        }
    
        if (i==2){
            originalPopulation = math.NormalDistribution(300_000, 15_000);
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
  eventContentContainer.innerHTML = "";
  updateState();
  endGame();

};

eventBtn.onclick = () => {
  let resultEvent = eventType[math.rollDice(eventType.length)];
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
    statsContainer.style.display = "block";
    game.style.backgroundColor = "#e6e6e6";
    montagne.style.background = "none";
    statBtn.classList.add('disabled');
    playAgain.style.display = "block";

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

playAgain.onclick = () => {
  document.location.reload();
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
    const geoMaladeValue = ((Math.random() * 0.10) + 0.90).toFixed(2);
    const geoPasMaladeValue = (Math.random() * 0.10).toFixed(2);
    const statiMaladeValue = ((Math.random() * 0.10) + 0.90).toFixed(2);
    const statiPasMaladeValue = ((Math.random() * 0.10) + 0.90).toFixed(2);
    const poissanMaladeValue = (Math.random() * 0.10).toFixed(2);
    const poissanPasMaladeValue = (Math.random() * 0.10).toFixed(2);

    addWord(geoMaladeValue, geoMalade);
    addWord(geoPasMaladeValue, geoPasMalade);
    addWord(statiMaladeValue, statiMalade);
    addWord(statiPasMaladeValue, statiPasMalade);
    addWord(poissanMaladeValue, poissanMalade);
    addWord(poissanPasMaladeValue, poissanPasMalade);
    
    depistageContentContainer.style.display = "block";
    depistagePresentationContainer.style.display = "block";
    depistageResult.innerHTML = "";

    let fauxpos = 0;
    let fauxneg = 0;

    let dbtn1 = document.getElementById('d1');
    let dbtn2 = document.getElementById('d2');
    let dbtn3 = document.getElementById('d3');

    dbtn1.onclick = () => {
        dpChoice1++
        fauxpos = parseFloat(geoPasMaladeValue);
        fauxneg = 1 - parseFloat(geoMaladeValue);
       dpSuccess1+= depistageChoice(fauxpos, fauxneg);
    };

    dbtn2.onclick = () => {
        dpChoice2++
        fauxpos = 1 - parseFloat(statiPasMaladeValue);
        fauxneg = 1 - parseFloat(statiMaladeValue);
        dpSuccess2+= depistageChoice(fauxpos, fauxneg);
    };

    dbtn3.onclick = () => {
        dpChoice3++
        fauxpos = parseFloat(poissanPasMaladeValue);
        fauxneg = parseFloat(poissanMaladeValue);
        dpSuccess3+= depistageChoice(fauxpos, fauxneg);
    };

    endOfRound = true;
    eventEnded = true;
    updateState();
}


function depistageChoice(fauxpos, fauxneg){


    //let resultContainer = document.getElementById('depistage-result');
    depistagePresentationContainer.style.display = "none";


    let fauxnegnb =0;
    let fauxposnb =0;
    fauxnegnb = math.binomiale(malades, Number(fauxneg));
    console.log(fauxneg);
    console.log(fauxnegnb);
    fauxposnb = math.binomiale(originalPopulation-malades, Number(fauxpos));
    console.log(fauxpos);
    console.log(fauxposnb);


    addContamination=(fauxnegnb)*3 + Math.floor(fauxposnb * 0.4);
    addText(`Aie ${fauxnegnb} personnes ont été déclarées négatives alors qu'elles étaient bien malades et ont fait ${fauxnegnb*3} contaminations et ${fauxposnb} personnes ont été déclarées malades alors qu'elles ne l'étaient pas vraiment, mais desormais en contact avec des malades, ${Math.floor(fauxposnb * 0.4)} d'entre elles le sont devenues `, depistageResult);

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
    guerisonResult.innerHTML = "";


    let proba = 0; 

    let gbtn1 =  document.getElementById('g1');
    let gbtn2 =  document.getElementById('g2');
    let gbtn3 =  document.getElementById('g3');

    gbtn1.onclick = () => {
      guChoice1++
        proba = Number(math.rand() * 0.10 +0.90).toFixed(2);
        gueSuccess1+= - guerisonChoice(proba, Number(math.rand() * 0.10).toFixed(2));
        
    };

    gbtn2.onclick = () => {
      guChoice2++
        proba = Number(math.rand() * 0.10 +0.3).toFixed(2);
        gueSuccess2+= -guerisonChoice(proba, Number(math.rand() * 0.10 +0.4).toFixed(2))
    };

    gbtn3.onclick = () => {
      guChoice3++
        proba = Number(math.rand() * 0.10).toFixed(2);
        gueSuccess3+= - guerisonChoice(proba, Number(math.rand() * 0.10 +0.5).toFixed(2))
    };


    endOfRound = true;
    eventEnded = true;
    updateState();
}

function guerisonChoice(proba, percentage){

    let resultContainer = document.getElementById('guerison-result');
    guerisonPresentationContainer.style.display = "none";
    
    let numTakingMed = Math.floor((originalPopulation -(originalPopulation - malades)) * percentage); // Nombre de gens qui essaient le médicament
    let popCured = 0; // Nombre de gens soignés par le médicament

  for (let i = 0; i < numTakingMed; i++) {
    if (math.bernoulli(proba)) {
      popCured++;
    }
  }
  if (popCured > malades){
    popCured==malades;
  }
  addSick -= popCured; // On enlève le nombre de personnes soignées au nombre total de malades

  addText(`Super !! ${popCured} personnes ont été guéries par le remède`, guerisonResult);
  return addSick;
}

function surprise() {
    surpCount++
    surpRoundNb.push(count);

    
    let successNumber = math.successGeo();
    let playerNumber = 100 * (malades/(originalPopulation)); // On tire un nombre aléatoire entre 1 et 100
    
    playerNb.push(playerNumber);

    successNb.push(successNumber);

    let msgNumber = math.rollDice(4);// Génération du numéro de message aléatoire

    if (playerNumber > successNumber) {
        addSick = math.rollDice(successNumber*0.01*(originalPopulation)%malades); // permet d'avoir un nombre assez cohérent tout au long de la partie
        addText(negSurprise(msgNumber, addSick), eventContentContainer);
        console.log("Événement négatif");
    } else {
        addSick = -math.rollDice(successNumber*0.01*(originalPopulation)%malades);
        addText(posSurprise(msgNumber, addSick), eventContentContainer);
        console.log("Événement positif");
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
    let negSurprises = [`${sickNb} personnes ont mangé un drôle de tacos hier...Oh`, `Le pays ennemi envoie une armée de moustiques porteur du virus !! ${sickNb} personnes ont été piqués`, `L'âge de départ à la retraite a encore reculé... le corps médical décide de faire grêve...${sickNb} personnes en plus attrapent le virus`, `${sickNb} étudiants ont enchainé des nuits blanches pour finir leurs projets...ils sont si fatigués que leur corps n'a pas produit d'anti-corps` ]

    return negSurprises[messageNb];
}

function addText(text, div){
    let message = document.createElement('p');
    message.innerHTML = text;
    div.innerHTML = '';
    div.appendChild(message);
}

function addWord(text, div){
  //let message = document.createElement('span');
  
  div.innerHTML = '';
  div.innerHTML = text;
  //div.appendChild(text);
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
function nbMaladeMacro(Y, lambda) { 
    let nbMalades = 0;
    for (let i = 0; i < Y; i++) {
        const p = math.poissonDistribution(lambda, i);
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
