//<---------------------------Learn more FAQ---------------------->

document.querySelectorAll('.faq h3').forEach((question) => {
    question.addEventListener('click', () => {
        const parent = question.parentElement;
        parent.classList.toggle('open');
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

  let imc;

  if (tailleInput && poidsInput) {
    imc = (poidsInput / (tailleEnMetres * tailleEnMetres)).toFixed(2);

    if (imc < 18) {
      showCustomAlert("Ton IMC est inférieur à 18, cela peut être dangereux, consulte un spécialiste !");
    } else if (imc > 40) {
      showCustomAlert("Ton IMC est supérieur à 40, cela peut être dangereux, consulte un spécialiste !");
    } else {
      updateIMCGraph(imc);
    }
  }

  const userId = localStorage.getItem('userId');

  if (userId && imc && !isNaN(imc)) {
    sauvegarderDonnees(userId, imc, null); 
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
    const resultatIMC = document.querySelector('.resultat');

    const imcPercentage = (imc - minIMC) / (maxIMC - minIMC);
    const limitedPercentage = Math.max(0, Math.min(1, imcPercentage));
    const dynamicPosition = limitedPercentage * graphWidth;

    dynamicBar.style.display = 'block';
    dynamicBar.style.opacity = '0';
    resultatIMC.style.display = 'flex';

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
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Prendre du poids de manière équilibrée t'aidera à renforcer ton système immunitaire, à améliorer ton énergie et à prévenir les carences nutritionnelles.";
    bloc4.textContent = "Pour prendre du poids de manière saine, concentre toi sur des aliments riches en nutriments mais caloriques, comme les avocats, les noix, les graines, les produits laitiers entiers et les protéines maigres";
} else if (category === 'normal') {
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Maintenir un poids santé est essentiel pour prévenir les maladies chroniques et améliorer ta qualité de vie.";
    bloc4.textContent = "Pour maintenir ton poids santé, continue à adopter une alimentation variée et équilibrée, en privilégiant les fruits, les légumes, les protéines maigres et les céréales complètes. ";
} else if (category === 'surpoids') {
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Perdre du poids progressivement t'aidera à réduire les risques de maladies cardiovasculaires, de diabète et d'autres problèmes de santé.";
    bloc4.textContent = "Pour perdre du poids de manière saine, commence par réduire ton apport calorique tout en maintenant une alimentation riche en nutriments.";
} else if (category === 'obésité') {
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Travailler sur ton poids peut considérablement améliorer ta qualité de vie, réduire les risques de maladies chroniques et renforcer ta confiance en toi.";
    bloc4.textContent = "Pour gérer ton poids de manière saine, il est essentiel de consulter un professionnel de santé pour élaborer un plan personnalisé.";
}


if (category === 'maigreur') {
    blocLearn1.innerHTML = "ton IMC indique que tu es en situation de <strong>Maigreur</strong>, ce qui correspond à un IMC <strong>inférieur à 18,5</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "N'oublie pas que la santé passe aussi par une activité physique adaptée, comme la musculation légère, pour développer ta masse musculaire tout en prenant du poids.";
    blocLearn4.innerHTML = "Essaye de fractionner tes repas en plusieurs petites portions tout au long de la journée pour faciliter l'absorption des calories. Utilise notre <a href='calorie.html'>Outil de calcul de Calories</a> pour déterminer tes besoins journaliers et ajuster ton alimentation en conséquence.";
} else if (category === 'normal') {
    blocLearn1.innerHTML = "ton IMC indique que tu es en situation <strong>Normal</strong>, qui correspond a un IMC entre <strong>18,5 et 24,9</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Reste actif en intégrant des activités physiques que tu aime, comme la marche, le yoga ou le vélo, et surveille régulièrement ton poids pour rester sur la bonne voie.";
    blocLearn4.innerHTML = " Utilise notre <a href='calorie.html'>Calculateur de Calories</a> pour suivre tes apports journaliers et t'assurer que tu reste dans la fourchette recommandée pour ton profil.";
} else if (category === 'surpoids') {
    blocLearn1.innerHTML = "ton IMC indique que tu es en situation de <strong>Surpoids</strong>, qui correspond a un IMC entre <strong>25 et 29,9</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Intégre des activités physiques régulières, comme la marche rapide ou la natation, pour soutenir ta perte de poids et améliorer ton bien-être général.";
    blocLearn4.innerHTML = "Privilégie les légumes, les fruits, les protéines maigres et les fibres. Utilise notre <a href='calorie.html'>Outil de calcul de Calories</a> pour déterminer tes besoins journaliers et fixer des objectifs réalistes. Évite les régimes restrictifs et opte pour des changements durables.";
} else if (category === 'obésité') {
    blocLearn1.innerHTML = "ton IMC indique que tu es en situation <strong>d'Obésité</strong>, qui correspond a un IMC <strong>supérieur à 30</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Commence par des activités physiques adaptées à ta condition physique, comme la marche ou des exercices à faible impact, et augmente progressivement l'intensité.";
    blocLearn4.innerHTML = "Adopte une alimentation équilibrée, riche en légumes, fruits, protéines maigres et fibres, tout en réduisant les aliments transformés et riches en calories. Utilise notre <a href='calorie.html'>Calculateur de Calories</a> pour mieux comprendre tes besoins énergétiques et suivre tes progrès.";
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

            document.querySelector('.graph-calorie').style.display = 'flex';
            const targetchoix = document.querySelector('.graph-calorie');
            if (targetchoix) {
                targetchoix.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            let tmb = 0;

            if (formule === 'standard' || formule === 'mifflin') {
                tmb = (sexe === 'huey')
                    ? 10 * poids + 6.25 * taille - 5 * age + 5
                    : 10 * poids + 6.25 * taille - 5 * age - 161;
            } else if (formule === 'harris') {
                tmb = (sexe === 'huey')
                    ? 66.5 + (13.75 * poids) + (5.003 * taille) - (6.75 * age)
                    : 655 + (9.563 * poids) + (1.850 * taille) - (4.676 * age);
            } else if (formule === 'katch') {
                const masseGrasse = 1 - 0.24;
                const masseMagre = poids * masseGrasse;
                tmb = 370 + (21.6 * masseMagre);
            }

            let facteurActivité = 1.2;
            if (activité === 'moyen') facteurActivité = 1.55;
            else if (activité === 'actif') facteurActivité = 1.75;
            else if (activité === 'trésactif') facteurActivité = 1.9;

            const calories = tmb * facteurActivité;

            document.getElementById('caloriePerdre').textContent = (calories - 500).toFixed(0);
            document.getElementById('calorieStabiliser').textContent = calories.toFixed(0);
            document.getElementById('caloriePrendre').textContent = (calories + 500).toFixed(0);

            // 🔄 Enregistrement dans la base de données
            const userId = localStorage.getItem('userId');
            if (userId) {
                sauvegarderDonnees(userId, null, Math.round(calories)); // on envoie uniquement "stabiliser"
            }
        });
    }
});





    
// <-------------------------Intégration API Rest pour afficher recettes selon objectif-------------------------------------->


document.addEventListener('DOMContentLoaded', function() {
    const btnPerte = document.getElementById('perdre');
    const btnStabiliser = document.getElementById('stabiliser');
    const btnPrendre = document.getElementById('prendre');

    if (btnPerte) {
        btnPerte.addEventListener('click', () => afficherRecettes('perte'));
    }
    
    if (btnStabiliser) {
        btnStabiliser.addEventListener('click', () => afficherRecettes('stabiliser'));
    }
    
    if (btnPrendre) {
        btnPrendre.addEventListener('click', () => afficherRecettes('prise'));
    }
});

function afficherRecettes(type) {
    let calorieValue = 0;
    
    if (type === 'perte') {
        calorieValue = parseInt(document.getElementById('caloriePerdre').textContent, 10);
    } else if (type === 'stabiliser') {
        calorieValue = parseInt(document.getElementById('calorieStabiliser').textContent, 10);
    } else if (type === 'prise') {
        calorieValue = parseInt(document.getElementById('caloriePrendre').textContent, 10);
    }

    const targetchoix = document.getElementById('target');
    if (targetchoix) {
        targetchoix.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.getElementById('article-recette').style.display = 'block';
    fetchRecettes(type, calorieValue);
}

function fetchRecettes(type, calorieValue) {
    let maxCalories, minCarbs, maxCarbs, minProtein, maxProtein, minFat, maxFat;

    if (type === 'perte') {
        maxCalories = calorieValue - 300;
        minCarbs = 10; maxCarbs = 50;
        minProtein = 10; maxProtein = 50;
        minFat = 1; maxFat = 20;
    } else if (type === 'stabiliser') {
        maxCalories = calorieValue + 200;
        minCarbs = 10; maxCarbs = 100;
        minProtein = 10; maxProtein = 100;
        minFat = 1; maxFat = 50;
    } else if (type === 'prise') {
        maxCalories = calorieValue;
        minCarbs = 50; maxCarbs = 150;
        minProtein = 50; maxProtein = 150;
        minFat = 10; maxFat = 100;
    }



    const url = `https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${maxCalories}&minCarbs=${minCarbs}&maxCarbs=${maxCarbs}&minProtein=${minProtein}&maxProtein=${maxProtein}&minFat=${minFat}&maxFat=${maxFat}&number=3&language=fr`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': '037fdfeae43d44dfa0c60c66aaedc65c'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur API');
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
                    <p><strong>Calories : ${recipe.calories}</strong><p>
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
        const recipesDiv = document.getElementById('recettes');
        recipesDiv.innerHTML = '<p>Erreur lors de la récupération des recettes. Réessaye plus tard.</p>';
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
        if (!response.ok) throw new Error('Erreur API lors de la récupération des détails de la recette');
        return response.json();
    })
    .then(recipeDetails => {
        detailsDiv.innerHTML = `
            <p>Ingrédients : ${recipeDetails.extendedIngredients.map(ingredient => ingredient.original).join(', ')}</p>
            <p>Instructions : ${recipeDetails.instructions}</p>
        `;
        detailsDiv.style.display = 'block';
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des détails de la recette :', error);
    });
}



// <-------------------------Intégration API Json pour afficher articles-------------------------------------->

const contenueIMC = document.querySelector(".articlesIMC");
const contenueCalorie = document.querySelector(".articlesCalorie");

fetch('data/db.json')
.then(function(response) {
    return response.json();
})
.then(function(data) {

    // *<---------------Articles page IMC------------------>*//

    let htmlIMC = "";
    if (contenueIMC) { 
        if (data.contenueArticlesIMC) {
            data.contenueArticlesIMC.forEach(function(articleIMC) {
                htmlIMC += `
                    <h2>${articleIMC.titre}</h2>
                    <div>
                        <p>${articleIMC.description}</p>
                        <div class="more-content">
                            <p>${articleIMC.excedent}</p>
                        </div>
                        <button class="learn-more">Lire plus</button>
                    </div> 
                    <img src="assets/img/${articleIMC.image}" alt="${articleIMC.alt}">
                `;
            });
            contenueIMC.innerHTML = htmlIMC;
        } else {
            console.log("Aucun article IMC trouvé dans le JSON.");
        }
    }

    // *<---------------Articles page Calorie------------------>*//
    let htmlCalorie = "";
    if (contenueCalorie) { 
        if (data.contenueArticlesCalorie) {
            data.contenueArticlesCalorie.forEach(function(articleCalorie) {
                htmlCalorie += `
                    <h2>${articleCalorie.titre}</h2>
                    <div>
                        <p>${articleCalorie.description}</p>
                        <div class="more-content">
                            <p>${articleCalorie.excedent}</p>
                        </div>
                        <button class="learn-more">Lire plus</button>
                    </div> 
                    <img src="assets/img/${articleCalorie.image}" alt="${articleCalorie.alt}">
                `;
            });
            contenueCalorie.innerHTML = htmlCalorie;
        } else {
            console.log("Aucun article Calorie trouvé dans le JSON.");
        }
    }

    // *<---------------Gestion du learnMore------------------>*//
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
})
.catch(function(error) {
    console.error("Erreur lors du fetch :", error);
});



// <----------------Fonction pour sauvegarder la taille et le pods dans le localStorage------------------->
    
    
if (document.getElementById('taille') && document.getElementById('poids')) {

    document.getElementById('taille').addEventListener('input', function() {
        localStorage.setItem('taille', this.value);
    });

    document.getElementById('poids').addEventListener('input', function() {
        localStorage.setItem('poids', this.value);
    });

    window.addEventListener('DOMContentLoaded', function() {

        if (localStorage.getItem('taille')) {
            document.getElementById('taille').value = localStorage.getItem('taille');
        }

        if (localStorage.getItem('poids')) {
            document.getElementById('poids').value = localStorage.getItem('poids');
        }
    });
}


function sauvegarderDonnees(userId, imc = null, calories = null) {
  fetch('http://localhost:3000/save-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, imc, calories })
  })
    .then(res => res.json())
    .then(data => {
      console.log('✅ Données sauvegardées :', data);
    })
    .catch(err => {
      console.error('❌ Erreur de sauvegarde :', err);
    });
}





