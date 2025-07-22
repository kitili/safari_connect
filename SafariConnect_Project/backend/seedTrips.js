// seedTrips.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');

dotenv.config();

const connectDB = require('./Config/db'); // make sure this exists
const User = require('./models/user');
const Trip = require('./models/Trip');

const destinations = ['Maasai Mara', 'Diani', 'Nairobi', 'Naivasha', 'Mt. Kenya', 'Amboseli', 'Lamu', 'Kisumu'];
const activitiesList = [
  'safari', 'beach walk', 'photography', 'culture tour',
  'hiking', 'boat ride', 'local cuisine', 'wildlife watching'
];

const createFakeTrip = (userId) => {
  const start = faker.date.future();
  const end = faker.date.soon({ days: 5, refDate: start });

  return {
    user: userId,
    name: faker.person.fullName(),
    idNumber: faker.string.numeric(8),
    idType: faker.helpers.arrayElement(['Kenyan Passport', 'Kenyan ID', 'International Passport']),
    destination: faker.helpers.arrayElement(destinations),
    startDate: start,
    endDate: end,
    groupSize: faker.number.int({ min: 1, max: 10 }),
    interests: faker.helpers.arrayElements(activitiesList, faker.number.int({ min: 2, max: 5 })).join(', '),
    lookingForCompanion: faker.datatype.boolean(),
    travelStyle: faker.helpers.arrayElement(['budget', 'luxury', 'adventure', 'relaxation', 'cultural', 'mixed']),
    accommodationPreference: faker.helpers.arrayElement(['hostel', 'hotel', 'camping', 'airbnb', 'any']),
    email: faker.internet.email(),
    phone: faker.phone.number()
  };
};

const seedTrips = async () => {
  await connectDB();

  try {
    console.log('🔁 Seeding trips...');
    await Trip.deleteMany();
    console.log('🧹 Cleared previous trips');

    const users = await User.find();
    if (users.length === 0) throw new Error('❌ No users found. Seed users first.');

    const trips = [];

    for (let i = 0; i < 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      trips.push(createFakeTrip(randomUser._id));
    }

    await Trip.insertMany(trips);
    console.log('✅ 50 trips seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Trip seeding error:', err.message);
    process.exit(1);
  }
};

seedTrips();
