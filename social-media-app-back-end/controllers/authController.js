const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
// Fonction pour enregistrer un nouvel utilisateur
exports.register = async (req, res) => {
    try{
        const {username,email,password} = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Utilisateur déjà existant'});
        }else{
            /// Hacher le mot de passe
            const hashedPasssword = await bcrypt.hash(password, 10);
            // Créer un nouvel utilisateur
            const newUser = new User({username,email,password:hashedPasssword});
            // Enregistrer l'utilisateur dans la base de données
            await newUser.save();
            res.status(201).json({message:'Utilisateur enregistré avec succès'});
        }
    }catch(err){
        return res.status(500).json({message:'Erreur lors de l\'enregistrement de l\'utilisateur',error: err.message});
    }
}
// Fonction pour connecter un utilisateur existant
exports.login = async (req, res) => {
    try{
        const {email,password}= req.body;
        // Vérifier si l'utilisateur existe
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Utilisateur non trouvé'});
        }else{
            // Verifier le mot de passe
            const iPasswordValid= await bcrypt.compare(password,user.password);
            if(!iPasswordValid){
                return res.status(400).json({message:'Mot de passe incorrect'});
            }else{
                // créer un token JWT
                const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1h'});
                // retourner le token et les informations de l'utilisateur
                res.json({token,user:{
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                }});
            }
        }
    }catch(err){
        return res.status(500).json({message:'Erreur lors de la connexion de l\'utilisateur',error: err.message});
    }
}
