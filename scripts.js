

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


//<---------------------------Affiche d'un msg---------------------->

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
  



  //<----------------------Calcule IMC----------------------------------->

  function calculerIMC(event) {
    event.preventDefault();

    const tailleInput = document.getElementById('taille').value;
    const poidsInput = document.getElementById('poids').value;
    const tailleEnMetres = tailleInput / 100;

    if (tailleInput && poidsInput) {
        const imc = (poidsInput / (tailleEnMetres * tailleEnMetres)).toFixed(2);

        if (imc < 15) {
            showCustomAlert("Votre IMC est inférieur à 15, c'est dangereux, consultez un spécialiste !");
        } else if (imc > 40) {
            showCustomAlert("Votre IMC est supérieur à 40, c'est dangereux, consultez un spécialiste !");
        } else {
            updateIMCGraph(imc);
        }
    } else {
        showCustomAlert('Veuillez remplir tous les champs pour calculer votre IMC !');
    }
}

document.getElementById('imcForm').addEventListener('submit', calculerIMC);




// <--------------------------IMC Graph---------------------------------->

function updateIMCGraph(imc) {
    const minIMC = 18;
    const maxIMC = 40;
    const graphWidth = document.querySelector('.main-bar').offsetWidth;
    const dynamicBar = document.querySelector('.dynamic-bar');

    console.log((graphWidth))

    const imcPercentage = (imc - minIMC) / (maxIMC - minIMC);
    const limitedPercentage = Math.max(0, Math.min(1, imcPercentage));
    const dynamicPosition = limitedPercentage * graphWidth;

    dynamicBar.style.display = 'block';

    dynamicBar.style.opacity = '0';

    setTimeout(() => {
        dynamicBar.style.opacity = '1';  
        dynamicBar.style.marginLeft = dynamicPosition + 'px'; 
    }, 10);
    console.log("POSITION : " ,dynamicPosition)


    const imcResultElement = document.getElementById('imcResult');
    imcResultElement.textContent = imc;

        if (imc < 18.5) {
            imcResultElement.style.color = 'blue';
        } else if (imc >= 18.5 && imc < 25) {
            imcResultElement.style.color = 'green';
        } else {
            imcResultElement.style.color = 'red';
        }
    }

    





















// function updateIMCGraph(imc) {
//     const minIMC = 18;
//     const maxIMC = 40;
//     const graphWidth = document.querySelector('.main-bar').offsetWidth;
//     console.log((graphWidth))
//     const imcPercentage = (imc - minIMC) / (maxIMC - minIMC);
//     const limitedPercentage = Math.max(0, Math.min(1, imcPercentage));
//     const dynamicPosition = limitedPercentage * (graphWidth - document.querySelector('.dynamic-bar').offsetWidth);
//     const dynamicBar = document.querySelector('.dynamic-bar');

//     dynamicBar.style.display = 'block';
//     setTimeout(() => { 
//         dynamicBar.style.opacity = '1'; 
//         dynamicBar.style.left = dynamicPosition + 'px';
//     }, 10);
//     dynamicBar.style.opacity = '0';
    
//     dynamicBar.style.left = dynamicPosition + 'px';

//     console.log("POSITION : " ,dynamicPosition)
    
//     const imcResultElement = document.getElementById('imcResult');
//     imcResultElement.textContent = imc;
    
//     if (imc < 18.5) {
//         imcResultElement.style.color = 'blue';
//     } else if (imc >= 18.5 && imc < 25) {
//         imcResultElement.style.color = 'green';
//     } else {
//         imcResultElement.style.color = 'red';
//     }
// }




