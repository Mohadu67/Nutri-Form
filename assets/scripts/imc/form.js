import { calculerIMC } from './calcul.js';
import { updateIMCGraph } from './graph.js';
import { updateContent } from './content.js';
import { sauvegarderDonnees } from '../api/api.js';

export function initIMCForm() {
  const imcForm = document.getElementById('imcForm');
  const reminder = document.getElementById('connectReminder'); // le message d'alerte

  if (imcForm) {
    imcForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const poids = parseFloat(imcForm.elements['poids'].value);
      const taille = parseFloat(imcForm.elements['taille'].value);

      if (!poids || !taille) {
        alert("Veuillez entrer un poids et une taille valides.");
        return;
      }

      // ✅ Vérifie la connexion
      const userId = localStorage.getItem('userId');

      if (!userId && reminder) {
        reminder.style.display = 'block'; // Affiche le message
      } else if (reminder) {
        reminder.style.display = 'none'; // Cache le message s'il est visible
      }

      // Calcul IMC
      const { imc, categorie } = calculerIMC(poids, taille);

      // Mise à jour UI
      updateIMCGraph(imc);
      updateContent(categorie);

      // Sauvegarde uniquement si connecté
      if (userId) {
        sauvegarderDonnees({ imc });
      }
    });
  }
}
