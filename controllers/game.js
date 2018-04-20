// Load required packages
var Game = require('../models/game');

// Create endpoint /api/games for POST
exports.postGame = function(req, res) {
  // Create a new instance of the Game model
  var game = new Game();

  // Set the game properties that came from the POST data
  game.move = req.body.move,
  game.gameLog = req.body.gameLog,
  game.setupLog = req.body.setupLog,
  game.turnPlayer = req.body.turnPlayer,
  game.timeElapsed = req.body.timeElapsed,
  game.active = req.body.active,
  game.hostPlayer = req.body.hostPlayer,
  game.guestPlayer = req.body.guestPlayer



  // Save the game and check for errors
  game.save(function(err) {
    if (err)
      res.send(err);


    res.json({message: 'Game added to server', data: game});

  });
};

// Create endpoint /api/games for GET
exports.getGames = function(req, res) {
  // Use the Game model to find all game
  Game.find(function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};

// Create endpoint /api/games/:game_id for GET
exports.getGameByHost = function(req, res) {
  // Use the Game model to find a specific game
  Game.find({hostPlayer: req.params.hostPlayer}, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

// Create endpoint /api/games/hostPlayer for GET
exports.getGameByGuest = function(req, res) {
  // Use the Game model to find a specific game
  Game.find({guestPlayer: req.params.guestPlayer }, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

// Create endpoint /api/games/:_id for GET
exports.getGame = function(req, res) {
  // Use the Game model to find all game
  Game.find({_id: req.params.game_id}, function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};

// Create endpoint /api/games/:game_id for PUT
exports.putGame = function(req, res) {
  // Use the Game model to find a specific game
  Game.update({_id: req.params.game_id }, {
    move: req.body.move,
    setupLog: req.body.setupLog,
    gameLog: req.body.gameLog,
    turnPlayer: req.body.turnPlayer,
    hostPlayer: req.body.hostPlayer,
    guestPlayer: req.body.guestPlayer,
    timeElapsed: req.body.timeElapsed,
    active: req.body.active
  }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: 'game updated'});
  });
};

// Create endpoint /api/games/:game_id for DELETE
exports.deleteGame = function(req, res) {
  // Use the Game model to find a specific game and remove it
  Game.remove({_id: req.params.game_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Game deleted' });
  });
};
