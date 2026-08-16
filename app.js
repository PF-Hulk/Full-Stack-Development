require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');


// Initialize the MongoDB connection and Mongoose models.
require('./app_api/models/db');

// Initialize the Passport authentication configuration.
require('./app_api/config/passport');


// Load application routes.
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');


var app = express();


// View engine setup.
app.set(
  'views',
  path.join(__dirname, 'app_server', 'views')
);

app.set(
  'view engine',
  'hbs'
);

hbs.registerPartials(
  path.join(
    __dirname,
    'app_server',
    'views',
    'partials'
  )
);


// Standard Express middleware.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  express.static(
    path.join(__dirname, 'public')
  )
);


// Initialize Passport.
app.use(passport.initialize());


// Configure CORS for the Angular administrator SPA.
app.use('/api', function(req, res, next) {

  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:4200'
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  // Respond successfully to browser CORS preflight requests.
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


// Application routes.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);


// Catch authentication errors and return HTTP 401.
app.use(function(err, req, res, next) {

  if (err.name === 'UnauthorizedError') {
    return res
      .status(401)
      .json({
        message:
          err.name + ': ' + err.message
      });
  }

  // Pass other errors to the normal Express error handler.
  next(err);
});


// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(
    createError(404)
  );
});


// General Express error handler.
app.use(function(err, req, res, next) {

  // Set locals, only providing error information
  // while running in development mode.
  res.locals.message =
    err.message;

  res.locals.error =
    req.app.get('env') === 'development'
      ? err
      : {};

  // Render the error page.
  res.status(
    err.status || 500
  );

  res.render(
    'error'
  );
});


module.exports = app;