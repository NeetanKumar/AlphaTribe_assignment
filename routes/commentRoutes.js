const express = require('express');
const { addComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:postId/comments', authMiddleware, addComment);
router.delete('/:postId/comments/:commentId', authMiddleware, deleteComment);


module.exports = router;
