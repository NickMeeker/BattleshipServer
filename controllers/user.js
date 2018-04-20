// Load required packages
var User = require('../models/user');
var config = require('../config/database');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
// require('../config/passport')(passport);

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.status(201);
    res.json({ message: 'New user registered.', data : user });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/users/:user_id for USER
exports.getUser = function(req, res) {
  // Use the Game model to find a specific game
  User.find({ _id: req.params.user_id }, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// Create endpoint /api/users/:user_id for USER
exports.getUserByName = function(req, res) {
  // Use the Game model to find a specific game
  User.find({username: req.params.username}, function(err, user) {
    if (err)
      res.send(err);

    res.status(201);
    res.json(user);
  });
};

// Create endpoint /api/users/:user_id for PUT
exports.putUser = function(req, res) {
  // Use the User model to find a specific user
  User.update({_id: req.params.user_id }, {
    exp: req.body.exp,
    wins: req.body.exp,
    losses: req.body.exp,
    coins: req.body.exp,
    powerUp1: req.body.powerUp1,
    powerUp2: req.body.powerUp2,
    powerUp3: req.body.powerUp3,
    friends: req.body.friends
  }, function(err, num, raw) {
    if (err)
      res.send(err);


    res.json({ message: num + ' updated' });
  });
};



exports.authenticate = function (req, res) {
  // Find user from given username
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err)
      return res.status(501).send(
        { success: false, msg: 'Failed to authenticate.' }
      );

    // Username does not exist
    // Fail to specify username was incorrect for security purposes
    if (!user) {
      res.status(404).send(
        { success: false, msg: 'Invalid username or password.' }
      );
    } else {
      // Check password against stored password
      user.verifyPassword(req.body.password, function (err, match) {
        // Password matches and no errors
        if (match && !err) {
          var token = jwt.sign({ data: user }, config.secret);

          console.log('[INFO] Authenticated User:', user.username, '(' + user._id + ')');

          // Output token information
          res.status(201).send(
            { success: true, id: user._id, token: 'Bearer ' + token }
          );
        } else {
          // Incorrect password
          // Fail to specify password was incorrect for security purposes
          res.status(404).send(
            { success: false, msg: 'Invalid username or password.' }
          );
        }
      });
    }
  });
};
