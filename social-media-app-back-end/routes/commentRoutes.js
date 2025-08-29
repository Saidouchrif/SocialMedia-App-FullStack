const express = require('express'); 
const { authenticate } = require('../middleware/authMiddleware'); 
const { addComment, deleteComment } = require('../controllers/commentController'); 
const router = express.Router(); 
router.post('/:postId', authenticate, addComment); 
router.delete('/:commentId', authenticate, deleteComment); 
module.exports = router; 