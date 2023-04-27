export function rand(){
	return Math.random();
}

export function poisson(lambda, k) {
	return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}
  
export function factorial(n) {
	if (n === 0 || n === 1) {
	  return 1;
	} else {
	  return n * factorial(n - 1);
	}
}

export function rollEventDice(nbEventType) {
	return Math.floor(Math.random() * nbEventType);
}