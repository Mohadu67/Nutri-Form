// localStorage.js


export function initSauvegardeAuto() {
  const tailleInput = document.getElementById('taille');
  const poidsInput = document.getElementById('poids');

  if (tailleInput && poidsInput) {
    tailleInput.addEventListener('input', () => {
      localStorage.setItem('taille', tailleInput.value);
    });

    poidsInput.addEventListener('input', () => {
      localStorage.setItem('poids', poidsInput.value);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const taille = localStorage.getItem('taille');
      const poids = localStorage.getItem('poids');
      if (taille) tailleInput.value = taille;
      if (poids) poidsInput.value = poids;
    });
  }
}

import { API_BASE_URL } from './config.js';

export function sauvegarderDonnees(imc = null, calories = null) {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  fetch(`${API_BASE_URL}/save-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, imc, calories })
  })
    .then(res => res.json())
}



export function afficherHistorique(imcs = [], calories = []) {
  const imcSpan = document.getElementById('imcData');
  const caloSpan = document.getElementById('caloriesData');
  const historiqueDiv = document.getElementById('historiqueData');

  if(imcSpan) {
    if (imcs.length > 0) {
      const dernier = imcs.at(-1);
      imcSpan.textContent = `${dernier.valeur} (le ${new Date(dernier.date).toLocaleDateString()})`;
    } else {
      imcSpan.textContent = "Aucune donnée";
    }
  }

  if(caloSpan) {
    if (calories.length > 0) {
      const dernier = calories.at(-1);
      caloSpan.textContent = `${dernier.valeur} kcal (le ${new Date(dernier.date).toLocaleDateString()})`;
    } else {
      caloSpan.textContent = "Aucune donnée";
    }
  }

  if(historiqueDiv) {
    historiqueDiv.innerHTML = `
      <h3>Historique IMC</h3>
      <ul>${imcs.map(i => `<li>${i.valeur} (le ${new Date(i.date).toLocaleDateString()})</li>`).join('')}</ul>
      <h3>Historique Calories</h3>
      <ul>${calories.map(c => `<li>${c.valeur} kcal (le ${new Date(c.date).toLocaleDateString()})</li>`).join('')}</ul>
    `;
  }
}

