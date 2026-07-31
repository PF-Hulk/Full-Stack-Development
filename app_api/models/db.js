const mongoose = require('mongoose');
const readLine = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Establish the initial MongoDB connection.
const connect = () => {
  setTimeout(async () => {
    try {
      await mongoose.connect(dbURI);
    } catch (err) {
      console.error('Initial Mongoose connection error:', err);
    }
  }, 1000);
};

// Monitor connection events.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific Ctrl+C listener.
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Close the database connection before terminating.
const gracefulShutdown = async (message) => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${message}`);
  } catch (err) {
    console.error(`Mongoose shutdown error through ${message}:`, err);
  }
};

// Shutdown invoked by a nodemon restart.
process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Shutdown invoked by Ctrl+C.
process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

// Shutdown invoked by container or operating-system termination.
process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

// Make the initial connection to MongoDB.
connect();

// Load the trip schema.
require('./travlr');

module.exports = mongoose;