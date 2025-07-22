// seedMatches.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./Config/db'); // adjust path if needed
const User = require('./models/user');
const Match = require('./models/Match');

const getRandomPair = (users) => {
  const user1 = users[Math.floor(Math.random() * users.length)];
  let user2;
  do {
    user2 = users[Math.floor(Math.random() * users.length)];
  } while (user1._id.equals(user2._id)); // ensure they're not the same
  return [user1, user2];
};

const seedMatches = async () => {
  await connectDB();

  try {
    console.log('🔁 Seeding matches...');
    await Match.deleteMany();
    console.log('🧹 Existing matches cleared');

    const users = await User.find();
    if (users.length < 2) throw new Error('Need at least 2 users to create matches.');

    const matches = [];

    for (let i = 0; i < 30; i++) {
      const [user1, user2] = getRandomPair(users);
      matches.push({
        user1: user1._id,
        user2: user2._id,
        matchScore: Math.floor(Math.random() * 100), // 0–99
        matchedAt: new Date()
      });
    }

    await Match.insertMany(matches);
    console.log('✅ 30 matches seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedMatches();
