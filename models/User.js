/***********************************************************************
 *                                                                     *
 *  Définir le model des données pour les utilisateurs                 *
 *                                                                     *
 *                                                                     *
 ***********************************************************************
 */


// Importer le module Mongoose pour la gestion des schémas et des modèles
const mongoose = require('../config/db');

// Définir le schéma du modèle pour les utilisateurs
const userSchema = new mongoose.Schema({

  // Champ 'email' de type String, obligatoire (required), et unique dans la base de données
  email: { type: String, required: true, unique: true },
  
  // Champ 'password' de type String, obligatoire (required)
  password: { type: String, required: true },
});

// Créer un modèle 'User' à partir du schéma défini
const User = mongoose.model('User', userSchema);

// Exporter le modèle pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = User;
