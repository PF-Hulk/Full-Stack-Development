const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();


// Controllers
const tripsController =
  require('../controllers/trips');

const authController =
  require('../controllers/authentication');


// Middleware to authenticate JSON Web Tokens.
function authenticateJWT(req, res, next) {

  // Read the Authorization header.
  const authHeader =
    req.headers['authorization'];

  // No Authorization header was supplied.
  if (!authHeader) {
    console.log(
      'Auth Header Required but NOT PRESENT!'
    );

    return res.sendStatus(401);
  }

  // Expected format:
  // Authorization: Bearer <token>
  const parts =
    authHeader.split(' ');

  if (
    parts.length !== 2 ||
    parts[0] !== 'Bearer'
  ) {
    console.log(
      'Malformed Authorization Header'
    );

    return res.sendStatus(401);
  }

  const token =
    parts[1];

  if (!token) {
    console.log(
      'Null Bearer Token'
    );

    return res.sendStatus(401);
  }

  try {

    // Verify the JWT using the same secret
    // that was used when the token was created.
    const verified =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // Store the decoded JWT payload
    // on the request object.
    req.auth =
      verified;

    // Authentication succeeded.
    next();

  } catch (err) {

    console.log(
      'Token Validation Error!'
    );

    return res
      .status(401)
      .json({
        message:
          'Token Validation Error!'
      });
  }
}


// ----------------------------------------------------
// Public trip-reading routes
// ----------------------------------------------------

// GET all trips remains public.
//
// POST changes database data and therefore requires
// a valid JWT.
router
  .route('/trips')
  .get(
    tripsController.tripsList
  )
  .post(
    authenticateJWT,
    tripsController.tripsAddTrip
  );


// GET one trip remains public.
//
// PUT and DELETE modify database data and therefore
// require a valid JWT.
router
  .route('/trips/:tripCode')
  .get(
    tripsController.tripsFindByCode
  )
  .put(
    authenticateJWT,
    tripsController.tripsUpdateTrip
  )
  .delete(
    authenticateJWT,
    tripsController.tripsDeleteTrip
  );


// ----------------------------------------------------
// Authentication routes
// ----------------------------------------------------

// Register a user.
router
  .route('/register')
  .post(
    authController.register
  );


// Log in an existing user.
router
  .route('/login')
  .post(
    authController.login
  );


module.exports = router;