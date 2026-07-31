const Trip = require('../models/travlr');

/**
 * GET /api/trips
 * Return all available trips.
 */
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: 'No trips were found.'
      });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Unable to retrieve trips:', err);

    return res.status(500).json({
      message: 'Unable to retrieve trips.',
      error: err.message
    });
  }
};

/**
 * GET /api/trips/:tripCode
 * Return the trip matching the supplied trip code.
 */
const tripsFindByCode = async (req, res) => {
  const { tripCode } = req.params;

  try {
    const trips = await Trip.find({
      code: tripCode
    }).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: `Trip with code ${tripCode} was not found.`
      });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error(
      `Unable to retrieve trip ${tripCode}:`,
      err
    );

    return res.status(500).json({
      message: `Unable to retrieve trip ${tripCode}.`,
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};