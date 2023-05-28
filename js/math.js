export function rand() {
    // Trim random number to 2 decimals.
    let randomValue = Number(Math.random().toFixed(2));
    return randomValue;
}

// Distribution de poisson parametre lambda
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

// Probabilite de la loi de poisson P(X = K) de parametre lambda
export function poisson(lambda, k) {
    const eLambda = Math.exp(-lambda); // e^-lambda
    let proba = 1;
    for (let i = 1; i <= k; i++) {
        proba *= lambda / i; // lambda^k / k!
    }
    return eLambda * proba; // e^-lambda * (lambda^k / k!)
} 

export function immunity(count) {
    const lambda = 1 / 2;
    let chance = rand();
    let proba = exp(lambda, count);
    console.log(`Immunity chances are of ${chance * 100}%`);
    console.log(`Proba is ${proba * 100}%`);
    return chance <= proba;
}

// Loi exponentielle
export function exp(lambda, k) {
    console.log(`lambda: ${lambda}`);
    console.log(`k: ${k}`);
    return Math.exp(-lambda * k);
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

export function normalFunction(x, mu, sigma) {
  const randomValue = generateRandomFromNormalDistribution(mu, sigma);
  const result = x + randomValue;
  return result;
}

function generateRandomFromNormalDistribution(mu, sigma) {
  const u1 = 1 - Math.random(); 
  const u2 = 1 - Math.random(); 
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const randomValue = z * sigma + mu;
  return randomValue;
}

// If n is big enough, it simulates Poisson by binomiale
// In this project n should be the population for instance
export function binomialeMockPoisson(n) {
    let succes = 0;
    let p = 1 / n;

    for (let i = 0; i < n; i++) {
        succes += bernoulli(p);
    }

    return succes;
}

export function rollDice(nbEventType) {
    return Math.floor(Math.random() * nbEventType);
}
