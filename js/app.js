import * as math from './math.js';

/*const lambda = 2;
const k = 5;
const p = math.poisson(lambda, k);
console.log(`La probabilité d'observer ${k} événements avec un paramètre lambda de ${lambda} est ${p}`);*/

const eventType = ["depistage", "aleas", "guerison"];

window.onload = function() {
	let modal = document.getElementById('modal');
	let modalClose = document.getElementById('modal-close');

	modal.style.display = 'block';
  
	let gameContainer = document.getElementById('game');

	modalClose.onclick = function() {
	  modal.style.display = 'none';
	  gameContainer.style.display='block';
	  gameLoop();
	};
  };
  
  function gameLoop() { 

	//let container = document.getElementById('popEvolution');
	let nextRoundbtn = document.getElementById('nextRound');
	let eventBtn = document.getElementById('dice');
	console.log(eventBtn)

    /*let count = 0;
	let malades = 0;
    let nbMalades = 0;*/

    nextRoundbtn.onclick = ()=> {
		maladeEvolution();	
	} 

	eventBtn.onclick = ()=>{
		let message = document.createElement('p');
		let resultEvent = eventType[math.rollEventDice(eventType.length)];
		message.innerHTML = resultEvent;
		let container = document.getElementById('event');
		container.innerHTML = '';
		container.appendChild(message);

	}

	
	
}



function maladeEvolution(){
	let container = document.getElementById('popEvolution');
	let popText = `Le nombre de personnes contaminées JOUR ${count} est ${malades} <br> Population en bonne santé : ${originalPopulation - malades}`;
	let message = document.createElement('p');
	message.innerHTML = popText;
	container.innerHTML = '';
	container.appendChild(message);
	count ++;
	population -= nbMalades;
	nbMalades = nbMaladeMacro(population, lambda);
	malades += nbMalades;
}

  

function nbMaladeMacro(Y, lambda) { // elle renvoit beaucoup de fois 0, c'est abérant ou j'ai pas compris un truc ?
	let nbMalades = 0;
	for (let i = 0; i < Y; i++) {
	  const p = math.poisson(lambda,i);
	  //const rand = Math.random();
	  if (math.rand() < p) {
		nbMalades = i;
		break;
	  }
	}
	return nbMalades;
}

const originalPopulation = 100000;
let population = originalPopulation;
let lambda = 50;
let count = 0;
let malades = 0;
let nbMalades = 0;
//const nbMalades = nbMaladeMacro(Y, lambda);
//console.log(`Le nombre de malades contaminés dans une population de ${Y} personnes avec un paramètre lambda de ${lambda} est ${nbMalades}`);
