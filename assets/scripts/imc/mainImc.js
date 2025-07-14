// mainImc.js

import { initIMCForm } from './form.js';
import { activerLearnMore, closeAlert } from '../utils/ui.js';
import { initAuth } from '../auth.js';
import { initSauvegardeAuto, sauvegarderDonnees } from '../utils/localStorage.js';
import { afficherArticlesIMC } from './articles.js';




afficherArticlesIMC();

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initIMCForm();
  activerLearnMore();
  window.closeAlert = closeAlert;
});


document.addEventListener('DOMContentLoaded', () => {
  initSauvegardeAuto();
  
});