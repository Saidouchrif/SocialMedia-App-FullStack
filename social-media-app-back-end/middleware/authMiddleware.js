const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
// Middleware d'authentification
// Vérifie si le token JWT est valide
exports.authenticate = (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header('Authorization')?.split(' ')[1];
    // Vérifier si le token est présent
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }else{
        try{
            // Verifier le token
            const decoded = jwt.verify(token,JWT_SECRET);
            // Ajouter l'utilisateur décodé à la requête
            req.user = decoded;
            // Passer au middleware suivant
            next();
        }catch(err){
            return res.status(401).json({message:'Token invalide'});
        }
    }
}