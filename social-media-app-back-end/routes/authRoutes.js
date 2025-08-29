const express = require('express');
// Importer le contrôleur d'authentification
// fonction register -> pour enregistrer un nouvel utilisateur
// fonction login -> pour connecter un utilisateur existant
const { register,login }=require('../controllers/authController');
// Créer un routeur express
// Le routeur permet de définir des routes pour l'application
const router = express.Router();
// Définir les routes pour l'authentification
// POST /register -> pour enregistrer un nouvel utilisateur
// POST /login -> pour connecter un utilisateur existant
router.post('/register', register);
router.post('/login', login);  

module.exports = router;