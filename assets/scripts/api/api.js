 import { API_BASE_URL } from '../utils/config.js';

export async function sauvegarderDonnees({ imc = null, calories = null }) {
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    console.warn("Aucun userId trouvé dans le localStorage, données non sauvegardées.");
    return;
  }

  const payload = {
    userId,
    imc,
    calories,
    date: new Date().toISOString()
  };


try {
  const response = await fetch(`${API_BASE_URL}/save-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  } catch (error) {
    console.error(' Erreur lors de la sauvegarde :', error);
  }
}



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