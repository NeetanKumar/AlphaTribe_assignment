const express = require('express');
const { createPost, getPosts, getPost, deletePost, likePost, unlikePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes
router.post('/', authMiddleware, createPost); // Create a new post
router.get('/', getPosts); // Get all posts
router.get('/:postId', getPost); // Get a post by ID
router.delete('/:postId', authMiddleware, deletePost); // Delete a post by ID
router.post('/:postId/like', authMiddleware, likePost);
router.delete('/:postId/like', authMiddleware, unlikePost);
module.exports = router;
