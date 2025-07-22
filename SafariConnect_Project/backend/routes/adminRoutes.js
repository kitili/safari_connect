const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const protect = require('../middlewares/authmiddleware');

// Admin middleware - check if user is admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

// Apply auth and admin middleware to all routes
router.use(protect, adminMiddleware);

// Dashboard routes
router.get('/dashboard', adminController.getDashboardStats);
router.get('/analytics', adminController.getSystemAnalytics);

// User management routes
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/status', adminController.updateUserStatus);
router.delete('/users/:userId', adminController.deleteUser);

// Match management routes
router.get('/matches', adminController.getAllMatches);
router.delete('/matches/:matchId', adminController.deleteMatch);

// Trip management routes
router.get('/trips', adminController.getAllTrips);

// Data export routes
router.get('/export/:type', adminController.exportData);

module.exports = router; 