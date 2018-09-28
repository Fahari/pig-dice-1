var roundScore,globalScore1,globalScore2;
roundScore = 0;
globalScore1 = 0;
globalScore2 = 0;
userPlaying = 1;
var easyArray = [1,2,3,4,5,6];
function rollDice() {
  //Generate a random number to select the item in the array
  var diceSelector = Math.floor(Math.random() * easyArray.length);
  //select an item from the array
  var dice = easyArray[diceSelector];
  if(dice !== 1) {
  //add the dice to the round score
    roundScore+=dice;
    $(".roundScoreDisplay" + userPlaying).text(roundScore);
  } else {
    otherPlayer();
  }
}
function hold() { 
  if(userPlaying === 1) {
    globalScore1+=roundScore;
    $(".globalScoreDisplay" + userPlaying).text(globalScore1);
  } else {
    globalScore2+=roundScore;
    $(".globalScoreDisplay" + userPlaying).text(globalScore2);
  }
  if(globalScore1 >= 30 || globalScore2 >= 30) {
    $(".user" + userPlaying + "Win").text("Winner");
    newGame();
  } else {
    otherPlayer();
  }

}
function otherPlayer() {
  $(".roundScoreDisplay" + userPlaying).text(0);
  if(userPlaying === 1) {
    $("#user1").addClass("notPlaying");
    $("#user2").removeClass("notPlaying");
    userPlaying = 2;
  } else {
    $("#user2").addClass("notPlaying");
    $("#user1").removeClass("notPlaying");
    userPlaying = 1;
  }
  roundScore = 0;
}
function newGame() {
  roundScore = 0;
  globalScore1 = 0;
  globalScore2 = 0;
  $(".roundScoreDisplay1").text(roundScore);
  $(".roundScoreDisplay2").text(roundScore);
  $(".globalScoreDisplay1").text(globalScore1);
  $(".globalScoreDisplay2").text(globalScore2);
}

$(document).ready(function() {
  $("#user2").addClass("notPlaying");
  $("#description h4").click(function() {
    $(".gameplay").slideToggle();
  })
  $("#playBtn").click(function() {
    $("#description").hide();
    $("#game").show();
  })
  $(".player" + userPlaying + "-roll").click(function() {
    rollDice(); 
  })
  $(".player" + userPlaying + "-hold").click(function() {
    hold();
  })
})