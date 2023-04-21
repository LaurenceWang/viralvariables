import * as math from './math.js';

/*const lambda = 2;
const k = 5;
const p = math.poisson(lambda, k);
console.log(`La probabilité d'observer ${k} événements avec un paramètre lambda de ${lambda} est ${p}`);*/


function nbMaladeMacro(Y, lambda) {
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