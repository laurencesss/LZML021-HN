//// Fonction pour trouver les 10 mots les plus fréquents
function motsFrequents(poeme) {
    // Convertir le poème en minuscules et supprimer la ponctuation
    const mots = poeme.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
    
    // Créer un objet pour stocker la fréquence de chaque mot
    const freqMots = {};
    mots.forEach(mot => {
        freqMots[mot] = (freqMots[mot] || 0) + 1;
    });
    
    // Trier les mots par fréquence décroissante
    const motsTries = Object.keys(freqMots).sort((a, b) => freqMots[b] - freqMots[a]);
    
    // Récupérer les 10 mots les plus fréquents
    const motsTop10 = motsTries.slice(0, 10);
    
    return motsTop10;
}

// Appeler la fonction et afficher les résultats
const motsLesPlusFrequents = motsFrequents(poeme);
console.log("Les 10 mots les plus fréquents dans le poème sont :");
console.log(motsLesPlusFrequents);
// Fonction pour calculer la richesse lexicale
function richesseLexicale(poemeEtTitre) {
    // Convertir le poème en minuscules et supprimer la ponctuation
    const mots = poemeEtTitre.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
    
    // Créer un ensemble pour stocker les mots uniques
    const motsUniques = new Set(mots);
    
    // Calculer le pourcentage de richesse lexicale
    const pourcentageRichesse = (motsUniques.size / mots.length) * 100;
    
    return pourcentageRichesse.toFixed(2); // arrondir à 2 décimales
}

// Appeler la fonction et afficher le résultat
const pourcentageRichesseLexicale = richesseLexicale(poemeEtTitre);
console.log("Le pourcentage de richesse lexicale du poème est :", pourcentageRichesseLexicale + "%");
// Fonction pour compter le nombre de phrases
function compterPhrases(poemeEtTitre) {
    // Utiliser une expression régulière pour diviser le poème en phrases
    const phrases = poemeEtTitre.split(/[.!?]/);
    
    // Filtrer les éléments vides (par exemple, des phrases vides entre deux délimiteurs)
    const phrasesFiltrees = phrases.filter(phrase => phrase.trim() !== "");
    
    // Retourner le nombre de phrases
    return phrasesFiltrees.length;
}

// Appeler la fonction et afficher le résultat
const nombrePhrases = compterPhrases(poemeEtTitre);
console.log("Le poème contient", nombrePhrases, "phrases.");
// Fonction pour calculer la longueur moyenne des mots par phrase
function longueurMotsParPhrase(phrases) {
    // Tableau pour stocker les longueurs des mots par phrase
    const longueursMotsParPhrase = [];
    
    // Calculer la longueur des mots pour chaque phrase
    phrases.forEach(phrase => {
        const mots = phrase.trim().split(/\s+/);
        const longueurMots = mots.map(mot => mot.length);
        longueursMotsParPhrase.push(longueurMots);
    });
    
    return longueursMotsParPhrase;
}

// Fonction pour compter le nombre de phrases
function compterPhrases(poemeEtTitre) {
    // Utiliser une expression régulière pour diviser le poème en phrases
    const phrases = poemeEtTitre.split(/[.!?]/);
    
    // Filtrer les éléments vides (par exemple, des phrases vides entre deux délimiteurs)
    const phrasesFiltrees = phrases.filter(phrase => phrase.trim() !== "");
    
    return phrasesFiltrees;
}

// Appeler la fonction pour compter les phrases
const phrasesPoemeEtTitre = compterPhrases(poemeEtTitre);

// Appeler la fonction pour calculer la longueur des mots par phrase et afficher le résultat
const longueursMotsParPhrase = longueurMotsParPhrase(phrasesPoemeEtTitre);
console.log("La longueur des mots par phrase dans le poème est la suivante :");
console.log(longueursMotsParPhrase);
// Fonction pour analyser les strophes
function analyserStrophes(poemeEtTitre) {
    // Diviser le poème en strophes en séparant par des sauts de ligne
    const strophes = poemeEtTitre.trim().split(/\n\s*\n/);
    
    // Initialiser un objet pour stocker le nombre de strophes par nombre de vers
    const typologieStrophes = {};
    
    // Parcourir chaque strophe pour compter le nombre de vers
    strophes.forEach(strophe => {
        // Diviser la strophe en vers en séparant par des sauts de ligne
        const vers = strophe.trim().split(/\n/); // erreur ici, ce devrait être 'strophe'
        
        // Obtenir le nombre de vers dans la strophe
        const nombreVers = vers.length;
        
        // Mettre à jour le compteur pour ce nombre de vers
        typologieStrophes[nombreVers] = (typologieStrophes[nombreVers] || 0) + 1;
    });
    
    return typologieStrophes;
}

// Appeler la fonction pour analyser les strophes
const typologieStrophes = analyserStrophes(poemeEtTitre);

// Afficher le résultat
console.log("Typologie des strophes :");
for (const [nombreVers, nombreStrophes] of Object.entries(typologieStrophes)) {
    console.log(`${nombreStrophes} strophes de ${nombreVers} vers.`);
}
// Fonction pour compter le nombre de syllabes dans un vers
function compterSyllabes(vers) {
    // Expression régulière pour compter les syllabes
    const syllabeRegex = /[aeiouyAEIOUY]+(?:[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ](?:u|y))?/g;
    // Trouver les correspondances de l'expression régulière dans le vers
    const syllabes = vers.match(syllabeRegex);
    // Retourner le nombre de syllabes
    return syllabes ? syllabes.length : 0;
}

// Fonction pour analyser les vers et générer une typologie
function analyserVers(poemeEtTitre) {
    // Diviser le poème en vers en séparant par des sauts de ligne
    const vers = poemeEtTitre.trim().split(/\n/);
    
    // Initialiser un objet pour stocker le nombre de vers par nombre de syllabes
    const typologieVers = {};
    
    // Parcourir chaque vers pour compter le nombre de syllabes
    vers.forEach((vers, index) => {
        const nombreSyllabes = compterSyllabes(vers);
        // Mettre à jour le compteur pour ce nombre de syllabes
        if (typologieVers[nombreSyllabes]) {
            typologieVers[nombreSyllabes].push(index + 1); // +1 pour afficher le numéro de vers à partir de 1
        } else {
            typologieVers[nombreSyllabes] = [index + 1]; // +1 pour afficher le numéro de vers à partir de 1
        }
    });
    
    return typologieVers;
}

// Appeler la fonction pour analyser les vers
const typologieVers = analyserVers(poemeEtTitre);

// Afficher le résultat
console.log("Typologie des vers :");
for (const [nombreSyllabes, vers] of Object.entries(typologieVers)) {
    console.log(`${vers.length} vers de ${nombreSyllabes} syllabes : ${vers.join(", ")}.`);
}
