function motsFrequents(poemeEtTitre) {
    // Trouver l'index de la première occurrence de retour à la ligne pour exclure le titre
    const indexRetourLigne = poemeEtTitre.indexOf('\n');
    
    // Extraire le texte du poème en excluant le titre
    const poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    
    // Convertir le poème en minuscules et supprimer la ponctuation
    const mots = poemeEtTitre.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
    
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
const motsLesPlusFrequents = motsFrequents(poemeEtTitre);
console.log("Les 10 mots les plus fréquents dans le poème (titre exclu) sont :");
console.log(motsLesPlusFrequents);

function richesseLexicale(poemeEtTitre) {
    // Trouver l'index de la première occurrence de retour à la ligne pour exclure le titre
    const indexRetourLigne = poemeEtTitre.indexOf('\n');
    console.log("Index du retour à la ligne:", indexRetourLigne);
    
    // Extraire le texte du poème en excluant le titre
    const poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    console.log("Poème (sans titre):", poeme);
    
    // Convertir le poème en minuscules et supprimer la ponctuation
    const mots = poemeEtTitre.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
    console.log("Mots du poème:", mots);
    
    // Créer un ensemble pour stocker les mots uniques
    const motsUniques = new Set(mots);
    console.log("Mots uniques:", motsUniques);
    
    // Calculer le pourcentage de richesse lexicale
    const pourcentageRichesse = (motsUniques.size / mots.length) * 100;
    console.log("Pourcentage de richesse lexicale:", pourcentageRichesse);
    
    return pourcentageRichesse.toFixed(2); // Arrondir à 2 décimales
}

// Appeler la fonction et afficher le résultat
const pourcentageRichesseLexicale = richesseLexicale(poemeEtTitre);
console.log("Le pourcentage de richesse lexicale du poème (titre exclu) est :", pourcentageRichesseLexicale + "%");

function compterPhrases(poemeEtTitre) {
    // Trouver l'index de la première occurrence de retour à la ligne pour exclure le titre
    const indexRetourLigne = poemeEtTitre.indexOf('\n');
    
    // Extraire le texte du poème en excluant le titre
    const poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    
    // Utiliser une expression régulière pour diviser le poème en phrases
    const phrases = poemeEtTitre.split(/[.!?]/);
    
    // Filtrer les éléments vides (par exemple, des phrases vides entre deux délimiteurs)
    const phrasesFiltrees = phrases.filter(phrase => phrase.trim() !== "");
    
    // Retourner le nombre de phrases
    return phrasesFiltrees.length;
}

// Appeler la fonction pour compter le nombre de phrases et afficher le résultat
const nombrePhrases = compterPhrases(poemeEtTitre);
console.log("Le poème contient", nombrePhrases, "phrases.");


function longueurMotsParPhrase(poemeEtTitre) {
    // Trouver l'index de la première occurrence de retour à la ligne pour exclure le titre
    const indexRetourLigne = poemeEtTitre.indexOf('\n');
    
    // Extraire le texte du poème en excluant le titre
    const poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    
    // Utiliser une expression régulière pour diviser le poème en phrases
    const phrases = poemeEtTitre.split(/[.!?]/);
    
    // Filtrer les éléments vides (par exemple, des phrases vides entre deux délimiteurs)
    const phrasesFiltrees = phrases.filter(phrase => phrase.trim() !== "");
    
    // Tableau pour stocker la longueur des mots par phrase
    const longueursMotsParPhrase = phrasesFiltrees.map(phrase => {
        // Diviser la phrase en mots en utilisant l'espace comme délimiteur
        const mots = phrase.trim().split(/\s+/);
        // Calculer la longueur totale des mots dans la phrase
        const longueurTotale = mots.reduce((acc, mot) => acc + mot.length, 0);
        // Calculer la longueur moyenne des mots dans la phrase
        return longueurTotale / mots.length;
    });
    
    return longueursMotsParPhrase;
}

// Appeler la fonction pour calculer la longueur des mots par phrase et afficher le résultat
const longueursMotsParPhrase = longueurMotsParPhrase(poemeEtTitre);
console.log("La longueur moyenne des mots par phrase dans le poème est la suivante :");
console.log(longueursMotsParPhrase);

function analyserStrophes(poemeEtTitre) {
    // Trouver l'index de la première occurrence de retour à la ligne pour exclure le titre
    const indexRetourLigne = poemeEtTitre.indexOf('\n');
    
    // Extraire le texte du poème en excluant le titre
    const poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    
    // Diviser le poème en strophes en séparant par des sauts de ligne
    const strophes = poemeEtTitre.trim().split(/\n\s*\n/);
    
    // Initialiser un objet pour stocker le nombre de strophes par nombre de vers
    const typologieStrophes = {};
    
    // Parcourir chaque strophe pour compter le nombre de vers
    strophes.forEach(strophe => {
        // Diviser la strophe en vers en séparant par des sauts de ligne
        const vers = strophe.trim().split(/\n/);
        
        // Obtenir le nombre de vers dans la strophe
        const nombreVers = vers.length;
        
        // Mettre à jour le compteur pour ce nombre de vers
        if (typologieStrophes[nombreVers]) {
            typologieStrophes[nombreVers]++;
        } else {
            typologieStrophes[nombreVers] = 1;
        }
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
function analyserVers(poemeEtTitre) {
    // Trouver l'index de la première occurrence de retour à la ligne pour exclure le titre
    const indexRetourLigne = poemeEtTitre.indexOf('\n');
    
    // Extraire le texte du poème en excluant le titre
    const poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    
    // Diviser le poème en vers en séparant par des sauts de ligne
    const vers = poemeEtTitre.trim().split(/\n/);
    
    // Initialiser un objet pour stocker le nombre de vers par nombre de syllabes
    const typologieVers = {};
    
    // Parcourir chaque vers pour compter le nombre de syllabes approximatif
    vers.forEach((vers, index) => {
        const nombreSyllabes = compterSyllabesApproximatif(vers);
        // Mettre à jour le compteur pour ce nombre de syllabes
        if (typologieVers[nombreSyllabes]) {
            typologieVers[nombreSyllabes].push(index + 1); // +1 pour afficher le numéro de vers à partir de 1
        } else {
            typologieVers[nombreSyllabes] = [index + 1]; // +1 pour afficher le numéro de vers à partir de 1
        }
    });
    
    return typologieVers;
}

// Fonction pour compter le nombre de syllabes approximatif dans un vers
function compterSyllabesApproximatif(vers) {
    // Ici, vous pouvez implémenter votre propre algorithme pour compter les syllabes d'une manière approximative
    // Cela peut être basé sur des règles simples comme le nombre de voyelles dans le vers, en supposant que chaque voyelle représente une syllabe.
    // Par exemple, vous pouvez utiliser une expression régulière pour compter les voyelles dans le vers.
    // Voici un exemple rudimentaire :
    const voyelles = vers.match(/[aeiouy]/gi);
    return voyelles ? voyelles.length : 0;
}

// Appeler la fonction pour analyser les vers
const typologieVers = analyserVers(poemeEtTitre);

// Afficher le résultat
console.log("Typologie des vers :");
for (const [nombreSyllabes, vers] of Object.entries(typologieVers)) {
    console.log(`${vers.length} vers de ${nombreSyllabes} syllabes : ${vers.join(", ")}.`);
}