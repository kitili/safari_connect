const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Allow anonymous bookings
  },
  // Booking details
  name: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  idType: {
    type: String,
    enum: ['Kenyan Passport', 'Kenyan ID', 'International Passport'],
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  groupSize: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  interests: {
    type: String,
    default: '',
  },
  // Matchmaking integration
  lookingForCompanion: {
    type: Boolean,
    default: true,
  },
  travelStyle: {
    type: String,
    enum: ['budget', 'luxury', 'adventure', 'relaxation', 'cultural', 'mixed'],
    default: 'mixed',
  },
  accommodationPreference: {
    type: String,
    enum: ['hostel', 'hotel', 'camping', 'airbnb', 'any'],
    default: 'any',
  },
  // Booking status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  // Contact info
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  // Admin notes
  adminNotes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Index for matchmaking queries
tripSchema.index({ destination: 1, startDate: 1, endDate: 1, lookingForCompanion: 1 });
tripSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Trip', tripSchema);
 