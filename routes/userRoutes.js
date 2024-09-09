const express = require('express');
const { getUserProfile, updateUserprofile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile/:userId', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserprofile);

module.exports = router;