const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./User'); 

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
    console.log('Bienvenu parmis nous.');
  } catch (error) {
    console.error('Erreur création utilisateur :', error);
  } finally {
    mongoose.connection.close();
  }
}

creerUtilisateur('test@example.com', '123456');


// import { envoyerEmailVerification } from '../../backend/models/mailers.js'; 
// import crypto from 'crypto';

// // Dans ta route POST /register :
// const token = crypto.randomBytes(32).toString('hex');
// // Stocke ce token en base de données avec l'utilisateur, et envoie le mail :
// await envoyerEmailVerification(email, token);

