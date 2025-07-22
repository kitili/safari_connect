const express = require('express');
const router = express.Router();
const { signup, login, oauth } = require('../controllers/authcontroller');
const { getAllUsers } = require('../controllers/usercontroller');

router.get('/', getAllUsers); // GET /api/users

router.post('/signup', signup);
router.post('/login', login);
router.get('/oauth', oauth); // placeholder

module.exports = router;
