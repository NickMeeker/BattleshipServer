// Load required packages
var mongoose = require('mongoose');

// Define our game schema
var GameSchema = new mongoose.Schema({
  move: String,
  replayTxt: String,
  turnPlayer: String,
  timeElapsed: Number,
  active: Boolean
});

// Export the Mongoose model
module.exports = mongoose.model('Game', GameSchema);
