// UI.js

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

export function afficherResultats(calories) {
    document.querySelector('.graph-calorie').style.display = 'flex';
    document.querySelector('.graph-calorie')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.getElementById('caloriePerdre').textContent = (calories - 500).toFixed(0);
    document.getElementById('calorieStabiliser').textContent = calories.toFixed(0);
    document.getElementById('caloriePrendre').textContent = (calories + 500).toFixed(0);
}


export function clearMessages() {
  const loginMsg = document.getElementById('loginMessage');
  const registerMsg = document.getElementById('registerMessage');
  if (loginMsg) loginMsg.textContent = '';
  if (registerMsg) registerMsg.textContent = '';

  const alertDeco = document.querySelector('.alerte-deconnexion');
  if (alertDeco) alertDeco.remove();
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function showHistorique() {
  const loginSection = document.getElementById('loginSection');
  const registerSection = document.getElementById('registerSection');
  const divHistorique = document.getElementById('userHistorique');

  if (loginSection) loginSection.style.display = 'none';
  if (registerSection) registerSection.style.display = 'none';
  if (divHistorique) divHistorique.style.display = 'block';
}


export function showLogin() {
  const loginSection = document.getElementById('loginSection');
  const registerSection = document.getElementById('registerSection');
  const divHistorique = document.getElementById('userHistorique');

  if (loginSection) loginSection.style.display = 'block';
  if (registerSection) registerSection.style.display = 'none';
  if (divHistorique) divHistorique.style.display = 'none';
}


export function updateLoginButton(isConnected) {
  const btnOpen = document.getElementById('openLogin');
  if (btnOpen) {
    btnOpen.textContent = isConnected ? 'Historique' : 'Connexion';
  }

  const reminder = document.getElementById('connectReminder');
  if (reminder) {
    if (isConnected) {
      reminder.style.display = 'none';
    } else {
      reminder.style.display = 'none';
    }
  }
}


function displayForgotPasswordPopup() {
  const content = document.createElement("div");

  content.innerHTML = `
    <h2>Mot de passe oublié</h2>
    <p>Entrez votre e-mail pour recevoir un lien de réinitialisation.</p>
    <input type="email" id="forgot-password-email" placeholder="Votre e-mail" required />
    <button id="send-reset-link">Envoyer le lien</button>
  `;

  showPopup(content);

  document.getElementById("send-reset-link").addEventListener("click", () => {
    const email = document.getElementById("forgot-password-email").value;
    if (email) {
      handleForgotPassword(email);
    } else {
      alert("Veuillez saisir un e-mail.");
    }
  });
}


export function setupFAQToggle() {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {
        const question = faq.querySelector("h3");

        question.addEventListener("click", () => {
          
            faqs.forEach(otherFaq => {
                if (otherFaq !== faq) {
                    otherFaq.classList.remove("open");
                }
            });
            
            faq.classList.toggle("open");
        });
    });
}
