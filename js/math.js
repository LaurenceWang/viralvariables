
export function rand() {
    let randomValue = Number(Math.random().toFixed(2));
    return randomValue;
}



/**
 * Fonction qui genere un nombre aleatoire selon la loi de Weibull, avec {@link scale} comme parametre d'echelle et {@link shape} comme parametre de forme
 * @param {Number} scale 
 * @param {Number} shape 
 * @returns 
 */
function generateRandomWeibull(scale, shape) {
    // Générer un nombre aléatoire entre 0 et 1 (exclus)
    const u = Math.random();
  
    // Appliquer la méthode inverse de la fonction de répartition de Weibull
    const x = Math.pow(-Math.log(1 - u), 1 / shape) * scale;
  
    return x;
}


export function markovChain(pop) {
    // Fonction pour générer un nombre aléatoire selon la loi de Weibull
    let deathProbability = Math.min(generateRandomWeibull(pop.sick * (50 / pop.total), 2) / 100, 1)
    console.log("Probabilite de mourir : " + deathProbability)

    // We define states as it is: [Healthy, Sick, Dead]
    let transitionProbas = [
        [0.80, 0.1999, 0.0001], // Healthy
        [0.00, 1 - deathProbability, deathProbability], // Sick
    ]
    console.log("La population totale est : " + pop.total)
    console.log("La population en bonne sante est : " + pop.sick)

    let sickDeath = 0;
    let healthyDeath = 0;
    for (let i = 0; i < pop.total; i++) {
        let currentState;
        if (i <= pop.sick) {
            currentState = 1; // The person is sick 
        } else {
            currentState = 0; // The person is healthy 
        }
        let currentProbas= transitionProbas[currentState]
        let nextState = customChoice(currentProbas)
        if (nextState === 2) {
            if (currentState === 0) {
                healthyDeath++;
            } else {
                sickDeath++;
            }
        }
    }

    pop.healthy = healthyDeath;
    pop.sick = sickDeath;

    return sickDeath + healthyDeath;
}

/**
 * Generation d'un nombre aleatoire suivant une loi normale autour de {@link mu} d'ecart type {@link sigma}
 * Cette fonction suit la methode de [Box-Muller]{@link https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Box-Muller} pour generer un nombre aleatoire suivant une loi normale centree reduite.
 * C'est a dire un nombre centre autour de 0 qui suit un ecart type de 1.
 * Une fois ce nombre genere par la methode de Box-Muller, il est multiplie par {@link sigma} auquel on ajoute {@link mu}
 * @param {number} mu Moyenne autour de laquelle la loi normale se centre
 * @param {number} sigma Ecart type de la loi normale
 * @returns {number} la valeur aleatoire suivant la loi normale centree autour de mu d'ecart type sigma
 */
export function NormalDistribution(mu, sigma) {
  const u1 = rand(); 
  const u2 = rand(); 
  // Methode de Box-Muller
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const randomValue = z * sigma + mu;
  return Math.trunc(randomValue);
}

// Distribution de poisson parametre lambda
/**
 * Ce modele est pertinent pour la modelisation de la propagation d'une epidemie sous deux conditions:
 * Les nouveaux cas d'infection sont rares : La loi de Poisson est adaptée lorsque les événements se produisent de manière relativement rare dans un intervalle donné.
 * Les nouveaux cas d'infection sont indépendants entre eux.
 * Il faut donc formuler ces deux hypotheses pour acdepter ce modele.
 *  @param {number} lambda Parametre de la loi de poisson
 * @returns 
 */
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

/**
 * Probabilite de la loi de poisson P(X = K) de parametre lambda
 * @param {number} lambda 
 * @param {number} k 
 * @returns 
 */
export function poisson(lambda, k) {
    const eLambda = Math.exp(-lambda); // e^-lambda
    let proba = 1;
    for (let i = 1; i <= k; i++) {
        proba *= lambda / i; // lambda^k / k!
    }
    return eLambda * proba; // e^-lambda * (lambda^k / k!)
} 

// Fonction pour générer une durée d'immunité individuelle selon la loi exponentielle
export function generateImmunityDuration() {
    // Générer un nombre aléatoire entre 0 et 1 (exclus)
    const u = Math.random();
  
    // Appliquer la fonction inverse de la distribution exponentielle
    const duration = -Math.log(1 - u) / 0.75; // 
  
    console.log("Immunity duration is : " + Math.ceil(duration))
    return Math.ceil(duration);
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
    return Math.floor(Math.random() * nbEventType); // dès de 0 à nbEventType - 1 
}

function customChoice(probabilities) {
    const randNum = Math.random();
    let cumulativeProb = 0.0;
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProb += probabilities[i];
      if (randNum < cumulativeProb) {
        return i;
      }
    }
  }