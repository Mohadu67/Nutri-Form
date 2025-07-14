// imc.content.js

export function updateContent(category) {
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
    blocLearn1.innerHTML = "ton IMC indique que tu es en situation de <strong>Surpoids</strong>, correspondant à un IMC entre <strong>25 et 29,9</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Augmente ton activité physique en intégrant des exercices cardiovasculaires comme la course, la natation ou le vélo, et adopte une alimentation équilibrée pour perdre du poids progressivement.";
    blocLearn4.innerHTML = " Utilise notre <a href='calorie.html'>Calculateur de Calories</a> pour ajuster ton apport calorique et atteindre tes objectifs de perte de poids.";
  } else if (category === 'obésité') {
    blocLearn1.innerHTML = "ton IMC indique que tu es en situation d'<strong>Obésité</strong>, avec un IMC supérieur à <strong>30</strong>.";
    blocLearn2.textContent = "Par exemple, une personne très musclée peut avoir un IMC élevé et être classée dans la catégorie surpoids sans avoir un excès de graisse. C'est pour ça qu'il est important de considérer d'autres facteurs, comme ton pourcentage de masse grasse ou ta forme physique globale, plutôt que de se fier uniquement à l'IMC.";
    blocLearn3.textContent = "Il est important de consulter un professionnel de santé pour un accompagnement adapté et personnalisé, qui peut inclure un plan nutritionnel, une activité physique adaptée et un suivi médical.";
    blocLearn4.innerHTML = "Utilise notre <a href='calorie.html'>Calculateur de Calories</a> pour suivre tes apports et ajuster ton alimentation en fonction des conseils de ton professionnel de santé.";
  }
}
