/***********************************************************************
 *                                                                     *
 *  configurer la connexion à la base de donnée                        *
 *                                                                     *
 *                                                                     *
 ***********************************************************************
 */

// Importer le module Mongoose pour la gestion de la connexion à MongoDB
const mongoose = require('mongoose');

// Établir la connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://tom:tom@cluster0.otkkgqr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,          // Utiliser un nouveau moteur de connexion MongoDB
  useUnifiedTopology: true,      // Utiliser la nouvelle infrastructure de gestion des connexions
});

// Exporter l'objet mongoose pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = mongoose;

