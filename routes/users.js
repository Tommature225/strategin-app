
/***********************************************************************
 *                                                                     *
 *  configurer les routes pour accéder à la liste des utilisateurs     *
 *                                                                     *
 *                                                                     *
 ***********************************************************************
 */

// Importer le framework Express pour gérer les routes
const express = require('express');

// Créer un routeur Express pour gérer les routes liées aux utilisateurs
const router = express.Router();

// Importer le modèle User défini dans le fichier ../models/User.js
const User = require('../models/User');

// Importer le middleware d'authentification défini dans le fichier ../middleware/auth.js
const authMiddleware = require('../middleware/auth');

// Définir une route GET pour l'accès à la liste des utilisateurs
// Le middleware authMiddleware est utilisé pour vérifier l'authentification avant d'accéder à cette route
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Utiliser Mongoose pour rechercher tous les utilisateurs dans la base de données
    // Le deuxième argument 'email' spécifie les champs à inclure dans les résultats
    const users = await User.find({}, 'email');
    
    // Envoyer la liste des utilisateurs au format JSON dans la réponse
    res.json(users);
  } catch (error) {
    // En cas d'erreur pendant la recherche des utilisateurs, renvoyer une réponse avec un statut 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
});

// Exporter le routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;
