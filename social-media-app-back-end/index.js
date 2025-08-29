// pour chager les variables d'environnement -> 
require('dotenv').config();
// Importer express
const express = require('express');
// importer meddileware cors -> pour gérer les requêtes cross-origin
const cors = require('cors');
// importer helmet -> pour sécuriser les en-têtes HTTP
const helmet = require('helmet');
// importer morgan -> pour logger les requêtes HTTP
const morgan = require('morgan');
// importer mongoose -> pour interagir avec MongoDB
const mongoose = require('mongoose');
const app = express();
// le port sur lequel le serveur va écouter les requêtes
const PORT = process.env.PORT || 5000;
// la connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDB connecté'))
    .catch(err => console.error(' Erreur de connexion à MongoDB:', err));
// limiter la taille des requêtes entrantes à 500 Mo
// pour éviter les attaques par déni de service (DoS)
app.use(express.json({ limit: '500mb' })); 
// pour parser les données de formulaire
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API du réseau social !');
});
// importer les routes d'authentification
const authRoutes= require('./routes/authRoutes');
// importer les routes de publication
const postRoutes = require('./routes/postRoutes');
// importer les routes de commentaire
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes'); 
// importer les routes de recherche
const searchRoutes = require("./routes/searchRoutes");
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use("/api/search", searchRoutes)
app.listen(PORT, () => console.log(` Serveur démarré sur le port ${PORT}`));