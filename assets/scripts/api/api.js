export async function sauvegarderDonnees(userId, imc, calories) {
  try {
    const reponse = await fetch('http://localhost:3000/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        imc,
        calories,
        date: new Date().toISOString()
      }),
    });

    const data = await reponse.json();
    console.log('Données sauvegardées avec succès :', data);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données :', error);
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