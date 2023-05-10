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
const eventType = ["depistage", "aleas", "guerison", "surprise"];

let endOfRound = true;
let eventEnded = true;

//recuperation div
let gameContainer =  document.getElementById('game');
let popEvoContainer = document.getElementById('popEvolution');
let eventContainer = document.getElementById('event');
let eventNameContainer = document.getElementById('eventName');
let eventContentContainer = document.getElementById('eventContent');

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
function depistage(originalPopulation, malades) {
	addText("Les laboratoires ont mis en place un test de dépistage, si une personne est malade le test est positif à 99%, si une personne n'est pas malade le test est positif à 0.1%", eventContentContainer);
	addContamination;
	
	endOfRound = true;
	eventEnded = true;
	updateState();
}

function aleas() {
	addText("oups la fonction d'aleas n'est pas encore codée", eventContentContainer);
	endOfRound = true;
	eventEnded = true;
	updateState();
}

function guerison() {
	addText("oups la fonction de guérison n'est pas encore codée", eventContentContainer);

	let proba = 0.5; 

	if(math.binomiale(3, proba) >= 2){
		addSick = -50;
		addText("ouiii", eventContentContainer);
	}else{
		addText("Raté ! Pas de vaccins", eventContentContainer);
	}


	endOfRound = true;
	eventEnded = true;
	updateState();
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
	nbMalades = math.poissonDistribution(lambda) + eventResult;
	malades += nbMalades;
	addSick = 0;

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