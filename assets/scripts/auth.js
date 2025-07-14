// auth.js

export function initAuth() {
    // Charger le fichier HTML popup et l'injecter
    fetch('login-popup.html')
        .then(res => res.text())
        .then(html => {
            const div = document.createElement('div');
            div.innerHTML = html;
            document.body.appendChild(div);

        // Elements popup
        const modal = document.getElementById('loginModal');
        const btnOpen = document.getElementById('openLogin');
        const btnClose = document.getElementById('closeLogin');
        const loginSection = document.getElementById('loginSection');
        const registerSection = document.getElementById('registerSection');
        const btnShowRegister = document.getElementById('showRegister');
        const btnShowLogin = document.getElementById('showLogin');

        // Ouvrir popup au clic sur bouton "Se connecter"
        if(btnOpen){
            btnOpen.addEventListener('click', () => {
            modal.style.display = 'block';
            showLogin();
            });
        }

        // Fermer popup au clic sur la croix
        btnClose.addEventListener('click', () => {
            modal.style.display = 'none';
            clearMessages();
        });

        // Fermer popup si clic en dehors du contenu
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
            modal.style.display = 'none';
            clearMessages();
            }
        });

        // Switch vers formulaire inscription
        btnShowRegister.addEventListener('click', () => {
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
            clearMessages();
        });

        // Switch vers formulaire login
        btnShowLogin.addEventListener('click', () => {
            showLogin();
            clearMessages();
        });

        function showLogin() {
            loginSection.style.display = 'block';
            registerSection.style.display = 'none';
        }

        function clearMessages() {
            document.getElementById('loginMessage').textContent = '';
            document.getElementById('registerMessage').textContent = '';
        }

        // Soumission formulaire login
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const motdepasse = document.getElementById('loginPassword').value;

            try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, motdepasse }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userId', data.userId);
                document.getElementById('loginMessage').textContent = 'Connexion réussie !';
                // Fermer popup après un délai
                setTimeout(() => {
                modal.style.display = 'none';
                clearMessages();
                // Ici, tu peux ajouter une fonction pour mettre à jour l'UI si connecté
                }, 1000);
            } else {
                document.getElementById('loginMessage').textContent = data.message || 'Erreur de connexion';
            }
            } catch (err) {
            document.getElementById('loginMessage').textContent = 'Erreur serveur';
            console.error(err);
            }
        });

        // Soumission formulaire inscription
        const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('registerEmail').value;
            const motdepasse = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('registerConfirmPassword').value;

            if (motdepasse !== confirm) {
            document.getElementById('registerMessage').textContent = 'Les mots de passe ne correspondent pas.';
            return;
            }

            try {
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, motdepasse }),
            });
            const data = await res.json();

            if (res.ok) {
                document.getElementById('registerMessage').textContent = 'Compte créé avec succès, vous pouvez vous connecter.';
                // Revenir au login
                showLogin();
            } else {
                document.getElementById('registerMessage').textContent = data.message || 'Erreur inscription';
            }
            } catch (err) {
            document.getElementById('registerMessage').textContent = 'Erreur serveur';
            console.error(err);
            }
        });

        })
        .catch(err => {
        console.error('Erreur chargement popup login:', err);
        });
    };
