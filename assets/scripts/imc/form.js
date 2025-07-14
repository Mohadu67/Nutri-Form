import { calculerIMC } from './calcul.js';
import { updateIMCGraph } from './graph.js';
import { updateContent } from './content.js';
import { sauvegarderDonnees } from '../api/api.js';

export function initIMCForm() {
  const imcForm = document.getElementById('imcForm');

  if (imcForm) {
    imcForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const poids = parseFloat(imcForm.elements['poids'].value);
      const taille = parseFloat(imcForm.elements['taille'].value);

      if (!poids || !taille) {
        alert("Veuillez entrer un poids et une taille valides.");
        return;
      }

      const { imc, categorie } = calculerIMC(poids, taille);

      // Mise à jour UI
      updateIMCGraph(imc);
      updateContent(categorie);

      // Sauvegarde (si connecté)
      sauvegarderDonnees({ poids, taille, imc, categorie });
    });
  }
}
