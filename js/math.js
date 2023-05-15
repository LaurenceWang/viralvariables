export function rand() {
	let randomvalue = Math.random();
	console.log(randomvalue);
	if (randomvalue == 0){
		return 0
	};
	
	return (Math.round(randomvalue * Math.pow(10,2))/ Math.pow(10,2));

}

export function poissonDistribution(lambda) {

	let L = Math.exp(-lambda);
	let p = 1.0;
	let k = 0;

	do {
		k++;
		p *= rand();
	} while (p > L);

	return k - 1;
}

export function poisson(lambda, k) {
	const eLambda = Math.exp(-lambda); // e^-lambda
	let proba = 1;
	for (let i = 1; i <= k; i++) {
		proba *= lambda / i; // lambda^k / k!
	}
	return eLambda * proba; // e^-lambda * (lambda^k / k!)
}

//version avec factorielle explose

/*export function poisson(lambda, k) {
	return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}*/

/*export function factorial(n) {
	if (n === 0 || n === 1) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}*/

export function geometrique(p, k) {
	return p * Math.pow((1 - p), k - 1);
}

export function successGeo() {
	let n = Math.random(); // on tire un n random
	let p = Math.random() / 10; //probabilité d'un succès -> plus la proba est petite et plus le nombres de tirages augmente

	let k = 1;
	let proba = geometrique(p, k);

	while (proba < n) {
		k++;
		proba += geometrique(p, k);
	}

	return k; //nombre de tirages nécessaires pour avoir un succès
}

export function bernoulli(p) {
	if (rand() < p) {
	  return 1; // succès
	} else {
	  return 0; // échec
	}
}

export function binomiale(n, p) {
	let succes = 0;
	
	for (let i = 0; i < n; i++) {
	  succes += bernoulli(p);
	}
	
	return succes;
}

export function rollDice(nbEventType) {
	return Math.floor(Math.random() * nbEventType);
}