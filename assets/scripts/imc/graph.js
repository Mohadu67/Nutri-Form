// imc.graph.js

import { updateContent } from './content.js';

export function updateIMCGraph(imc) {
  const minIMC = 18;
  const maxIMC = 40;
  const graphWidth = document.querySelector('.main-bar').offsetWidth;
  const dynamicBar = document.querySelector('.dynamic-bar');
  const resultatIMC = document.querySelector('.resultat');

  const imcPercentage = (imc - minIMC) / (maxIMC - minIMC);
  const limitedPercentage = Math.max(0, Math.min(1, imcPercentage));
  const dynamicPosition = limitedPercentage * graphWidth;

  dynamicBar.style.display = 'block';
  dynamicBar.style.opacity = '0';
  resultatIMC.style.display = 'flex';

  setTimeout(() => {
    dynamicBar.style.opacity = '1';
    dynamicBar.style.marginLeft = dynamicPosition + 'px';
  }, 10);

  const imcResultElement = document.getElementById('imcResult');
  imcResultElement.textContent = imc;

  if (imc < 18.5) {
    imcResultElement.style.color = 'blue';
    updateContent('maigreur');
  } else if (imc >= 18.5 && imc < 25) {
    imcResultElement.style.color = 'green';
    updateContent('normal');
  } else if (imc >= 25 && imc < 30) {
    imcResultElement.style.color = 'orange';
    updateContent('surpoids');
  } else {
    imcResultElement.style.color = 'red';
    updateContent('obésité');
  }
}
