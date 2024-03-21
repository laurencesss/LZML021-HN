
function analyserPoeme(){
     // même nom de fonction que dans le HTML
     //vérifier que c'est le bon chemin par exemple en affichant quelque chose
  const poemeEtTitre= document.getElementById("poeme").value;
  const balise = document.getElementById("result");

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
    
    
 
    // Créer un ensemble pour stocker les mots uniques
    const motsUniques = new Set(mots);
    
    
    // Calculer le pourcentage de richesse lexicale
    const pourcentageRichesse = (motsUniques.size / mots.length) * 100;

   
  
    // Utiliser une expression régulière pour diviser le poème en phrases
    const phrases = poemeEtTitre.split(/[.!?]+/g) ;
    
    // Filtrer les éléments vides (par exemple, des phrases vides entre deux délimiteurs)
    const phrasesFiltrees = phrases.filter(phrase => phrase.trim() !== "");
       
   
    
    // Tableau pour stocker la longueur des mots par phrase
    let div = [];
    const longueursMotsParPhrase = phrasesFiltrees.map(phrase => {
        // Diviser la phrase en mots en utilisant l'espace comme délimiteur
        const mots = phrase.trim().split(/\s+/);
        // Calculer la longueur totale des mots dans la phrase
        const longueurTotale = mots.reduce((acc, mot) => acc + mot.length, 0);
        // Calculer la longueur moyenne des mots dans la phrase
        div.push(longueurTotale / mots.length);
    });
    


    
    // Diviser le poème en strophes en séparant par des sauts de ligne
    const strophes = poemeEtTitre.trim().split(/\n\s*\n/);
    
    // Initialiser un objet pour stocker le nombre de strophes par nombre de vers
    const typologieStrophes = {};
    
    // Parcourir chaque strophe pour compter le nombre de vers
    strophes.forEach(strophe => {
        // Diviser la strophe en vers en séparant par des sauts de ligne
        const vers2 = strophe.trim().split(/\n/);
        
        // Obtenir le nombre de vers dans la strophe
        const nombreVers = vers2.length;
        
        // Mettre à jour le compteur pour ce nombre de vers
        if (typologieStrophes[nombreVers]) {
            typologieStrophes[nombreVers]++;
        } else {
            typologieStrophes[nombreVers] = 1;
        }
    });



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

    balise.innerText = "top 10 mots :" + motsTop10.join (",") +"\n"+ "richesse lexicale en pourcentage:"+pourcentageRichesse+
    "\n"+"longueur moyenne phrases:"+ div.join(',')+"\n"+ "typologie des strophes :" + JSON.stringify(typologieStrophes) +"\n"+"typo des vers :" + JSON.stringify(typologieVers);
    

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

let display = document.getElementById("result");
display.innerText = motsTop10 + pourcentageRichesse +  div;
//display.innerText = motsTop10 + pourcentageRichesse + longueursMotsParPhrase + phrasesFiltrees + nombreVers + nombreSyllabes;