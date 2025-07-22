const express = require('express');
const router = express.Router();
const { signup, login, oauth } = require('../controllers/authcontroller');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// OAuth placeholder
router.get('/oauth', oauth);

module.exports = router;