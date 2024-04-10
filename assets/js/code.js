window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

// Tâche 1
// Fonction pour calculer et afficher les statistiques dans un tableau
function calculateAndDisplayStatistics() {
    // Récupérer le texte du fichier
    var fullText = document.getElementById('fileDisplayArea').innerText;

    // Calculer le nombre d'occurrences et le nombre de formes uniques de mots
    var wordOccurrences = {};
    var wordsArray = fullText.match(/\b\w+\b/g);
    wordsArray.forEach(function(word) {
        if (wordOccurrences[word]) {
            wordOccurrences[word]++;
        } else {
            wordOccurrences[word] = 1;
        }
    });

    // Trier les mots par longueur croissante
    var sortedWords = Object.keys(wordOccurrences).sort(function(a, b) {
        return a.length - b.length;
    });

    // Construire le tableau HTML avec les statistiques
    var tableHTML = '<table>';
    tableHTML += '<tr><th>Nombre de caractères</th><th>Nombre d\'occurrences</th><th>Forme unique</th></tr>';
    sortedWords.forEach(function(word) {
        tableHTML += '<tr><td>' + word.length + '</td><td>' + wordOccurrences[word] + '</td><td>' + word + '</td></tr>';
    });
    tableHTML += '</table>';

    // Afficher le tableau dans l'élément "page-analysis"
    document.getElementById('page-analysis').innerHTML = tableHTML;
}
//Tâche 2 

// Fonction pour vérifier si le champ Pôle et le champ Longueur sont remplis
function checkInputs() {
    var pole = document.getElementById('poleID').value;
    var longueur = document.getElementById('lgID').value;
    
    // Vérifier si le champ Pôle et le champ Longueur sont remplis
    if (pole.trim() === '' || longueur.trim() === '') {
        alert("Veuillez remplir le champ Pôle et le champ Longueur.");
        return false;
    }
    return true;
}

// Fonction pour calculer et afficher les coocurents et les fréquences
function calculateAndDisplayCoocurents() {
    // Vérifier si les entrées sont valides
    if (!checkInputs()) {
        return;
    }

    // Récupérer le texte du fichier et le mot entré par l'utilisateur
    var fullText = document.getElementById('fileDisplayArea').innerText;
    var pole = document.getElementById('poleID').value.trim();
    var longueur = parseInt(document.getElementById('lgID').value.trim());

    // Récupérer les mots du texte
    var wordsArray = fullText.match(/\b\w+\b/g);

    // Créer un objet pour stocker les coocurents et leurs fréquences
    var coocurrents = {};
    
    // Parcourir chaque mot du texte
    for (var i = 0; i < wordsArray.length; i++) {
        var word = wordsArray[i];
        
        // Vérifier si le mot actuel est égal au mot entré par l'utilisateur
        if (word === pole) {
            // Extraire le contexte gauche et droit du mot actuel
            var leftContext = wordsArray.slice(Math.max(0, i - longueur), i);
            var rightContext = wordsArray.slice(i + 1, i + longueur + 1);
            
            // Mettre à jour les coocurents et leurs fréquences
            for (var j = 0; j < leftContext.length; j++) {
                var leftWord = leftContext[j];
                if (!coocurrents[leftWord]) {
                    coocurrents[leftWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                coocurrents[leftWord].leftFrequency++;
            }
            for (var k = 0; k < rightContext.length; k++) {
                var rightWord = rightContext[k];
                if (!coocurrents[rightWord]) {
                    coocurrents[rightWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                coocurrents[rightWord].rightFrequency++;
            }
            // Mettre à jour la co-fréquence
            for (var coocurrent in coocurrents) {
                coocurrents[coocurrent].coFrequency += 1;
            }
        }
    }

    // Construire le tableau HTML pour afficher les résultats
    var tableHTML = '<table>';
    tableHTML += '<tr><th>Coocurrents</th><th>Co-fréquence</th><th>Fréquence gauche</th><th>% Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence droite</th></tr>';
    
    // Parcourir chaque coocurrent et afficher les résultats
    for (var coocurrent in coocurrents) {
        var coocurrentData = coocurrents[coocurrent];
        var leftPercentage = ((coocurrentData.leftFrequency / coocurrentData.coFrequency) * 100).toFixed(2);
        var rightPercentage = ((coocurrentData.rightFrequency / coocurrentData.coFrequency) * 100).toFixed(2);
        
        tableHTML += '<tr>';
        tableHTML += '<td>' + coocurrent + '</td>';
        tableHTML += '<td>' + coocurrentData.coFrequency + '</td>';
        tableHTML += '<td>' + coocurrentData.leftFrequency + '</td>';
        tableHTML += '<td>' + leftPercentage + '%</td>';
        tableHTML += '<td>' + coocurrentData.rightFrequency + '</td>';
        tableHTML += '<td>' + rightPercentage + '%</td>';
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    // Afficher le tableau dans la section "page-analysis"
    document.getElementById('page-analysis').innerHTML = tableHTML;
}
