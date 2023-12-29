/***********************************************************************
 *                                                                     *
 *  configurer les routes d'authentification                           *
 *                                                                     *
 *                                                                     *
 ***********************************************************************
 */

const express = require('express');
const router = express.Router();

// Importer Bcrypt pour le hachage des mots de passe
const bcrypt = require('bcrypt');

// Importer JsonWebToken pour la gestion des tokens JWT
const jwt = require('jsonwebtoken');

// Importer le modèle User défini dans le fichier ../models/User.js
const User = require('../models/User');

// Définir la route POST pour l'inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
  try {
    // Extraire les données (email et password) du corps de la requête
    const { email, password } = req.body;
    // Hasher le mot de passe avec Bcrypt (coût du hachage : 10)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer une nouvelle instance de l'utilisateur avec le mot de passe haché
    const user = new User({ email, password: hashedPassword });
    // Enregistrer l'utilisateur dans la base de données
    await user.save();
    // Renvoyer une réponse avec un statut 201 (Created) en cas de succès
    res.status(201).json({ message: 'utilisateur enregistré avec succès' });
  } catch (error) {
    // En cas d'erreur pendant le processus d'inscription, renvoyer une réponse avec un statut 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
});

// Définir la route POST pour la connexion d'un utilisateur existant
router.post('/login', async (req, res) => {
  try {
    // Extraire les données (email et password) du corps de la requête
    const { email, password } = req.body;
    // Rechercher l'utilisateur dans la base de données par son email
    const user = await User.findOne({ email });
    
    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Vérifier si le mot de passe fourni correspond au mot de passe haché dans la base de données
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // Si les mots de passe ne correspondent pas, renvoyer une réponse avec un statut 401 (Unauthorized)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Si l'authentification réussit, générer un token JWT contenant l'ID de l'utilisateur
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    // Renvoyer le token dans la réponse
    res.json({ token });
  } catch (error) {
    // En cas d'erreur pendant le processus de connexion, renvoyer une réponse avec un statut 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
});

// Exporter le routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;

