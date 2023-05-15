import * as math from './math.js';

//variables 
const originalPopulation = 10000;
let population = originalPopulation;
let lambda = 50;
let count = 0;
let malades = 0;
let nbMalades = 0;
let addSick = 0;
let addContamination = 0;
const eventType = ["depistage", "aleas", "guerison", "surprise", "immunité"];

let endOfRound = true;
let eventEnded = true;

//recuperation div
let gameContainer =  document.getElementById('game');
let popEvoContainer = document.getElementById('popEvolution');
let eventContainer = document.getElementById('event');
let eventNameContainer = document.getElementById('eventName');
let eventContentContainer = document.getElementById('eventContent');
let guerisonContentContainer = document.getElementById('guerisonContainer');
let guerisonPresentationContainer = document.getElementById('guerison-presentation');
let depistageContentContainer = document.getElementById('depistageContainer');
let depistagePresentationContainer = document.getElementById('depistage-presentation');

let geo_malade = document.getElementById('geo_malade');
let geo_pasmalade = document.getElementById('geo_pasmalade');
let stati_malade = document.getElementById('stati_malade');
let stati_pasmalade = document.getElementById('stati_pasmalade');
let poissan_malade = document.getElementById('poissan_malade');
let poissan_pasmalade = document.getElementById('poissan_pasmalade');

//recuperation boutons
let nextRoundbtn = document.getElementById('nextRound');
let eventBtn = document.getElementById('dice');


window.onload = function () {
	let modal = document.getElementById('modal');
	let modalClose = document.getElementById('modal-close');

	modal.style.display = 'block';

	modalClose.onclick = function () {
		modal.style.display = 'none';
		gameContainer.style.display = 'block';
		
	};
};


//fin de tour
nextRoundbtn.onclick = () => {
	maladeEvolution(addSick, addContamination);
	endOfRound = false;
	eventEnded = false;
	eventContainer.style.display = "none";
	guerisonContentContainer.style.display = "none";
	depistageContentContainer.style.display = "none";
	updateState()

};

eventBtn.onclick = () => {
	let resultEvent = eventType[math.rollDice(eventType.length)];
	addText(resultEvent, eventNameContainer);

	//on appelle la fonction qui correspond à l'event
	eval(resultEvent + "()");
	eventContainer.style.display = "flex";
};



function updateState(){
	//rendre les boutons inactifs
	if (!endOfRound) {
		nextRoundbtn.classList.add('disabled');
	}else{
		nextRoundbtn.classList.remove('disabled');
	}

	if (!eventEnded) {
		eventBtn.classList.remove('disabled');
	}else{
		eventBtn.classList.add('disabled');
	}
};


/***** fonctions des events *****/
function depistage() {
	addText(`${math.rand()}`, stati_malade);
	addText(`${math.rand()}`, stati_pasmalade);
	addText(`${math.rand()}`, geo_malade);
	addText(`${math.rand()}`, geo_pasmalade);
	addText(`${math.rand()}`, poissan_malade);
	addText(`${math.rand()}`, poissan_pasmalade);
	depistageContentContainer.style.display = "block";
	depistagePresentationContainer.style.display = "block";

	
	let proba = 0; 

	let dbtn1 =  document.getElementById('d1');
	let dbtn2 =  document.getElementById('d2');
	let dbtn3 =  document.getElementById('d3');

	dbtn1.onclick = () => {
		proba = geo_malade;
		depistageChoice(proba)
	};
	
	dbtn2.onclick = () => {
		proba = stati_malade;
		depistageChoice(proba)
	};

	dbtn3.onclick = () => {
		proba = poissan_malade;
		depistageChoice(proba)
	};
	
	endOfRound = true;
	eventEnded = true;
	updateState();
}

function depistageChoice(proba){


	let resultContainer = document.getElementById('depistage-result');
	depistagePresentationContainer.style.display = "none";
	
	addContamination=(math.binomiale(malades, proba))*3;
	addText(`Aie ${Math.abs(addContamination/3)} personnes ont été déclarées négatives alors qu'elles étaient bien malades et ont fait ${Math.abs(addContamination)} contaminations`, resultContainer);
}

function aleas() {
	addText("oups la fonction d'aleas n'est pas encore codée", eventContentContainer);
	endOfRound = true;
	eventEnded = true;
	updateState();
}

function immunité() {
	addText("Immunité générale !!", eventContentContainer);
	endOfRound = true;
	eventEnded = true;
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
	population -= nbMalades;
	nbMalades = math.poissonDistribution(lambda) + eventResult + contaminationResult;
	malades += nbMalades;
	addSick = 0;
	addContamination = 0;

	let popText = `${nbMalades} nouvelles personnes ont été contaminées aujourd'hui dont ${eventResult} causés par l'évènement de la veille et ${contaminationResult} causés par contamination. <br> Le nombre de personnes contaminées total JOUR ${count} est ${malades} <br> Population en bonne santé : ${originalPopulation - malades}`;
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