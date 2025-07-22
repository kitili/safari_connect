// controllers/matchController.js
const Match = require('../models/Match');
const User = require('../models/user');

// Advanced matching algorithm
const calculateMatchScore = (currentUser, potentialMatch) => {
  let totalScore = 0;
  const weights = {
    dateOverlap: 0.35,      // 35% - Most important
    destination: 0.25,      // 25% - Very important
    interests: 0.20,        // 20% - Important
    travelStyle: 0.10,      // 10% - Nice to have
    age: 0.05,              // 5% - Minor factor
    language: 0.05          // 5% - Minor factor
  };

  // 1. Date Overlap Score (0-100)
  const dateOverlapScore = calculateDateOverlap(currentUser, potentialMatch);
  
  // 2. Destination Match Score (0-100)
  const destinationScore = calculateDestinationMatch(currentUser, potentialMatch);
  
  // 3. Interest Compatibility (0-100)
  const interestScore = calculateInterestCompatibility(currentUser, potentialMatch);
  
  // 4. Travel Style Compatibility (0-100)
  const travelStyleScore = calculateTravelStyleCompatibility(currentUser, potentialMatch);
  
  // 5. Age Compatibility (0-100)
  const ageScore = calculateAgeCompatibility(currentUser, potentialMatch);
  
  // 6. Language Compatibility (0-100)
  const languageScore = calculateLanguageCompatibility(currentUser, potentialMatch);

  // Calculate weighted total
  totalScore = Math.round(
    (dateOverlapScore * weights.dateOverlap) +
    (destinationScore * weights.destination) +
    (interestScore * weights.interests) +
    (travelStyleScore * weights.travelStyle) +
    (ageScore * weights.age) +
    (languageScore * weights.language)
  );

  return {
    totalScore,
    breakdown: {
      dateOverlapScore,
      destinationScore,
      interestScore,
      travelStyleScore,
      ageScore,
      languageScore
    }
  };
};

// Calculate date overlap between two users
const calculateDateOverlap = (user1, user2) => {
  // Check all travel plans for overlap
  let maxOverlapScore = 0;
  
  for (const plan1 of user1.travelPlans || []) {
    for (const plan2 of user2.travelPlans || []) {
      if (plan1.destination === plan2.destination) {
        const overlap = Math.min(plan1.endDate, plan2.endDate) - 
                       Math.max(plan1.startDate, plan2.startDate);
        
        if (overlap > 0) {
          const overlapDays = Math.ceil(overlap / (1000 * 60 * 60 * 24));
          const totalDays = Math.max(
            (plan1.endDate - plan1.startDate) / (1000 * 60 * 60 * 24),
            (plan2.endDate - plan2.startDate) / (1000 * 60 * 60 * 24)
          );
          
          const score = Math.round((overlapDays / totalDays) * 100);
          maxOverlapScore = Math.max(maxOverlapScore, score);
        }
      }
    }
  }
  
  return maxOverlapScore;
};

// Calculate destination compatibility
const calculateDestinationMatch = (user1, user2) => {
  const destinations1 = user1.travelPlans?.map(p => p.destination) || [];
  const destinations2 = user2.travelPlans?.map(p => p.destination) || [];
  
  const commonDestinations = destinations1.filter(d => destinations2.includes(d));
  
  if (commonDestinations.length === 0) return 0;
  
  return Math.round((commonDestinations.length / Math.max(destinations1.length, destinations2.length)) * 100);
};

// Calculate interest compatibility
const calculateInterestCompatibility = (user1, user2) => {
  const interests1 = user1.interests || [];
  const interests2 = user2.interests || [];
  
  if (interests1.length === 0 || interests2.length === 0) return 50; // Neutral score
  
  const commonInterests = interests1.filter(i => interests2.includes(i));
  return Math.round((commonInterests.length / Math.max(interests1.length, interests2.length)) * 100);
};

// Calculate travel style compatibility
const calculateTravelStyleCompatibility = (user1, user2) => {
  if (user1.travelStyle === user2.travelStyle) return 100;
  if (user1.travelStyle === 'mixed' || user2.travelStyle === 'mixed') return 75;
  
  // Check if styles are compatible
  const compatiblePairs = [
    ['budget', 'adventure'],
    ['luxury', 'relaxation'],
    ['adventure', 'cultural'],
    ['relaxation', 'cultural']
  ];
  
  const isCompatible = compatiblePairs.some(pair => 
    (pair.includes(user1.travelStyle) && pair.includes(user2.travelStyle))
  );
  
  return isCompatible ? 60 : 30;
};

// Calculate age compatibility
const calculateAgeCompatibility = (user1, user2) => {
  if (!user1.age || !user2.age) return 50;
  
  const ageDiff = Math.abs(user1.age - user2.age);
  
  if (ageDiff <= 5) return 100;
  if (ageDiff <= 10) return 80;
  if (ageDiff <= 15) return 60;
  if (ageDiff <= 20) return 40;
  return 20;
};

// Calculate language compatibility
const calculateLanguageCompatibility = (user1, user2) => {
  const languages1 = user1.languages || [];
  const languages2 = user2.languages || [];
  
  if (languages1.length === 0 || languages2.length === 0) return 50;
  
  const commonLanguages = languages1.filter(l => languages2.includes(l));
  return commonLanguages.length > 0 ? 100 : 0;
};

// Get enhanced match suggestions
exports.getMatchSuggestions = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    if (!currentUser.lookingForCompanion) {
      return res.json([]);
    }

    // Find potential matches
    const potentialMatches = await User.find({
      _id: { $ne: req.user._id },
      lookingForCompanion: true,
      relationshipStatus: 'single'
    });

    const suggestions = potentialMatches
      .map(user => {
        const matchScore = calculateMatchScore(currentUser, user);
        
        // Only include matches with meaningful overlap
        if (matchScore.breakdown.dateOverlapScore === 0) {
          return null;
        }

        return {
          _id: user._id,
          username: user.name,
          age: user.age,
          gender: user.gender,
          travelStyle: user.travelStyle,
          interests: user.interests,
          languages: user.languages,
          travelPlans: user.travelPlans,
          compatibilityScore: matchScore.totalScore,
          matchDetails: matchScore.breakdown,
          profileImage: user.profileImage
        };
      })
      .filter(s => s !== null)
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 20); // Limit to top 20 matches

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch suggestions', error: err.message });
  }
};

// Create a new match
exports.createMatch = async (req, res) => {
  const { user1, user2, destination, overlappingDates } = req.body;

  try {
    // Check if match already exists
    const exists = await Match.findOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 }
      ]
    });
    
    if (exists) {
      return res.status(409).json({ message: 'Match already exists' });
    }

    // Calculate match score
    const user1Data = await User.findById(user1);
    const user2Data = await User.findById(user2);
    const matchScore = calculateMatchScore(user1Data, user2Data);

    const match = await Match.create({
      user1,
      user2,
      destination,
      overlappingDates,
      compatibilityScore: matchScore.totalScore,
      matchDetails: matchScore.breakdown,
      status: 'pending'
    });

    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create match', error: err.message });
  }
};

// Get all matches for a user
exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }]
    }).populate('user1 user2');
    
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching matches', error: err.message });
  }
};

// Update match status
exports.updateMatch = async (req, res) => {
  try {
    const { status } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('user1 user2');
    
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
