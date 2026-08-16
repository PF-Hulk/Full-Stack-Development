const passport = require('passport');
const User = require('../models/user');


// Register a new user.
const register = async (req, res) => {

  // Validate that all required fields were supplied.
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({
        message: 'All fields required'
      });
  }

  try {

    // Create a new user record.
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    // Generate and store the password salt and hash.
    user.setPassword(req.body.password);

    // Save the new user to MongoDB.
    await user.save();

    // Generate a JSON Web Token for the new user.
    const token = user.generateJWT();

    return res
      .status(200)
      .json({
        token
      });

  } catch (err) {

    return res
      .status(400)
      .json({
        message: 'Unable to register user.',
        error: err.message
      });

  }
};


// Log in an existing user.
const login = (req, res) => {

  // Validate that email and password were supplied.
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({
        message: 'All fields required'
      });
  }

  // Authenticate the user using the Passport local strategy.
  passport.authenticate(
    'local',
    (err, user, info) => {

      // Handle an authentication error.
      if (err) {
        return res
          .status(404)
          .json(err);
      }

      // Authentication succeeded.
      if (user) {

        // Generate a JSON Web Token.
        const token =
          user.generateJWT();

        return res
          .status(200)
          .json({
            token
          });
      }

      // Authentication failed.
      return res
        .status(401)
        .json(info);
    }
  )(req, res);
};


module.exports = {
  register,
  login
};