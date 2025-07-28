// // Mainjs

import { initAuth } from './auth.js';
import { closeAlert } from './utils/ui.js';
import { afficherHistorique } from './utils/localStorage.js';

// Import des fonctions spécifiques aux pages
import { initIMCForm } from './imc/form.js';
import { afficherArticlesIMC } from './imc/articles.js';

import { initialiserFormulaireCalorie } from './calorie/form.js';
import { afficherArticlesCalorie } from './calorie/articles.js';

import { initSauvegardeAuto, sauvegarderDonnees } from './utils/localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  window.closeAlert = closeAlert;
  
  const userId = localStorage.getItem('userId');

  if (userId) {
    fetch(`http://localhost:3000/get-data/${userId}`)
      .then(res => res.json())
      .then(data => {
        afficherHistorique(data.imc || [], data.calories || []);
      })
      .catch(err => {
        console.error("❌ Erreur lors de la récupération des données :", err);
      });
  } else {
    console.warn("🔴 Aucun userId trouvé dans le localStorage, impossible d'afficher l'historique.");
  }

  // Détecter la page via data-page et appeler les fonctions spécifiques
  const page = document.body.dataset.page;

  switch(page) {
    case 'imc':
      initIMCForm();
      afficherArticlesIMC();
      initSauvegardeAuto();
      initAuth();
      const reminder = document.getElementById('connectReminder');
      if (reminder && !localStorage.getItem('userId')) {
        reminder.style.display = 'block';
    }
      break;

    case 'calorie':
      initialiserFormulaireCalorie();
      afficherArticlesCalorie();
      initSauvegardeAuto();
      sauvegarderDonnees();
      break;

    // Ajoute d'autres cas si besoin

    default:
      // page sans besoin particulier
      break;
  }
});
