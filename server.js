// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var gameController = require('./controllers/game');
var passport = require('passport');
var authController = require('./controllers/auth');
require('./config/passport')(passport);



// Connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/battleshipserver');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));


// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /exp
router.route('/games')
  .post(passport.authenticate('jwt', { session: false }), gameController.postGame)
  .get(passport.authenticate('jwt', { session: false }), gameController.getGame);

// Create endpoint handlers for /exp/:exp_id
router.route('/games/:game_id')
  .get(passport.authenticate('jwt', { session: false }), gameController.getGame)
  .put(passport.authenticate('jwt', { session: false }), gameController.putGame)
  .delete(passport.authenticate('jwt', { session: false }), gameController.deleteGame);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(passport.authenticate('jwt', { session: false }), userController.getUsers);

router.route('/users/:user_id')
  .get(passport.authenticate('jwt', { session: false }), userController.getUser)
  .put(passport.authenticate('jwt', { session: false }), userController.putUser);



router.route('/authenticate')
  .post(userController.authenticate);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
