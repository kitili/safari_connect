const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authmiddleware');
const {
  getOrCreateChat,
  getUserChats,
  sendMessage,
  markAsRead,
  getChatStats
} = require('../controllers/chatcontroller');

// Get all chats for the authenticated user
router.get('/', protect, getUserChats);

// Get or create chat for a specific match
router.get('/match/:matchId', protect, getOrCreateChat);

// Send a message (REST API fallback)
router.post('/send', protect, sendMessage);

// Mark messages as read
router.put('/:matchId/read', protect, markAsRead);

// Get chat statistics
router.get('/stats', protect, getChatStats);

module.exports = router;
