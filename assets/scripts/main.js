// // Mainjs

import { initAuth } from './auth.js';
import { closeAlert } from './utils/ui.js';
import { initSauvegardeAuto, sauvegarderDonnees } from './utils/localStorage.js';
import { initIMCForm } from './imc/form.js';
import { initialiserFormulaireCalorie } from './calorie/form.js';
import { afficherArticlesIMC } from './imc/articles.js';
import { afficherArticlesCalorie } from './calorie/articles.js';
import { afficherHistorique } from './utils/localStorage.js';
import { API_BASE_URL } from './utils/config.js';



document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  window.closeAlert = closeAlert;
  
  const userId = localStorage.getItem('userId');

if (userId) {
  fetch(`${API_BASE_URL}/get-data/${userId}`)
    .then(res => res.json())
    .then(data => {
      afficherHistorique(data.imc || [], data.calories || []);
    })
    .catch(err => {
      console.error("❌ Erreur lors de la récupération des données :", err);
    });
} else {
  
  const reminder = document.getElementById('connectReminder');
  if (reminder) reminder.style.display = 'block'; 
  
}

  
  const page = document.body.dataset.page;

  switch(page) {
    case 'imc':
      initIMCForm();
      afficherArticlesIMC();
      initSauvegardeAuto();
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

    

    default:

      break;
  }
});
