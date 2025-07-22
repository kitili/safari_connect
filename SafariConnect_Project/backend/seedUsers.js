// seedUsers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

dotenv.config();

const connectDB = require('./Config/db'); // Adjust path if needed
const User = require('./models/user'); // Adjust path if needed

const interestsList = [
  'wildlife', 'culture', 'beaches', 'hiking', 'photography',
  'food', 'music', 'safari', 'road trips', 'nature'
];

const createRandomUser = async () => {
  const rawPassword = faker.internet.password({ length: 10 });
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const email = faker.internet.email();
  const name = faker.person.fullName();

  console.log(`📩 Email: ${email} | 🔑 Password: ${rawPassword}`);

  return {
    name,
    email,
    password: hashedPassword,
    interests: faker.helpers.arrayElements(interestsList, faker.number.int({ min: 2, max: 4 })),
    rating: faker.number.float({ min: 3, max: 5, precision: 0.1 })
  };
};

const seedUsers = async () => {
  await connectDB();

  try {
    console.log('🔁 Seeding users...');
    await User.deleteMany();
    console.log('🧹 Existing users deleted');

    const users = [];

    for (let i = 0; i < 50; i++) {
      const user = await createRandomUser();
      users.push(user);
    }

    await User.insertMany(users);
    console.log('✅ Successfully seeded 50 users!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedUsers();
