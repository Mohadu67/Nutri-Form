require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;


// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB :', err));

// Middleware
app.use(cors());
app.use(express.json());

// Test simple
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de NutriForm 🚀');
});

// Inscription
app.post('/register', async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'Utilisateur déjà enregistré.' });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const newUser = new User({
      email,
      motdepasse: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, motdepasse } = req.body;
  
  try {
    const user = await User.findOne({ email });
    console.log("✅ Utilisateur trouvé :", user);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const passwordMatch = await bcrypt.compare(motdepasse, user.motdepasse);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie.', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});

app.post('/save-data', async (req, res) => {
  console.log('Requête /save-data reçue avec body:', req.body);
  const { userId, imc, calories } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    if (imc) user.imc.push({ valeur: imc });
    if (calories) user.calories.push({ valeur: calories });


    await user.save();

    res.json({ message: "Données sauvegardées avec succès ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur ❌" });
  }
});



app.get('/get-data/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({
      imc: user.imc,
      calories: user.calories
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

