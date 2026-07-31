const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

// Locate and read the trip seed data.
const tripsFile = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'trips.json'
);

const trips = JSON.parse(
  fs.readFileSync(tripsFile, 'utf8')
);

// Remove existing records and insert the seed data.
const seedDatabase = async () => {
  try {
    await Trip.deleteMany({});

    const insertedTrips = await Trip.insertMany(trips);

    console.log(`Seeded ${insertedTrips.length} trips.`);
    process.exitCode = 0;
  } catch (err) {
    console.error('Database seed failed:', err);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error(
        'Unable to close the MongoDB connection:',
        closeError
      );
      process.exitCode = 1;
    }

    // db.js creates a Windows readline listener, so end the
    // standalone seed process after database cleanup finishes.
    process.exit(process.exitCode);
  }
};

seedDatabase();