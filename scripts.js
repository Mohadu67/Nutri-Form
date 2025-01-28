//<----------------------Learn More----------------------------------->
    const btns = document.querySelectorAll(".learn-more");

    btns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const moreContent = this.previousElementSibling;

            if (moreContent.classList.contains("open")) {
                moreContent.classList.remove("open");
                this.textContent = "Lire plus";
            } else {
                moreContent.classList.add("open");
                this.textContent = "Lire moins";
            }
        });
    });


//<---------------------------Affiche d'un msg---------------------->

    function showCustomAlert(message) {
        const alertDiv = document.getElementById('customAlert');
        const alertMessage = document.getElementById('alertMessage');
        
        alertMessage.textContent = message;
        alertDiv.style.display = 'block';
    }

    function closeAlert() {
        const alertDiv = document.getElementById('customAlert');
        alertDiv.style.display = 'none';
    }



//<---------------------------Gestionnaire de  la barre des cookie---------------------->


    document.getElementById('acceptCookies').addEventListener('click', function() {
     document.getElementById('cookieMessage').style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });

    if (localStorage.getItem('cookiesAccepted') === 'true') {
        document.getElementById('cookieMessage').style.display = 'none';
    }

  //<----------------------Calcule IMC----------------------------------->

  function calculerIMC(event) {
    event.preventDefault();

    const tailleInput = document.getElementById('taille').value;
    const poidsInput = document.getElementById('poids').value;
    const tailleEnMetres = tailleInput / 100;

    const targetchoix = document.querySelector('.imc-graph');
    if (targetchoix) {
        targetchoix.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
        });
    }

    if (tailleInput && poidsInput) {
        const imc = (poidsInput / (tailleEnMetres * tailleEnMetres)).toFixed(2);

        if (imc < 18) {
            showCustomAlert("Votre IMC est inférieur à 15, c'est dangereux, consultez un spécialiste !");
        } else if (imc > 40) {
            showCustomAlert("Votre IMC est supérieur à 40, c'est dangereux, consultez un spécialiste !");
        } else {
            updateIMCGraph(imc);
        }
    } else {
        showCustomAlert('Veuillez remplir tous les champs pour calculer votre IMC !');
    }
}

const imcForm = document.getElementById('imcForm')

if(imcForm){
    imcForm.addEventListener('submit', calculerIMC);
}



// <--------------------------IMC Graph---------------------------------->

function updateIMCGraph(imc) {
    const minIMC = 18;
    const maxIMC = 40;
    const graphWidth = document.querySelector('.main-bar').offsetWidth;
    const dynamicBar = document.querySelector('.dynamic-bar');
    
    const imcPercentage = (imc - minIMC) / (maxIMC - minIMC);
    const limitedPercentage = Math.max(0, Math.min(1, imcPercentage));
    const dynamicPosition = limitedPercentage * graphWidth;

    dynamicBar.style.display = 'block';
    dynamicBar.style.opacity = '0';

    setTimeout(() => {
        dynamicBar.style.opacity = '1';  
        dynamicBar.style.marginLeft = dynamicPosition + 'px'; 
    }, 10);

    const imcResultElement = document.getElementById('imcResult');
    imcResultElement.textContent = imc;



    if (imc < 18.5) {
        imcResultElement.style.color = 'blue';
        updateContent('maigreur');
    } else if (imc >= 18.5 && imc < 25) {
        imcResultElement.style.color = 'green'; 
        updateContent('normal');
    } else if (imc >= 25 && imc < 30) {
        imcResultElement.style.color = 'orange'; 
        updateContent('surpoids');
    } else {
        imcResultElement.style.color = 'red';
        updateContent('obésité');
    }
}

// <-------------------------contenu personnalisée selon resultat IMC-------------------------------------->

function updateContent(category) {

    const bloc1 = document.querySelector('.bloc.one p');
    const bloc2 = document.querySelector('.bloc.two p');
    const bloc3 = document.querySelector('.bloc.tree p');
    const bloc4 = document.querySelector('.bloc.for p');

    const blocLearn1 = document.querySelector('.bloc.one .more-content p');
    const blocLearn2 = document.querySelector('.bloc.two .more-content p');
    const blocLearn3 = document.querySelector('.bloc.tree .more-content p');
    const blocLearn4 = document.querySelector('.bloc.for .more-content p');

    if (category === 'maigreur') {
        bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est calculé en divisant le poids par la taille au carré (en m²). Il permet de savoir si une personne a un poids adapté à sa taille.";
        bloc2.textContent = "Un IMC inférieur à 18,5 indique que vous êtes en situation de maigreur. Cela peut être causé par un apport insuffisant en nutriments, une maladie sous-jacente ou un métabolisme rapide.";
        bloc3.textContent = "Il est essentiel d'augmenter votre apport calorique de manière saine en consommant des aliments riches en nutriments.";
        bloc4.textContent = "Maintenir un poids santé permet d’éviter des complications, comme l'affaiblissement du système immunitaire ou la perte musculaire.";
    } else if (category === 'normal') {
        bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est calculé en divisant le poids par la taille au carré (en m²). Il permet de savoir si une personne a un poids adapté à sa taille.";
        bloc2.textContent = "Si votre IMC est dans cette fourchette, cela signifie que vous avez un poids équilibré par rapport à votre taille.";
        bloc3.textContent = "Continuez à adopter une alimentation équilibrée, riche en fruits, légumes et protéines maigres.";
        bloc4.textContent = "Maintenir un poids normal vous protège contre de nombreux problèmes de santé, notamment les maladies cardiovasculaires, le diabète et certains cancers.";
    } else if (category === 'surpoids') {
        bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est calculé en divisant le poids par la taille au carré (en m²). Il permet de savoir si une personne a un poids adapté à sa taille.";
        bloc2.textContent = "Si vous êtes en surpoids, cela signifie que votre poids est supérieur à la moyenne idéale pour votre taille. ";
        bloc3.textContent = "Il est conseillé d'adopter une alimentation équilibrée, riche en fruits, légumes et fibres, tout en réduisant les aliments transformés et riches en calories.";
        bloc4.textContent = "Le surpoids peut avoir des conséquences graves sur la santé à long terme. Réduire votre poids peut améliorer votre qualité de vie, prévenir les maladies et augmenter votre espérance de vie.";
    } else if (category === 'obésité') {
        bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est calculé en divisant le poids par la taille au carré (en m²). Il permet de savoir si une personne a un poids adapté à sa taille.";
        bloc2.textContent = "L'obésité est une condition où l'excès de poids peut entraîner de graves problèmes de santé. Elle augmente considérablement le risque de maladies chroniques telles que les maladies cardiaques, le diabète de type 2, les AVC, et certains types de cancers.";
        bloc3.textContent = "Un suivi médical est fortement recommandé pour les personnes souffrant d'obésité. Il est important d'adopter un régime alimentaire contrôlé et riche en nutriments, tout en réduisant l'apport calorique.";
        bloc4.textContent = "L'obésité présente des risques importants pour la santé à long terme. En plus d'affecter la qualité de vie, elle peut entraîner des complications graves comme des maladies chroniques et des handicaps physiques.";
    }


    if (category === 'maigreur') {
        blocLearn1.textContent = "Il se calcule en divisant le poids (en kg) par la taille (en m²). Un IMC inférieur à 18,5 est considéré comme un signe de maigreur.";
        blocLearn2.textContent = "Les risques incluent des carences en vitamines et minéraux, un affaiblissement du système immunitaire et des problèmes de densité osseuse.";
        blocLearn3.textContent = "Privilégiez les protéines, les glucides complexes et les graisses saines, et incluez des collations entre les repas. Un suivi médical est recommandé pour élaborer un plan de nutrition adapté.";
        blocLearn4.textContent = "Régler votre situation de maigreur peut améliorer votre bien-être général, prévenir les maladies et renforcer vos os et votre musculature.";
    } else if (category === 'normal') {
        blocLearn1.textContent = " Un IMC compris entre 18,5 et 24,9 indique un poids normal, suggérant que votre corpulence est adaptée à votre taille.";
        blocLearn2.textContent = "Vous êtes dans une zone idéale pour minimiser les risques de maladies liées au poids, telles que les maladies cardiaques ou le diabète.";
        blocLearn3.textContent = "Il est aussi important de rester actif physiquement, avec au moins 30 minutes d'exercice modéré par jour. Surveillez votre poids régulièrement pour rester dans cette fourchette.";
        blocLearn4.textContent = "Un mode de vie sain contribue à un bien-être physique et mental durable, tout en favorisant une bonne qualité de vie.";
    } else if (category === 'surpoids') {
        blocLearn1.textContent = "Un IMC entre 25 et 29,9 indique une situation de surpoids.";
        blocLearn2.textContent = "Le surpoids peut augmenter le risque de développer des maladies chroniques, comme les maladies cardiovasculaires, le diabète de type 2 et l'hypertension artérielle.";
        blocLearn3.textContent = "Augmentez aussi votre activité physique quotidienne, comme la marche rapide ou la natation, pour favoriser la perte de poids.";
        blocLearn4.textContent = "Prendre des mesures dès maintenant permet de limiter les risques futurs pour la santé.";
    } else if (category === 'obésité') {
        blocLearn1.textContent = " Un IMC supérieur à 30 indique une situation d'obésité, un état qui nécessite une attention médicale et un suivi régulier.";
        blocLearn2.textContent = "L'obésité affecte également la qualité de vie en augmentant les douleurs articulaires et les difficultés respiratoires.";
        blocLearn3.textContent = "Un programme d'exercices physiques réguliers adapté à vos besoins doit être mis en place. Un professionnel de santé peut vous aider à élaborer un plan personnalisé.";
        blocLearn4.textContent = "Traiter cette situation permet non seulement d'améliorer la santé physique, mais aussi de renforcer la confiance en soi et le bien-être général.";
    }

}


// <-------------------------Resultat calorie-------------------------------------->

    document.addEventListener('DOMContentLoaded', function () {
        const calorieForm = document.getElementById('calorieForm');

        if (calorieForm) {
            calorieForm.addEventListener('submit', function (event) {
                event.preventDefault();
                
                const sexe = document.querySelector('input[name="sexe"]:checked').value;
                const taille = parseFloat(document.getElementById('taille').value);
                const poids = parseFloat(document.getElementById('poids').value);
                const age = parseInt(document.getElementById('age').value);
                const activité = document.querySelector('input[name="activité"]:checked').value;
                const formule = document.getElementById('liste-deroulante').value;
                document.querySelector('.graph').style.display = 'flex';

                const targetchoix = document.querySelector('.graph');
                if (targetchoix) {
                    targetchoix.scrollIntoView({
                        behavior: 'smooth', 
                        block: 'start'
                    });
                }

            
                let tmb = 0; 
                
                
                if (formule === 'standard') {
                    if (sexe === 'huey') {
                       
                        tmb = 10 * poids + 6.25 * taille - 5 * age + 5;
                    } else {
                        
                        tmb = 10 * poids + 6.25 * taille - 5 * age - 161;
                    }
                } else if (formule === 'mifflin') {
                    if (sexe === 'huey') {
                       
                        tmb = 10 * poids + 6.25 * taille - 5 * age + 5;
                    } else {
                        
                        tmb = 10 * poids + 6.25 * taille - 5 * age - 161;
                    }
                } else if (formule === 'harris') {
                    if (sexe === 'huey') {
                        
                        tmb = 66.5 + (13.75 * poids) + (5.003 * taille) - (6.75 * age);
                    } else {
                       
                        tmb = 655 + (9.563 * poids) + (1.850 * taille) - (4.676 * age);
                    }
                } else if (formule === 'katch') {
                    
                    const masseGrasse = 1 - 0.24; 
                    const masseMagre = poids * masseGrasse; 
                    tmb = 370 + (21.6 * masseMagre); 
                }
            
                
                let facteurActivité = 1.2; 
                if (activité === 'moyen') {
                    facteurActivité = 1.55;
                } else if (activité === 'actif') {
                    facteurActivité = 1.75;
                } else if (activité === 'trésactif') {
                    facteurActivité = 1.9;
                }
            
            
                const calories = tmb * facteurActivité;
            
            
                document.getElementById('caloriePerdre').textContent = (calories - 500).toFixed(0); 
                document.getElementById('calorieStabiliser').textContent = calories.toFixed(0); 
                document.getElementById('caloriePrendre').textContent = (calories + 500).toFixed(0);

               
            });
        }
    });




        
    // <-------------------------Intégration API pour afficher recettes selon objectif-------------------------------------->




    
   document.addEventListener('DOMContentLoaded', function() {
    const btnPerte = document.getElementById('perdre');
    const btnStabiliser = document.getElementById('stabiliser');
    const btnPrendre = document.getElementById('prendre');
    
    if (btnPerte) {
        btnPerte.addEventListener('click', function() {
            afficherRecettes('perte');
        });
    }

    if (btnStabiliser) {
        btnStabiliser.addEventListener('click', function() {
            afficherRecettes('stabiliser');
        });
    }

    if (btnPrendre) {
        btnPrendre.addEventListener('click', function() {
            afficherRecettes('prise');
        });
    }
});

function afficherRecettes(type) {
    const btnPerte = document.getElementById('perdre');
    const btnStabiliser = document.getElementById('stabiliser');
    const btnPrendre = document.getElementById('prendre');

    
    let calorieValue = 0;
    
    if (type === 'perte') {
        calorieValue = parseInt(document.getElementById('caloriePerdre').textContent, 10);
        
    } else if (type === 'stabiliser') {
        calorieValue = parseInt(document.getElementById('calorieStabiliser').textContent, 10);
    } else if (type === 'prise') {
        calorieValue = parseInt(document.getElementById('caloriePrendre').textContent, 10);
    }
    
    const targetchoix = document.querySelector('article');
    if (targetchoix) {
        targetchoix.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
        });
    }
    
    document.getElementById('article-recette').style.display = 'block';


    fetchRecettes(type, calorieValue);
}


function fetchRecettes(type, calorieValue) {
    let minCalories, maxCalories, minCarbs, maxCarbs, minProtein, maxProtein, minFat, maxFat;

    if (type === 'perte') {

        minCalories = 50; 
        maxCalories = calorieValue - 300; 
        minCarbs = 10; 
        maxCarbs = 50; 
        minProtein = 10; 
        maxProtein = 50; 
        minFat = 1;
        maxFat = 20;
    } else if (type === 'stabiliser') {

        maxCalories = calorieValue + 200; 
        minCarbs = 10; 
        maxCarbs = 100; 
        minProtein = 10;
        maxProtein = 100;
        minFat = 1; 
        maxFat = 50; 
    } else if (type === 'prise') {

        maxCalories = calorieValue; 
        minCarbs = 50; 
        maxCarbs = 150;
        minProtein = 50; 
        maxProtein = 150;
        minFat = 10; 
        maxFat = 100;
    }


    const url = `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCarbs=${minCarbs}&maxCarbs=${maxCarbs}&minProtein=${minProtein}&maxProtein=${maxProtein}&minFat=${minFat}&maxFat=${maxFat}&number=3&language=fr`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': '037fdfeae43d44dfa0c60c66aaedc65c'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur API');
        }
        return response.json();
    })
    .then(data => {
        const recipesDiv = document.getElementById('recettes');
        recipesDiv.innerHTML = ''; 

        if (data && data.length > 0) {
            data.forEach(recipe => {
                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe-item');
                recipeItem.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <h4>Calories : ${recipe.calories}</h4>
                    <img src="${recipe.image}" alt="${recipe.title}" />
                    <button class="details-button" data-recipe-id="${recipe.id}">J'ai faim 🍴</button>
                    <div class="recipe-details" id="details-${recipe.id}" style="display: none;"></div>
                `;
                recipesDiv.appendChild(recipeItem);

                const detailsButton = recipeItem.querySelector('.details-button');
                const detailsDiv = recipeItem.querySelector(`#details-${recipe.id}`);

                detailsButton.addEventListener('click', function() {
                    if (detailsDiv.style.display === 'none') {
                        fetchRecipeDetails(recipe.id, detailsDiv);
                    } else {
                        detailsDiv.style.display = 'none';
                        detailsButton.textContent = 'J\'ai faim 🍴';
                    }
                });
            });
        } else {
            recipesDiv.innerHTML = '<p>Aucune recette trouvée pour cet objectif.</p>';
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des recettes :', error);
        const recipesDiv = document.getElementById('recettes');
        recipesDiv.innerHTML = '<p>Erreur lors de la récupération des recettes. Veuillez réessayer plus tard.</p>';
    });
}


function fetchRecipeDetails(recipeId, detailsDiv) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': '037fdfeae43d44dfa0c60c66aaedc65c'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur API lors de la récupération des détails de la recette');
        }
        return response.json();
    })
    .then(recipeDetails => {
        detailsDiv.innerHTML = `
            <p>Ingrédients : ${recipeDetails.extendedIngredients.map(ingredient => ingredient.original).join(', ')}</p>
            <p>Instructions : ${recipeDetails.instructions}</p>
        `;
        detailsDiv.style.display = 'block';
        detailsDiv.previousElementSibling.textContent = 'Cacher les détails'; 
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des détails de la recette :', error);
    });
}








