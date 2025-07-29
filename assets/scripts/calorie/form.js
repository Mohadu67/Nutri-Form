import { calculerTMB, ajusterSelonActivité } from './calcul.js';
import { afficherResultats } from '../utils/ui.js';
import { sauvegarderDonnees } from '../api/api.js';

export function initialiserFormulaireCalorie() {
    const form = document.getElementById('calorieForm');
    const selectFormule = document.getElementById('liste-deroulante');
    const masseGrasseWrapper = document.getElementById('masse-grasse-wrapper');
    const messageKatch = document.getElementById('message-katch');
    const infoActivite = document.getElementById('info-activite');
    const infoActiviteText = document.getElementById('info-activite-text');
    const reminder = document.getElementById('connectReminder'); 

    if (!form) return;

    // Gestion du changement de formule
    selectFormule.addEventListener('change', () => {
        const formule = selectFormule.value;

        if (formule === 'katch') {
            masseGrasseWrapper.style.display = 'block';
            messageKatch.style.display = 'block';
        } else {
            masseGrasseWrapper.style.display = 'none';
            messageKatch.style.display = 'none';
        }
    });

    // Gestion du bouton ❔ activité
    infoActivite?.addEventListener('click', () => {
        const isVisible = infoActiviteText.style.display === 'block';
        infoActiviteText.style.display = isVisible ? 'none' : 'block';
    });

    // Soumission du formulaire
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            sexe: document.querySelector('input[name="sexe"]:checked')?.value,
            taille: parseFloat(document.getElementById('taille').value),
            poids: parseFloat(document.getElementById('poids').value),
            age: parseInt(document.getElementById('age').value),
            activité: document.querySelector('input[name="activité"]:checked')?.value,
            formule: selectFormule.value,
            masseGrasse: parseFloat(document.getElementById('masse-grasse')?.value) || null
        };

        if (!data.sexe || !data.taille || !data.poids || !data.age || !data.activité || !data.formule) return;

        if (data.formule === 'katch' && (data.masseGrasse === null || isNaN(data.masseGrasse))) {
            alert("Merci de renseigner votre masse grasse en % pour utiliser cette formule.");
            return;
        }

        const tmb = calculerTMB(data);
        let calories = ajusterSelonActivité(tmb, data.activité);
        calories = Math.round(calories);

        afficherResultats(calories);

        // ✅ Gestion affichage message connexion
        const userId = localStorage.getItem('userId');
        if (!userId && reminder) {
            reminder.style.display = 'block';
        } else if (reminder) {
            reminder.style.display = 'none';
        }

        // ✅ Sauvegarde si connecté
        if (userId) {
            sauvegarderDonnees({ calories });
        }
    });
}
