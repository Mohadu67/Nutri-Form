import { calculerIMC } from './calcul.js';
import { updateIMCGraph } from './graph.js';
import { updateContent } from './content.js';
import { sauvegarderDonnees } from '../api/api.js';

export function initIMCForm() {
  const imcForm = document.getElementById('imcForm');
  const reminder = document.getElementById('connectReminder');

  if (imcForm) {
    imcForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const poids = parseFloat(imcForm.elements['poids'].value);
      const taille = parseFloat(imcForm.elements['taille'].value);

      if (!poids || !taille) {
        alert("Veuillez entrer un poids et une taille valides.");
        return;
      }

      
      const userId = localStorage.getItem('userId');

      if (!userId && reminder) {
        reminder.style.display = 'block'; 
      } else if (reminder) {
        reminder.style.display = 'none'; 
      }

    
      const { imc, categorie } = calculerIMC(poids, taille);

      
      updateIMCGraph(imc);
      updateContent(categorie);

     
      if (userId) {
        sauvegarderDonnees({ imc });
      }
    });
  }
}
