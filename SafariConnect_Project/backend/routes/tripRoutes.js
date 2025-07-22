const express = require('express');
const router = express.Router();

const {
  createTrip,
  getAllTrips,
  getTripById,
  deleteTrip,
  getTripsForMatchmaking,
  updateTripStatus,
  getUpcomingTrips,
} = require('../controllers/tripController');

// @route   POST /api/trips
// @desc    Create a new trip booking
router.post('/', createTrip);

// @route   GET /api/trips
// @desc    Get all trip bookings
router.get('/', getAllTrips);

// @route   GET /api/trips/matchmaking
// @desc    Get trips for matchmaking (trips looking for companions)
router.get('/matchmaking', getTripsForMatchmaking);

// @route   GET /api/trips/upcoming
// @desc    Get user's upcoming trips
router.get('/upcoming', getUpcomingTrips);

// @route   GET /api/trips/:id
// @desc    Get a single trip by ID
router.get('/:id', getTripById);

// @route   PUT /api/trips/:id/status
// @desc    Update trip status
router.put('/:id/status', updateTripStatus);

// @route   DELETE /api/trips/:id
// @desc    Delete a trip by ID
router.delete('/:id', deleteTrip);

module.exports = router;
