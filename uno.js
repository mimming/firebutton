var five = require('johnny-five');
var Firebase = require("firebase");

var board = new five.Board();

var firebaseRef = new Firebase("https://dinosaurs.firebaseio.com/button");

board.on("ready", function () {
  var button = new five.Button(13);
  var buttonLed = new five.Led(8);
  
  button.on("up", function () {
    firebaseRef.set(false);
  });

  button.on("down", function () {
    firebaseRef.set(true);
  });

  firebaseRef.on("value", function (snapshot) {
    var buttonValue = snapshot.val();
    if (buttonValue) {
      console.log("turning on");
      buttonLed.on();
      setTimeout(function() {
        buttonLed.off();
      }, 2500);
    } 
  });
});
