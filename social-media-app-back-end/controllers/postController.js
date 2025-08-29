const Post = require('../models/Post');
const User = require('../models/User');
exports.createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const userId = req.user.userId;
        if (!content) return res.status(400).json({ error: 'Le contenu ne peut pas être vide' });
        const hashtags = content.match(/#\w+/g) || [];
        const post = new Post({
            content,
            image,
            author: userId,
            hashtags: hashtags.map(tag => tag.toLowerCase())
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post introuvable' });
        if (post.author.toString() !== userId) return res.status(403).json({ error: 'Action non autorisée' });
        await post.deleteOne();
        res.json({ message: 'Post supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post introuvable' });
        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }
        await post.save()
        res.json({
            message: alreadyLiked ? 'Like retiré' : 'Post liké', likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getAllPosts = async (_req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username avatar').sort({
            createdAt: -1
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
exports.getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ author: userId })
            .populate('author', 'username avatar')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'username avatar' }
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
exports.getFeed = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
        const posts = await Post.find({
            author: { $in: [...user.following, userId] }
        })
            .populate('author', 'username avatar')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'username avatar' }
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
exports.getTrendingTopics = async (_req, res) => {
    try {
        const posts = await Post.find({
            createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        });
        let hashtags = {};
        posts.forEach(post => {
            post.hashtags.forEach(tag => {
                hashtags[tag] = (hashtags[tag] || 0) + 1;
                Post
                hashtags
            });
        });
        const trending = Object.entries(hashtags).sort((a, b) => b[1] - a[1]).slice(0, 5);
        res.json(trending.map(t => t[0]));
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};