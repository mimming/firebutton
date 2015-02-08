var five = require("raspi-io");
var Firebase = require("firebase");

var board = new five.Board();
var firebaseRef = new Firebase("https://dinosaurs.firebaseio.com/button");

board.on("ready", function () {
  var button = new five.Button(16);
  var buttonLed = new five.Led(18);

  // Export them to the board. Whee!
  this.repl.inject({
    buttonLed: buttonLed,
    button: button
  });


  button.on("up", function() {
    firebaseRef.set(false);
  });

  button.on("down", function() {
    firebaseRef.set(true);
  });
  
  firebaseRef.on("value", function(snapshot) {
    var buttonValue = snapshot.val();
    if(buttonValue) {
      buttonLed.on();
    } else {
      buttonLed.off();
    }
  });
  
});