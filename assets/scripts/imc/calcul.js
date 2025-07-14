export function calculerIMC(poids, taille) {
  const imc = (poids / ((taille / 100) ** 2)).toFixed(1);
  let categorie = '';

  if (imc < 18.5) {
    categorie = 'maigreur';
  } else if (imc < 25) {
    categorie = 'normal';
  } else if (imc < 30) {
    categorie = 'surpoids';
  } else {
    categorie = 'obésité';
  }

  return { imc, categorie };
}
