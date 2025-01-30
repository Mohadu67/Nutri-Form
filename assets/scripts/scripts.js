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
    bloc3.textContent = "Il est essentiel d'augmenter votre apport calorique de manière saine en consommant des aliments riches en nutriments.";
    bloc4.textContent = "Maintenir un poids santé permet d’éviter des complications, comme l'affaiblissement du système immunitaire ou la perte musculaire.";
} else if (category === 'normal') {
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Continuez à adopter une alimentation équilibrée, riche en fruits, légumes et protéines maigres.";
    bloc4.textContent = "Maintenir un poids normal vous protège contre de nombreux problèmes de santé, notamment les maladies cardiovasculaires, le diabète et certains cancers.";
} else if (category === 'surpoids') {
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Il est conseillé d'adopter une alimentation équilibrée, riche en fruits, légumes et fibres, tout en réduisant les aliments transformés et riches en calories.";
    bloc4.textContent = "Le surpoids peut avoir des conséquences graves sur la santé à long terme. Réduire votre poids peut améliorer votre qualité de vie, prévenir les maladies et augmenter votre espérance de vie.";
} else if (category === 'obésité') {
    bloc1.textContent = "L'IMC (Indice de Masse Corporelle) est une mesure utilisée pour évaluer la corpulence d'une personne en fonction de son poids et de sa taille.";
    bloc2.textContent = "L'IMC est basé uniquement sur la taille et le poids, et il ne tient pas compte de la composition corporelle tel que la proportion de muscle, de graisse, d'eau etc...";
    bloc3.textContent = "Un suivi médical est fortement recommandé pour les personnes souffrant d'obésité. Il est important d'adopter un régime alimentaire contrôlé et riche en nutriments, tout en réduisant l'apport calorique.";
    bloc4.textContent = "L'obésité présente des risques importants pour la santé à long terme. En plus d'affecter la qualité de vie, elle peut entraîner des complications graves comme des maladies chroniques et des handicaps physiques.";
}


if (category === 'maigreur') {
    blocLearn1.innerHTML = "Votre IMC indique que vous êtes en situation de <strong>maigreur</strong>, ce qui correspond à un IMC <strong>inférieur à 18,5</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Privilégiez les protéines, les glucides complexes et les graisses saines, et incluez des collations entre les repas. Un suivi médical est recommandé pour élaborer un plan de nutrition adapté.";
    blocLearn4.textContent = "Régler votre situation de maigreur peut améliorer votre bien-être général, prévenir les maladies et renforcer vos os et votre musculature.";
} else if (category === 'normal') {
    blocLearn1.innerHTML = "Votre IMC indique que vous êtes en situation <strong>normal</strong>, qui correspond a un IMC entre <strong>18,5 et 24,9</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Il est aussi important de rester actif physiquement, avec au moins 30 minutes d'exercice modéré par jour. Surveillez votre poids régulièrement pour rester dans cette fourchette.";
    blocLearn4.textContent = "Un mode de vie sain contribue à un bien-être physique et mental durable, tout en favorisant une bonne qualité de vie.";
} else if (category === 'surpoids') {
    blocLearn1.innerHTML = "Votre IMC indique que vous êtes en situation de <strong>surpoids</strong>, qui correspond a un IMC entre <strong>25 et 29,9</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Augmentez aussi votre activité physique quotidienne, comme la marche rapide ou la natation, pour favoriser la perte de poids.";
    blocLearn4.textContent = "Prendre des mesures dès maintenant permet de limiter les risques futurs pour la santé.";
} else if (category === 'obésité') {
    blocLearn1.innerHTML = "Votre IMC indique que vous êtes en situation <strong>d'obésité</strong>, qui correspond a un IMC <strong>supérieur à 30</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
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


    
// <-------------------------Intégration API Rest pour afficher recettes selon objectif-------------------------------------->


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
    targetchoix.scrollIntoView({
        behavior: 'smooth', 
        block: 'start'
    });
}

document.getElementById('article-recette').style.display = 'block';


fetchRecettes(type, calorieValue);
}


function fetchRecettes(type, calorieValue) {
let  maxCalories, minCarbs, maxCarbs, minProtein, maxProtein, minFat, maxFat;

if (type === 'perte') {

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
    detailsDiv.innerHTML =

     `
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


// <-------------------------Intégration API Json pour afficher recettes selon objectif-------------------------------------->

const contenueIMC = document.querySelector(".articlesIMC");
const contenueCalorie = document.querySelector(".articlesCalorie");

fetch('http://127.0.0.1:5502/db.json')
.then(function(response) {
    return response.json();
})
.then(function(data) {

    // *<---------------Articles page IMC------------------>*//
    let htmlIMC = "";
    if (contenueIMC) {  // Vérifie si l'élément .articlesIMC existe
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
                    <img src="/assets/img/${articleIMC.image}" alt="${articleIMC.alt}">
                `;
            });
            contenueIMC.innerHTML = htmlIMC;
        } else {
            console.log("Aucun article IMC trouvé dans le JSON.");
        }
    }

    // *<---------------Articles page Calorie------------------>*//
    let htmlCalorie = "";
    if (contenueCalorie) {  // Vérifie si l'élément .articlesCalorie existe
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
                    <img src="/assets/img/${articleCalorie.image}" alt="${articleCalorie.alt}">
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



