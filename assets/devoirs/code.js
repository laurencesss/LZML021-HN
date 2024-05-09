window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // Fonction pour effectuer l'analyse des données
    function analyserDonnees(texte, delimiteurs, motRecherche) {
        let motsArray = texte.split(new RegExp("[" + delimiteurs + "]"));
        let cooccurrences = rechercherCooccurrences(texte, motRecherche);
        let cofrequences = rechercherCofrequences(texte, motRecherche, cooccurrences);
        let frequencesGaucheDroite = rechercherFrequencesGaucheDroite(texte, motRecherche, cooccurrences);
        let pourcentagesFrequencesGaucheDroite = calculerPourcentageFrequencesGaucheDroite(frequencesGaucheDroite, cooccurrences);
        afficherCooccurrences(cooccurrences);
        afficherCofrequences(cofrequences);
        afficherFrequencesGaucheDroite(frequencesGaucheDroite);
        afficherPourcentagesFrequencesGaucheDroite(pourcentagesFrequencesGaucheDroite);
    }

    // Fonction pour rechercher les cooccurrences d'un mot dans un texte
    function rechercherCooccurrences(texte, motRecherche) {
        let mots = texte.split(/\s+/);
        let cooccurrences = {};
        mots.forEach(function(mot) {
            if (mot !== motRecherche) {
                if (texte.includes(motRecherche)) {
                    if (!cooccurrences[mot]) {
                        cooccurrences[mot] = 1;
                    } else {
                        cooccurrences[mot]++;
                    }
                }
            }
        });
        return cooccurrences;
    }

    // Fonction pour rechercher les cofréquences d'un mot dans un texte test
    function rechercherCofrequences(texte, motRecherche, cooccurrences) {
        let mots = texte.split(/\s+/);
        let cofrequences = {};
        for (let mot of mots) {
            if (mot !== motRecherche) {
                if (cooccurrences.hasOwnProperty(mot)) {
                    if (!cofrequences[mot]) {
                        cofrequences[mot] = cooccurrences[mot];
                    }
                }
            }
        }
        return cofrequences;
    }

    // Fonction pour rechercher les fréquences gauche/droite des cooccurrences d'un mot dans un texte
    function rechercherFrequencesGaucheDroite(texte, motRecherche, cooccurrences) {
        let mots = texte.split(/\s+/);
        let frequencesGauche = 0;
        let frequencesDroite = 0;
        for (let i = 0; i < mots.length; i++) {
            let mot = mots[i];
            if (mot !== motRecherche) {
                if (cooccurrences.hasOwnProperty(mot)) {
                    if (i < mots.indexOf(motRecherche)) {
                        frequencesGauche++;
                    } else {
                        frequencesDroite++;
                    }
                }
            }
        }
        return { gauche: frequencesGauche, droite: frequencesDroite };
    }

    // Fonction pour calculer le pourcentage de fréquence gauche/droite des cooccurrences d'un mot dans un texte
    function calculerPourcentageFrequencesGaucheDroite(frequences, cooccurrences) {
        let totalCooccurrences = Object.keys(cooccurrences).length;
        let pourcentageGauche = (frequences.gauche / totalCooccurrences) * 100;
        let pourcentageDroite = (frequences.droite / totalCooccurrences) * 100;
        return { gauche: pourcentageGauche, droite: pourcentageDroite };
    }

    // Fonction pour afficher les cooccurrences d'un mot
    function afficherCooccurrences(cooccurrences) {
        let cooccurrencesOutput = document.getElementById('cooccurrences-output');
        cooccurrencesOutput.innerHTML = "<h2>Cooccurrences du mot :</h2>";
        cooccurrencesOutput.innerHTML += "<table><tr><th>Cooccurrence</th><th>Nombre d’occurrences</th></tr>";
        for (let mot in cooccurrences) {
            cooccurrencesOutput.innerHTML += "<tr><td>" + mot + "</td><td>" + cooccurrences[mot] + "</td></tr>";
        }
        cooccurrencesOutput.innerHTML += "</table>";
    }

    // Fonction pour afficher les cofréquences d'un mot
    function afficherCofrequences(cofrequences) {
        let cofrequencesOutput = document.getElementById('cofrequences-output');
        cofrequencesOutput.innerHTML = "<h2>Cofréquences du mot :</h2>";
        cofrequencesOutput.innerHTML += "<table><tr><th>Cofréquence</th><th>Nombre d’occurrences</th></tr>";
        for (let mot in cofrequences) {
            cofrequencesOutput.innerHTML += "<tr><td>" + mot + "</td><td>" + cofrequences[mot] + "</td></tr>";
        }
        cofrequencesOutput.innerHTML += "</table>";
    }

    // Fonction pour afficher les fréquences gauche/droite des cooccurrences
    function afficherFrequencesGaucheDroite(frequences) {
        let frequencesOutput = document.getElementById('frequences-output');
        frequencesOutput.innerHTML = "<h2>Fréquences Gauche/Droite des cooccurrences :</h2>";
        frequencesOutput.innerHTML += "<p>Fréquence Gauche : " + frequences.gauche + "</p>";
        frequencesOutput.innerHTML += "<p>Fréquence Droite : " + frequences.droite + "</p>";
    }

    // Fonction pour afficher les pourcentages de fréquence gauche/droite des cooccurrences
    function afficherPourcentagesFrequencesGaucheDroite(pourcentages) {
        let pourcentagesGaucheOutput = document.getElementById('pourcentagesGauche-output');
        let pourcentagesDroiteOutput = document.getElementById('pourcentagesDroite-output');
        pourcentagesGaucheOutput.innerHTML = "<h2>Pourcentage de Fréquence Gauche :</h2>";
        pourcentagesDroiteOutput.innerHTML = "<h2>Pourcentage de Fréquence Droite :</h2>";
        pourcentagesGaucheOutput.innerHTML += "<p>Pourcentage Gauche : " + pourcentages.gauche.toFixed(2) + "%</p>";
        pourcentagesDroiteOutput.innerHTML += "<p>Pourcentage Droite : " + pourcentages.droite.toFixed(2) + "%</p>";
    }

    // Écouter si le fichier donné a été modifié
    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            let reader = new FileReader();

            reader.onload = function(e) {
                let texte = reader.result;
                let delimiteurs = document.getElementById("delimID").value;
                let motRecherche = document.getElementById('poleID').value.trim();
                analyserDonnees(texte, delimiteurs, motRecherche);
                fileDisplayArea.innerText = texte;
                document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
};
