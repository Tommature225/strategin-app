/*
        Réalisé par TRAORE Ogban Moussa 
                
                    Alias


     ███████     ██████       ████       ███║
        ██╗     ██╔═████╗     ██║ ██║ ██║ ██║
        ██║     ██║██╔██║     ██║   ██║   ██║
        ██║     ████╔╝██║     ██║         ██║
        ██║     ╚██████╔╝     ██║         ██║
        ██║      ╚═════╝      ██║         ██║
        ╚═╝



     

*/

const express = require('express');
const app = express();
const authRoutes = require('./middleware/auth');
const userRoutes = require('./routes/users');

app.use(express.json());

// Utilisation des routes d'authentification et d'utilisateurs
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Configuration du port d'écoute
const PORT = process.env.PORT || 3000;

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port :  ${PORT}`);
  /**********************************************
   *                                           *
   *  © 2023 Réalisation passionnée            *
   *    Tous droits réservés.                    *
   *                                           *
   **********************************************/

});


