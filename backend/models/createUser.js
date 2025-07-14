const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./User'); // chemin vers ton modèle

// Connexion MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/nutriform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢 Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB :', err));

async function creerUtilisateur(email, motdepasse) {
  try {
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const newUser = new User({
      email,
      motdepasse: hashedPassword
    });

    await newUser.save();
    console.log('Utilisateur créé avec succès !');
  } catch (error) {
    console.error('Erreur création utilisateur :', error);
  } finally {
    mongoose.connection.close(); // ferme la connexion après insertion
  }
}

// Appelle la fonction avec les données souhaitées
creerUtilisateur('test@example.com', '123456');
