// auth.js

import { API_BASE_URL } from './utils/config.js';
import {
    delay,
    updateLoginButton,
    clearMessages,
    showLogin,
    showHistorique,
} from './utils/ui.js';

export function initAuth() {
    fetch('login-popup.html')
        .then(res => res.text())
        .then(html => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            document.body.appendChild(wrapper);

            const modal = document.getElementById('loginModal');
            const btnOpen = document.getElementById('openLogin');
            const btnClose = document.getElementById('closeLogin');
            const btnShowRegister = document.getElementById('showRegister');
            const btnShowLogin = document.getElementById('showLogin');
            const btnLogout = document.getElementById('logoutBtn');
            const loader = document.getElementById('loading-container');

            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');

            const divHistorique = document.getElementById('userHistorique');

            const userId = localStorage.getItem('userId');


            updateLoginButton(!!userId);
            btnLogout.style.display = userId ? 'block' : 'none';

            
            if (btnOpen) {
                btnOpen.addEventListener('click', () => {
                    modal.style.display = 'block';
                    const currentId = localStorage.getItem('userId');
                    currentId ? chargerEtAfficherHistorique(currentId) : showLogin();
                });
            }

            
            btnClose.addEventListener('click', () => {
                modal.style.display = 'none';
                clearMessages();
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    clearMessages();
                }
            });

            
            btnShowRegister.addEventListener('click', () => {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('registerSection').style.display = 'block';
                divHistorique.style.display = 'none';
                clearMessages();
            });

            btnShowLogin.addEventListener('click', () => {
                showLogin();
                clearMessages();
            });

            
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                loader.style.display = 'flex';

                const email = document.getElementById('loginEmail').value;
                const motdepasse = document.getElementById('loginPassword').value;

                try {
                    const fetchPromise = fetch(`${API_BASE_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, motdepasse })
                    });

                    const [res] = await Promise.all([fetchPromise, delay(5000)]);
                    const data = await res.json();
                    loader.style.display = 'none';

                    if (res.ok) {
                        localStorage.setItem('userId', data.userId);
                        updateLoginButton(true);
                        document.getElementById('loginMessage').textContent = 'Connexion réussie !';

                        await chargerEtAfficherHistorique(data.userId);

                        setTimeout(() => {
                            modal.style.display = 'none';
                            clearMessages();
                        }, 10000);

                        
                        if (typeof window.onLoginSuccess === 'function') window.onLoginSuccess();
                    } else {
                        document.getElementById('loginMessage').textContent = data.message || 'Erreur de connexion';
                    }
                } catch (err) {
                    console.error(err);
                    loader.style.display = 'none';
                    document.getElementById('loginMessage').textContent = 'Erreur serveur';
                }
            });

            
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                loader.style.display = 'flex';

                const email = document.getElementById('registerEmail').value;
                const motdepasse = document.getElementById('registerPassword').value;
                const confirm = document.getElementById('registerConfirmPassword').value;

                if (motdepasse !== confirm) {
                    document.getElementById('registerMessage').textContent = 'Les mots de passe ne correspondent pas.';
                    loader.style.display = 'none';
                    return;
                }

                try {
                    const fetchPromise = fetch(`${API_BASE_URL}/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, motdepasse })
                    });

                    const [res] = await Promise.all([fetchPromise, delay(5000)]);
                    const data = await res.json();
                    loader.style.display = 'none';

                    if (res.ok) {
                        document.getElementById('registerMessage').textContent = 'Compte créé, vous pouvez vous connecter.';
                        showLogin();
                    } else {
                        document.getElementById('registerMessage').textContent = data.message || 'Erreur inscription';
                    }
                } catch (err) {
                    console.error(err);
                    loader.style.display = 'none';
                    document.getElementById('registerMessage').textContent = 'Erreur serveur';
                }
            });

            
            btnLogout.addEventListener('click', () => {
                localStorage.removeItem('userId');
                updateLoginButton(false);
                btnLogout.style.display = 'none';
                showLogin();
                divHistorique.style.display = 'none';
                clearMessages();
            });
            
            async function chargerEtAfficherHistorique(userId) {
                try {
                    const res = await fetch(`${API_BASE_URL}/get-data/${userId}`);
                    const data = await res.json();

                    const dernierIMC = document.getElementById('dernierIMC');
                    const dernierCal = document.getElementById('dernierCalories');
                    const ulIMC = document.getElementById('historiqueIMC');
                    const ulCal = document.getElementById('historiqueCalories');

                    if (!dernierIMC || !dernierCal || !ulIMC || !ulCal) return;

                    dernierIMC.textContent = data.imc.length
                        ? `${data.imc.at(-1).valeur} (le ${new Date(data.imc.at(-1).date).toLocaleDateString()})`
                        : 'Aucune donnée';

                    dernierCal.textContent = data.calories.length
                        ? `${data.calories.at(-1).valeur} kcal (le ${new Date(data.calories.at(-1).date).toLocaleDateString()})`
                        : 'Aucune donnée';

                    ulIMC.innerHTML = data.imc.map(i =>
                        `<li>${i.valeur} (le ${new Date(i.date).toLocaleDateString()})</li>`
                    ).join('');

                    ulCal.innerHTML = data.calories.map(c =>
                        `<li>${c.valeur} kcal (le ${new Date(c.date).toLocaleDateString()})</li>`
                    ).join('');

                    btnLogout.style.display = 'block';
                    showHistorique();
                } catch (err) {
                    console.error("❌ Erreur récupération historique:", err);
                }
            }
        })
        .catch(err => {
            console.error('Erreur chargement popup login:', err);
        });
}

