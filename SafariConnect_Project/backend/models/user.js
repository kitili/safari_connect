const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interests: [String],
    rating: { type: Number, default: 0 },
    profileImage: { type: String, default: '' },
    destination: { type: String },
    travelStartDate: { type: Date },
    travelEndDate: { type: Date },
    // New fields for enhanced matchmaking
    relationshipStatus: { 
      type: String, 
      enum: ['single', 'married', 'complicated', 'prefer-not-to-say'],
      default: 'single'
    },
    lookingForCompanion: { type: Boolean, default: true },
    travelStyle: {
      type: String,
      enum: ['budget', 'luxury', 'adventure', 'relaxation', 'cultural', 'mixed'],
      default: 'mixed'
    },
    accommodationPreference: {
      type: String,
      enum: ['hostel', 'hotel', 'camping', 'airbnb', 'any'],
      default: 'any'
    },
    travelPlans: [{
      destination: String,
      startDate: Date,
      endDate: Date,
      activities: [String],
      budget: Number,
      accommodationType: String
    }],
    preferredAgeRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 65 }
    },
    age: { type: Number },
    gender: { 
      type: String, 
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
      default: 'prefer-not-to-say'
    },
    preferredGender: {
      type: String,
      enum: ['male', 'female', 'any'],
      default: 'any'
    },
    languages: [String],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ location: '2dsphere' });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual('isComplete').get(function () {
  return Boolean(
    this.name &&
    this.email &&
    this.destination &&
    this.travelStartDate &&
    this.travelEndDate
  );
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
