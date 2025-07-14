// Le learn more

export function activerLearnMore() {
  const btns = document.querySelectorAll(".learn-more");

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
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
}

// affichage message d'alerte

export function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");

  if (alertBox && alertMessage) {
    alertMessage.textContent = message;
    alertBox.style.display = "block";
  }
}

export function closeAlert() {
  const alertBox = document.getElementById("customAlert");
  if (alertBox) {
    alertBox.style.display = "none";
  }
}



// affichage calorie 


export function afficherResultats(calories) {
    document.querySelector('.graph-calorie').style.display = 'flex';
    document.querySelector('.graph-calorie')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.getElementById('caloriePerdre').textContent = (calories - 500).toFixed(0);
    document.getElementById('calorieStabiliser').textContent = calories.toFixed(0);
    document.getElementById('caloriePrendre').textContent = (calories + 500).toFixed(0);
}