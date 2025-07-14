


import { initialiserFormulaireCalorie } from '../calorie/form.js';

import { initSauvegardeAuto, sauvegarderDonnees } from '../utils/localStorage.js';

import { afficherArticlesCalorie } from './articles.js';


afficherArticlesCalorie();

initialiserFormulaireCalorie();

document.addEventListener('DOMContentLoaded', () => {
  initSauvegardeAuto();
  
});