var raspi = require('raspi-io');
var five = require('johnny-five');

var Firebase = require("firebase");

var board = new five.Board({
  io: new raspi()
});

var firebaseRef = new Firebase("https://dinosaurs.firebaseio.com/button");

board.on("ready", function () {
  var button = new five.Button("P1-16");
  var buttonLed = new five.Led("P1-18");

  button.on("up", function () {
    firebaseRef.set(false);
  });

  button.on("down", function () {
    firebaseRef.set(true);
  });

  firebaseRef.on("value", function (snapshot) {
    var buttonValue = snapshot.val();
    if (buttonValue) {
      buttonLed.on();
    } else {
      buttonLed.off();
    }
  });

});
