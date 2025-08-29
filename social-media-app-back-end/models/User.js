const mongoose =require('mongoose');
// créer un schéma pour le modèle User
// le schéma définit la structure des documents dans la collection
const UserSchema =new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    avatar:{type:String,default:''},
    bio:{type:String,default:''},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{timestamps:true});
// Exporter le modèle User
module.exports= mongoose.model('User',UserSchema);
// le modèle User est une représentation de la collection "users" dans MongoDB