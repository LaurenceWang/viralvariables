import * as math from './math.js';

/*const lambda = 2;
const k = 5;
const p = math.poisson(lambda, k);
console.log(`La probabilité d'observer ${k} événements avec un paramètre lambda de ${lambda} est ${p}`);*/

window.onload = function() {
	var modal = document.getElementById('modal');
	var modalClose = document.getElementById('modal-close');
  
	modal.style.display = 'block';
  
	modalClose.onclick = function() {
	  modal.style.display = 'none';
	  gameLoop();
	};
  };
  
  function gameLoop() { 
    var message = document.createElement('p');
    message.innerHTML = 'Un clic sur le bouton = un jour';
    var container = document.querySelector('.container');
    container.appendChild(message);

    var count = 0;
	var malades = 0;
    var nbMalades = 0;
    var button = document.createElement('button');
    button.innerHTML = 'Fin de tour';
    button.onclick = function() {
		malades += nbMalades;
		var message = document.createElement('p');
		message.innerHTML = `Le nombre de personnes contaminées JOUR ${count} est ${malades}`;
		message.id = 'malades-message';
		count ++;
		// on clean le message précédent
		var prevMessage = document.getElementById('malades-message');
		if (prevMessage) {
			container.replaceChild(message, prevMessage);
		} else {
			container.appendChild(message);
		}
	
		nbMalades = nbMaladeMacro(Y, lambda);
	};
	
    container.appendChild(button);
}

  

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


const Y = 1000;
const lambda = 20;
const nbMalades = nbMaladeMacro(Y, lambda);
console.log(`Le nombre de malades contaminés dans une population de ${Y} personnes avec un paramètre lambda de ${lambda} est ${nbMalades}`);
