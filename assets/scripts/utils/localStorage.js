// Sauvegarde auto dans localStorage
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


export function sauvegarderDonnees(userId, imc = null, calories = null) {
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
