// Load required packages
var Game = require('../models/game');

// Create endpoint /api/games for POST
exports.postGame = function(req, res) {
  // Create a new instance of the Game model
  var game = new Game();
  console.log(game.move);
  // Set the game properties that came from the POST data
  game.move = req.body.move;
  game.replayTxt = req.body.replayTxt;
  game.turnPlayer = req.body.turnPlayer;
  game.timeElapsed = req.body.timeElapsed;
  game.active = req.body.active;

  // Save the game and check for errors
  game.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Game added to server', data: game});

  });
};

// Create endpoint /api/games for GET
exports.getGame = function(req, res) {
  // Use the Game model to find all game
  Game.find(function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};

// Create endpoint /api/games/:game_id for GET
exports.getGame = function(req, res) {
  // Use the Game model to find a specific game
  Game.find({ _id: req.params.game_id }, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

// Create endpoint /api/games/:game_id for PUT
exports.putGame = function(req, res) {
  // Use the Game model to find a specific game
  Game.update({ userId: req.user._id, _id: req.params.game_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/games/:game_id for DELETE
exports.deleteGame = function(req, res) {
  // Use the Game model to find a specific game and remove it
  Game.remove({ userId: req.user._id, _id: req.params.game_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Game deleted' });
  });
};
