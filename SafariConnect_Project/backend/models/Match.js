const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    destination: String,
    date: Date,
    compatibilityScore: Number,
    // Enhanced matching details
    matchDetails: {
        dateOverlapScore: Number,
        destinationMatchScore: Number,
        interestCompatibilityScore: Number,
        travelStyleCompatibilityScore: Number,
        ageCompatibilityScore: Number,
        languageCompatibilityScore: Number
    },
    overlappingDates: {
        startDate: Date,
        endDate: Date,
        overlapDays: Number
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'expired'],
        default: 'pending'
    },
    sharedActivities: [String],
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);