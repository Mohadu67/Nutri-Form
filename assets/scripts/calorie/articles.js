import { activerLearnMore } from '../utils/ui.js';

export async function afficherArticlesCalorie() {
  const contenueCalorie = document.querySelector(".articlesCalorie");
  if (!contenueCalorie) return;

  try {
    const response = await fetch('./data/db.json');
    const data = await response.json();

    if (!data.contenueArticlesCalorie) return;

    let htmlCalorie = '';
    data.contenueArticlesCalorie.forEach(article => {
      htmlCalorie += `
        <article class="article-box">
          <h2>${article.titre}</h2>
          <div>
            <p>${article.description}</p>
            <div class="more-content">
              <p>${article.excedent}</p>
            </div>
            <button class="learn-more">Lire plus</button>
          </div> 
          <img src="../assets/img/${article.image}" alt="${article.alt}">
        </article>
      `;
    });

    contenueCalorie.innerHTML = htmlCalorie;

    activerLearnMore();

  } catch (err) {
    console.error("Erreur de chargement des articles Calorie :", err);
  }
}
