# 🚀 Social Media Backend API — Express.js

> Backend RESTful API pour une application de réseau social, conçu avec Express.js, MongoDB, JWT et une architecture MVC modulaire. Idéal pour les projets full-stack modernes.

![Node.js](https://img.shields.io/badge/Node.js-18+-438536?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 👤 Développeur

**Said Ouchrif**  
📧 [saidouchrif16@gmail.com](mailto:saidouchrif16@gmail.com)

---

## 🧩 Architecture du Projet (Backend Express.js)

Le backend suit une **architecture MVC modulaire** avec séparation claire des responsabilités :

### 📁 Structure détaillée :

#### ✅ `controllers/`
- Gère la logique métier pour chaque ressource.
- Exemples :
  - `authController.js`: inscription, connexion, déconnexion
  - `postController.js`: création, lecture, mise à jour, suppression de posts
  - `commentController.js`: gestion des commentaires
  - `userController.js`: profil utilisateur, recherche, etc.

#### ✅ `middleware/`
- `authMiddleware.js`: vérification du token JWT pour sécuriser les routes protégées.
- Autres middlewares possibles : upload de fichiers, validation des données, logs, etc.

#### ✅ `models/`
- Schémas Mongoose pour la base de données MongoDB.
  - `User.js`: modèle utilisateur avec email, mot de passe, nom, avatar, etc.
  - `Post.js`: modèle publication avec contenu, image, likes, auteur, date.
  - `Comment.js`: modèle commentaire lié à un post et un utilisateur.

#### ✅ `routes/`
- Regroupement des routes par fonctionnalité.
  - `authRoutes.js`: `/api/auth/register`, `/api/auth/login`
  - `postRoutes.js`: `/api/posts`, `/api/posts/:id`
  - `commentRoutes.js`: `/api/posts/:postId/comments`
  - `userRoutes.js`: `/api/users/:id`, `/api/users/search?q=...`
  - `searchRoutes.js`: recherche globale (posts, utilisateurs)

#### ✅ `.env`
- Contient les variables sensibles :
  ```env
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/socialmedia
  JWT_SECRET=your_jwt_secret_key_here

  
---

✅ **Instructions :**
1. Créez un fichier `README.md` à la racine de votre projet.
2. Copiez-collez **tout le texte ci-dessus** dedans.
3. Pensez à remplacer `https://github.com/votre-pseudo/social-media-api-express.git` par l’URL réelle de votre repo.
4. (Optionnel) Ajoutez un fichier `LICENSE` si vous souhaitez distribuer sous licence MIT.

Votre repo aura l’air **ultra-pro** et bien structuré ! 🎯
