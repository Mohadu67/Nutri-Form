export function calculerTMB({ sexe, poids, taille, age, formule, masseGrasse }) {
    if (formule === 'standard' || formule === 'mifflin') {
        return (sexe === 'huey')
            ? 10 * poids + 6.25 * taille - 5 * age + 5
            : 10 * poids + 6.25 * taille - 5 * age - 161;
    }

    if (formule === 'katch') {
        const masseMaigre = poids * (1 - (masseGrasse / 100));
        return 370 + (21.6 * masseMaigre);
    }

    return 0;
}

export function ajusterSelonActivité(tmb, activité) {
    const facteurs = {
        peuactif: 1.2,
        moyen: 1.55,
        actif: 1.75,
        trésactif: 1.9
    };

    return tmb * (facteurs[activité] || 1.2);
}