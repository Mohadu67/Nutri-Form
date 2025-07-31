import { API_BASE_URL } from './utils/config.js';

export function initAuth() {
    // Charger le fichier HTML popup et l'injecter
    fetch('login-popup.html')
        .then(res => res.text())
        .then(html => {
            const div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div);

            // Elements
            const modal = document.getElementById('loginModal');
            const btnOpen = document.getElementById('openLogin');
            const btnClose = document.getElementById('closeLogin');
            const loginSection = document.getElementById('loginSection');
            const registerSection = document.getElementById('registerSection');
            const divHistorique = document.getElementById('userHistorique');
            const btnShowRegister = document.getElementById('showRegister');
            const btnShowLogin = document.getElementById('showLogin');

            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const btnLogout = document.getElementById('logoutBtn');

           
            const loader = document.getElementById('loading-container');

            
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            
            if (localStorage.getItem('userId')) {
                updateLoginButton(true);
            }

            if (localStorage.getItem('userId')) {
                btnLogout.style.display = 'block'; 
            } else {
                btnLogout.style.display = 'none';
            }

            
            if (btnOpen) {
                btnOpen.addEventListener('click', () => {
                    modal.style.display = 'block';
                    const userId = localStorage.getItem('userId');
                    if (userId) {
                        chargerEtAfficherHistorique(userId);
                    } else {
                        showLogin();
                    }
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
                loginSection.style.display = 'none';
                registerSection.style.display = 'block';
                divHistorique.style.display = 'none';
                clearMessages();
            });

            btnShowLogin.addEventListener('click', () => {
                showLogin();
                clearMessages();
            });

            function showLogin() {
                loginSection.style.display = 'block';
                registerSection.style.display = 'none';
                divHistorique.style.display = 'none';
            }

            function showHistorique() {
                loginSection.style.display = 'none';
                registerSection.style.display = 'none';
                divHistorique.style.display = 'block';
            }

            function clearMessages() {
                document.getElementById('loginMessage').textContent = '';
                document.getElementById('registerMessage').textContent = '';
                const oldAlert = document.querySelector('.alerte-deconnexion');
                if (oldAlert) oldAlert.remove();
            }

            function updateLoginButton(isConnected) {
                if (btnOpen) {
                    btnOpen.textContent = isConnected ? 'Mon historique' : 'Se connecter';
                }

                const reminder = document.getElementById('connectReminder');
                if (reminder) {
                    reminder.style.display = isConnected ? 'none' : reminder.style.display;
                }
            }

            
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                loader.style.display = 'flex'; 

                const email = document.getElementById('loginEmail').value;
                const motdepasse = document.getElementById('loginPassword').value;

                try {
                    const fetchPromise = fetch(`${API_BASE_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, motdepasse }),
                    });

                    
                    const [res] = await Promise.all([fetchPromise, delay(3000)]);

                    const data = await res.json();

                    loader.style.display = 'none';

                    if (res.ok) {
                        localStorage.setItem('userId', data.userId);
                        document.getElementById('loginMessage').textContent = 'Connexion réussie !';
                        updateLoginButton(true);

                        await chargerEtAfficherHistorique(data.userId);

                        setTimeout(() => {
                            modal.style.display = 'none';
                            clearMessages();
                        }, 10000);

                        réinitialiserInactivité();
                    } else {
                        document.getElementById('loginMessage').textContent = data.message || 'Erreur de connexion';
                    }
                } catch (err) {
                    document.getElementById('loginMessage').textContent = 'Erreur serveur';
                    console.error(err);
                    loader.style.display = 'none'; 
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
                        body: JSON.stringify({ email, motdepasse }),
                    });

                    
                    const [res] = await Promise.all([fetchPromise, delay(3000)]);

                    const data = await res.json();

                    loader.style.display = 'none';

                    if (res.ok) {
                        document.getElementById('registerMessage').textContent = 'Compte créé, vous pouvez vous connecter.';
                        showLogin();
                    } else {
                        document.getElementById('registerMessage').textContent = data.message || 'Erreur inscription';
                    }
                } catch (err) {
                    document.getElementById('registerMessage').textContent = 'Erreur serveur';
                    console.error(err);
                    loader.style.display = 'none'; 
                }
            });

            
            if (btnLogout) {
                btnLogout.addEventListener('click', () => {
                    localStorage.removeItem('userId');
                    updateLoginButton(false);
                    showLogin();
                    divHistorique.style.display = 'none';
                    clearMessages();
                });
            }

            // 
            if (localStorage.getItem('userId')) {
                réinitialiserInactivité();
            }

           
            ['click', 'keydown', 'mousemove', 'scroll'].forEach(evt =>
                window.addEventListener(evt, réinitialiserInactivité)
            );

            
            function réinitialiserInactivité() {
                clearTimeout(window.inactivitéTimer);

                window.inactivitéTimer = setTimeout(() => {
                    localStorage.removeItem('userId');
                    updateLoginButton(false);
                    showLogin();
                    divHistorique.style.display = 'none';
                    afficherAlerteDéconnexion();
                }, 15 * 60 * 1000 );
            }

            function afficherAlerteDéconnexion() {
                const msg = document.createElement('div');
                msg.className = 'alerte-deconnexion';
                msg.textContent = '⚠️ Vous n\'êtes plus connecté. Vos données ne seront pas enregistrées.';
                msg.style.color = 'red';
                msg.style.marginTop = '10px';
                msg.style.fontWeight = 'bold';

                const old = document.querySelector('.alerte-deconnexion');
                if (old) old.remove();

                const form = document.getElementById('loginForm') || document.querySelector('form');
                if (form && form.parentNode) {
                    form.parentNode.insertBefore(msg, form.nextSibling);
                }
            }

           
            async function chargerEtAfficherHistorique(userId) {
                try {
                    const res = await fetch(`${API_BASE_URL}/get-data/${userId}`);
                    const data = await res.json();

                    const dernierIMC = document.getElementById('dernierIMC');
                    const dernierCal = document.getElementById('dernierCalories');
                    const ulIMC = document.getElementById('historiqueIMC');
                    const ulCal = document.getElementById('historiqueCalories');

                    if (!dernierIMC || !dernierCal || !ulIMC || !ulCal) return;

                    
                    if (data.imc.length > 0) {
                        const last = data.imc.at(-1);
                        dernierIMC.textContent = `${last.valeur} (le ${new Date(last.date).toLocaleDateString()})`;
                    } else {
                        dernierIMC.textContent = "Aucune donnée";
                    }

                    
                    if (data.calories.length > 0) {
                        const last = data.calories.at(-1);
                        dernierCal.textContent = `${last.valeur} kcal (le ${new Date(last.date).toLocaleDateString()})`;
                    } else {
                        dernierCal.textContent = "Aucune donnée";
                    }

                    
                    ulIMC.innerHTML = data.imc.map(i =>
                        `<li>${i.valeur} (le ${new Date(i.date).toLocaleDateString()})</li>`
                    ).join('');

                    ulCal.innerHTML = data.calories.map(c =>
                        `<li>${c.valeur} kcal (le ${new Date(c.date).toLocaleDateString()})</li>`
                    ).join('');

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
