export async function afficherArticlesIMC() {
  const contenueIMC = document.querySelector(".articlesIMC");
  if (!contenueIMC) return;

  try {
    const response = await fetch('../data/db.json');
    const data = await response.json();

    if (!data.contenueArticlesIMC) return;

    let htmlIMC = '';
    data.contenueArticlesIMC.forEach(article => {
      htmlIMC += `
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

    contenueIMC.innerHTML = htmlIMC;

  } catch (err) {
    console.error("Erreur de chargement des articles IMC :", err);
  }
}
