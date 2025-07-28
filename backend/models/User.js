const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  imc: [{ valeur: Number, date: { type: Date, default: Date.now } }],
  calories: [{ valeur: Number, date: { type: Date, default: Date.now } }]
});

module.exports = mongoose.model('User', userSchema);

