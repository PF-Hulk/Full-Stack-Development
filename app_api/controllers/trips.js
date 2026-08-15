const Trip = require('../models/travlr');

const tripPayload = (body) => ({
  code: body.code,
  name: body.name,
  length: body.length,
  start: body.start,
  resort: body.resort,
  perPerson: body.perPerson,
  image: body.image,
  description: body.description
});

/**
 * GET /api/trips
 */
const tripsList = async (req, res) => {

  try {

    const trips =
      await Trip.find({}).exec();

    if (
      !trips ||
      trips.length === 0
    ) {

      return res
        .status(404)
        .json({
          message:
            'No trips were found.'
        });
    }

    return res
      .status(200)
      .json(trips);

  } catch (err) {

    console.error(
      'Unable to retrieve trips:',
      err
    );

    return res
      .status(500)
      .json({
        message:
          'Unable to retrieve trips.',
        error: err.message
      });
  }
};

/**
 * GET /api/trips/:tripCode
 */
const tripsFindByCode =
  async (req, res) => {

    const { tripCode } =
      req.params;

    try {

      const trips =
        await Trip.find({
          code: tripCode
        }).exec();

      if (
        !trips ||
        trips.length === 0
      ) {

        return res
          .status(404)
          .json({
            message:
              `Trip with code ${tripCode} was not found.`
          });
      }

      return res
        .status(200)
        .json(trips);

    } catch (err) {

      console.error(
        `Unable to retrieve trip ${tripCode}:`,
        err
      );

      return res
        .status(500)
        .json({
          message:
            `Unable to retrieve trip ${tripCode}.`,
          error: err.message
        });
    }
  };

/**
 * POST /api/trips
 */
const tripsAddTrip =
  async (req, res) => {

    try {

      const trip =
        await Trip.create(
          tripPayload(req.body)
        );

      return res
        .status(201)
        .json(trip);

    } catch (err) {

      console.error(
        'Unable to add trip:',
        err
      );

      return res
        .status(400)
        .json({
          message:
            'Unable to add trip.',
          error: err.message
        });
    }
  };

/**
 * PUT /api/trips/:tripCode
 */
const tripsUpdateTrip =
  async (req, res) => {

    const { tripCode } =
      req.params;

    try {

      const trip =
        await Trip
          .findOneAndUpdate(
            {
              code: tripCode
            },
            tripPayload(req.body),
            {
              new: true,
              runValidators: true
            }
          )
          .exec();

      if (!trip) {

        return res
          .status(404)
          .json({
            message:
              `Trip with code ${tripCode} was not found.`
          });
      }

      return res
        .status(201)
        .json(trip);

    } catch (err) {

      console.error(
        `Unable to update trip ${tripCode}:`,
        err
      );

      return res
        .status(400)
        .json({
          message:
            `Unable to update trip ${tripCode}.`,
          error: err.message
        });
    }
  };

/**
 * DELETE /api/trips/:tripCode
 */
const tripsDeleteTrip =
  async (req, res) => {

    const { tripCode } =
      req.params;

    try {

      const trip =
        await Trip
          .findOneAndDelete({
            code: tripCode
          })
          .exec();

      if (!trip) {

        return res
          .status(404)
          .json({
            message:
              `Trip with code ${tripCode} was not found.`
          });
      }

      return res
        .status(200)
        .json(trip);

    } catch (err) {

      console.error(
        `Unable to delete trip ${tripCode}:`,
        err
      );

      return res
        .status(500)
        .json({
          message:
            `Unable to delete trip ${tripCode}.`,
          error: err.message
        });
    }
  };

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};