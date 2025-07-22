const Trip = require('../models/Trip');

// @desc    Create a new trip booking
// @route   POST /api/trips
// @access  Public or Protected (you can add auth later)
exports.createTrip = async (req, res) => {
  try {
    const { 
      name, 
      idNumber, 
      idType, 
      destination, 
      startDate, 
      endDate, 
      groupSize, 
      interests,
      email,
      phone,
      lookingForCompanion = true,
      travelStyle = 'mixed',
      accommodationPreference = 'any',
      autoMatchmaking = true
    } = req.body;

    // Validate required fields
    if (!name || !idNumber || !idType || !destination || !startDate || !endDate || !groupSize) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, idNumber, idType, destination, startDate, endDate, groupSize' 
      });
    }

    // Validate ID type
    const validIdTypes = ['Kenyan Passport', 'Kenyan ID', 'International Passport'];
    if (!validIdTypes.includes(idType)) {
      return res.status(400).json({ 
        message: 'Invalid ID type. Must be one of: Kenyan Passport, Kenyan ID, International Passport' 
      });
    }

    // Validate group size
    if (groupSize < 1 || groupSize > 50) {
      return res.status(400).json({ 
        message: 'Group size must be between 1 and 50' 
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    if (start < now) {
      return res.status(400).json({ 
        message: 'Start date cannot be in the past' 
      });
    }
    
    if (end < start) {
      return res.status(400).json({ 
        message: 'End date cannot be before start date' 
      });
    }

    // Check for duplicate bookings (same person, same destination, overlapping dates)
    const existingBooking = await Trip.findOne({
      idNumber,
      destination,
      $or: [
        // Overlapping date ranges
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ],
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(409).json({ 
        message: 'You already have a booking for this destination with overlapping dates' 
      });
    }

    // Create trip
    const newTrip = await Trip.create({
      name,
      idNumber,
      idType,
      destination,
      startDate: start,
      endDate: end,
      groupSize,
      interests,
      email,
      phone,
      lookingForCompanion,
      travelStyle,
      accommodationPreference,
      status: 'pending'
    });

    // If auto-matchmaking is enabled, we could trigger matchmaking logic here
    if (autoMatchmaking && lookingForCompanion) {
      // This would typically trigger a background job or notification
      console.log(`Auto-matchmaking enabled for trip: ${newTrip._id}`);
    }

    res.status(201).json({
      message: 'Trip booking created successfully',
      trip: newTrip,
      calendarUrl: generateCalendarUrl(newTrip),
      matchmakingEnabled: autoMatchmaking && lookingForCompanion
    });
  } catch (err) {
    console.error('Trip creation error:', err);
    res.status(500).json({ message: 'Failed to create trip booking.' });
  }
};

// Generate Google Calendar URL for the trip
const generateCalendarUrl = (trip) => {
  const event = {
    summary: `Safari Trip: ${trip.destination}`,
    description: `Safari adventure to ${trip.destination}\nGroup Size: ${trip.groupSize}\nInterests: ${trip.interests || 'Not specified'}\nBooked via SafariConnect`,
    start: trip.startDate.toISOString().split('T')[0],
    end: trip.endDate.toISOString().split('T')[0],
    location: trip.destination
  };

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;
};

// @desc    Get all booked trips
// @route   GET /api/trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ startDate: 1 });
    res.status(200).json(trips);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch trips.' });
  }
};

// @desc    Get trips for matchmaking (trips looking for companions)
// @route   GET /api/trips/matchmaking
exports.getTripsForMatchmaking = async (req, res) => {
  try {
    const { destination, startDate, endDate } = req.query;
    
    let query = { 
      lookingForCompanion: true,
      status: { $in: ['pending', 'confirmed'] }
    };

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    if (startDate && endDate) {
      query.$or = [
        // Trips that start during the requested period
        { startDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        // Trips that end during the requested period
        { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        // Trips that span the requested period
        { 
          startDate: { $lte: new Date(startDate) },
          endDate: { $gte: new Date(endDate) }
        }
      ];
    }

    const trips = await Trip.find(query)
      .sort({ startDate: 1 })
      .limit(50);

    res.status(200).json(trips);
  } catch (err) {
    console.error('Matchmaking trips fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch trips for matchmaking.' });
  }
};

// @desc    Get user's upcoming trips
// @route   GET /api/trips/upcoming
exports.getUpcomingTrips = async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const upcomingTrips = await Trip.find({
      startDate: { $gte: now, $lte: thirtyDaysFromNow },
      status: { $in: ['pending', 'confirmed'] }
    }).sort({ startDate: 1 });

    res.status(200).json(upcomingTrips);
  } catch (err) {
    console.error('Upcoming trips fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch upcoming trips.' });
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trips/:id
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found.' });
    res.status(200).json(trip);
  } catch (err) {
    console.error('Fetch by ID error:', err);
    res.status(500).json({ message: 'Failed to fetch trip.' });
  }
};

// @desc    Update trip status
// @route   PUT /api/trips/:id/status
exports.updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: pending, confirmed, cancelled, completed' 
      });
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    
    if (!trip) return res.status(404).json({ message: 'Trip not found.' });
    res.status(200).json(trip);
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ message: 'Failed to update trip status.' });
  }
};

// @desc    Delete a trip by ID
// @route   DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Trip not found.' });
    res.status(200).json({ message: 'Trip deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete trip.' });
  }
};
