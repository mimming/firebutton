var raspi = require('raspi-io');
var five = require('johnny-five');

var Firebase = require("firebase");

var board = new raspi();

var firebaseRef = new Firebase("https://dinosaurs.firebaseio.com/button");

board.on("ready", function () {
  board.pinMode(5, board.MODES.OUTPUT);

  board.pins[board.normalize(5)].value = board.HIGH;

  console.log(board.pins[board.normalize(5)].value); 

});
