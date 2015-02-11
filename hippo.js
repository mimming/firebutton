var five = require('johnny-five');
var Firebase = require("firebase");

var board = new five.Board();

var firebaseRef = new Firebase("https://firebutton.firebaseio-demo.com/button");

board.on("ready", function () {
  var servo = new five.Servo(10);
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
      console.log("sweeping servo");
      servo.to(180);
      setTimeout(function() {
        servo.to(0);
      }, 1000);
    } 
  });
});
