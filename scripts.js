

//<----------------------Learn More----------------------------------->
const btns = document.querySelectorAll(".learn-more");

btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        const moreContent = this.previousElementSibling;

        if (moreContent.classList.contains("open")) {
            moreContent.classList.remove("open");
            this.textContent = "Lire plus";
        } else {
            moreContent.classList.add("open");
            this.textContent = "Lire moins";
        }
    });
});



//<----------------------Calcule IMC----------------------------------->

function showCustomAlert(message) {
    const alertDiv = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    alertDiv.style.display = 'block';
  }
  
  function closeAlert() {
    const alertDiv = document.getElementById('customAlert');
    alertDiv.style.display = 'none';
  }
  
  function calculerIMC(event) {
    event.preventDefault();
  
    const tailleInput = document.getElementById('taille').value;
    const poidsInput = document.getElementById('poids').value;
    const tailleEnMetres = tailleInput / 100;
  
    if (tailleInput && poidsInput) {
      const imc = (poidsInput / (tailleEnMetres * tailleEnMetres)).toFixed(2);
      updateIMCGraph(imc);
    } else {
      showCustomAlert('Veuillez remplir tout les champs pour calculer votre IMC !');
    }
  }
  
  document.getElementById('imcForm').addEventListener('submit', calculerIMC);
  


function updateIMCGraph(imc) {
    const minIMC = 18;
    const maxIMC = 40;


    const graphWidth = document.querySelector('.main-bar').offsetWidth;


    const imcPercentage = (imc - minIMC) / (maxIMC - minIMC);


    const limitedPercentage = Math.max(0, Math.min(1, imcPercentage));


    const dynamicPosition = limitedPercentage * (graphWidth - document.querySelector('.dynamic-bar').offsetWidth);

    const dynamicBar = document.querySelector('.dynamic-bar');
    dynamicBar.style.left = dynamicPosition + 'px';
}


