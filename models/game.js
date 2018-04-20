// Load required packages
var mongoose = require('mongoose');

// Define our game schema
var GameSchema = new mongoose.Schema({
  move: String,
  setupLog: String,
  gameLog: String,
  turnPlayer: String,
  hostPlayer: String,
  guestPlayer: String,
  timeElapsed: Number,
  active: Boolean

});

// Export the Mongoose model
module.exports = mongoose.model('Game', GameSchema);
