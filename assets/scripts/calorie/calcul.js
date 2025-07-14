export function calculerTMB({ sexe, poids, taille, age, formule }) {
    if (formule === 'standard' || formule === 'mifflin') {
        return (sexe === 'huey')
            ? 10 * poids + 6.25 * taille - 5 * age + 5
            : 10 * poids + 6.25 * taille - 5 * age - 161;
    }

    if (formule === 'harris') {
        return (sexe === 'huey')
            ? 66.5 + (13.75 * poids) + (5.003 * taille) - (6.75 * age)
            : 655 + (9.563 * poids) + (1.850 * taille) - (4.676 * age);
    }

    if (formule === 'katch') {
        const masseGrasse = 1 - 0.24;
        const masseMagre = poids * masseGrasse;
        return 370 + (21.6 * masseMagre);
    }

    return 0;
}

export function ajusterSelonActivité(tmb, activité) {
    const facteurs = {
        faible: 1.2,
        moyen: 1.55,
        actif: 1.75,
        trésactif: 1.9
    };

    return tmb * (facteurs[activité] || 1.2);
}
