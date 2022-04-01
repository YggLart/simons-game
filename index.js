var buttonColours = ["red", "blue", "green", "yellow"]; // Genius colors
var gamePattern = ['']; // Random Game Pattern
var userClickedPattern = ['']; // User Clicked Pattern
var started = false
var level = 0;

// Random Game Pattern Generator
function nextSequence() {

  // Empty User Clicked Pattern for next level
  userClickedPattern = [''];

  // Level Change
  level++
  $("#level-title").text("Level " + level)

  // Generate random number
  var randomNumber = Math.floor((Math.random() * 4));
  // Number gets associated with color
  var randomChosenColour = buttonColours[randomNumber];
  // Color get pushed into Game Pattern
  gamePattern.push(randomChosenColour);
  // Button Flash (Animation)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // Sound Effect
  playSound(randomChosenColour);



}
// Check Answer
function checkAnswer(currentLevel) {
  //
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout( function() { nextSequence() }, 1000)
    }
  } else {

    playSound('wrong')
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press any key to Restart")
    setTimeout( function() { $("body").removeClass("game-over") }, 200 )
    startOver()

  }
}

// Check if any Key is Pressed
$(document).on("keydown", function() {
    if (!started) {
      nextSequence();
      started = true
    }
  });

// Click Button
$(".btn").click(function(event) {
  if ( started === true ) {
    // Get ID of clicked Color
    var userChosenColour = event.target.id;
    // Push color inside User Clicked Pattern
    userClickedPattern.push(userChosenColour);
    // Sound Effect
    playSound(userChosenColour);
    // Press Button Animation
    animatePress(userChosenColour);
    // Check Answer
    checkAnswer(userClickedPattern.length - 1);
  } else {
    nextSequence(); // executing for test purposes
    started = true
  }
});

// Play Sound Effects
function playSound(id) {
  // Defines file by ID
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

// Press Button Animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() { $("#" + currentColour).removeClass("pressed");}, 100)
}

// Start over
function startOver() {
  level = 0;
  gamePattern = [''];
  started = false
}
