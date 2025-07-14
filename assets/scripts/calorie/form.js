import { calculerTMB, ajusterSelonActivité } from './calcul.js';
import { afficherResultats } from '../utils/ui.js';
import { sauvegarderDonnees } from '../api/api.js';

export function initialiserFormulaireCalorie() {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('calorieForm');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = {
                sexe: document.querySelector('input[name="sexe"]:checked')?.value,
                taille: parseFloat(document.getElementById('taille').value),
                poids: parseFloat(document.getElementById('poids').value),
                age: parseInt(document.getElementById('age').value),
                activité: document.querySelector('input[name="activité"]:checked')?.value,
                formule: document.getElementById('liste-deroulante').value
            };

            if (!data.sexe || !data.taille || !data.poids || !data.age || !data.activité || !data.formule) return;

            const tmb = calculerTMB(data);
            const calories = ajusterSelonActivité(tmb, data.activité);

            afficherResultats(calories);

            const userId = localStorage.getItem('userId');
            if (userId) {
                sauvegarderDonnees(userId, null, Math.round(calories));
            }
        });
    });
}
