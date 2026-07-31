const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Return all trips.
router
  .route('/trips')
  .get(tripsController.tripsList);

// Return one trip selected by its code.
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode);

module.exports = router;
