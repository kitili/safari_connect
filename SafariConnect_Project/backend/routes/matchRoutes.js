// routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const matchController = require('../controllers/matchController');

// Create a new match
router.post('/', auth, matchController.createMatch);

// Get all matches
router.get('/', auth, matchController.getMatches);

// Get compatibility-based match suggestions
router.get('/suggestions', auth, matchController.getMatchSuggestions);

// Update match details
router.put('/:id', auth, matchController.updateMatch);

// Delete a match
router.delete('/:id', auth, matchController.deleteMatch);

module.exports = router;
