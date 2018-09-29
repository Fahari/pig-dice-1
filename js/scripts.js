function pigDice(userToStart,player1,player2) {
  this.userToStart = userToStart;
  this.player1 = player1;
  this.player2 = player2;
}
pigDice.prototype.finalScore = 10;
pigDice.prototype.globalScore1 = 0;
pigDice.prototype.globalScore2 = 0;

pigDice.prototype.userPlaying = this.userToStart;
pigDice.prototype.easyArray = [1,2,3,4,5,6];
pigDice.prototype.rollDice =  function() {
  //Generate a random number to select the item in the array
  var diceSelector = Math.floor(Math.random() * this.easyArray.length);
  //select an item from the array
  // var dice = easyArray[diceSelector];
  var dice = Math.floor(Math.random() * 6) + 1;
  $(".dice-image").show();
  $(".dice-image img").attr("src","../images/dice-" + dice + ".png");
  if(dice !== 1) {
  //add the dice to the round score
    this.roundScore+=dice;
    $(".roundScoreDisplay" + this.userPlaying).text(this.roundScore);
  } else {
    $(".dice-image").hide();
    alert("Oh no you got a 1");
    this.otherPlayer();
  }

}
pigDice.prototype.userNotPlaying = function() {
  var toReturn
  if(this.userPlaying === 1) {
    toReturn = 2;
  } else {
    toReturn = 1;
  }
  return toReturn;
}
pigDice.prototype.userNotStarting = function() {
  if (this.userToStart === 1) {
    return 2
  } else {
    return 1;
  }
}
pigDice.prototype.hold = function(){ 
  $(".dice-image").hide();
  if(this.userPlaying === 1) {
    this.globalScore1+=this.roundScore;
    $(".globalScoreDisplay" + this.userPlaying).text(this.globalScore1);
  } else {
    this.globalScore2+=this.roundScore;
    $(".globalScoreDisplay" + this.userPlaying).text(this.globalScore2);
  }
  this.winner();
}
pigDice.prototype.winner = function() {
  if(this.globalScore1 >= this.finalScore || this.globalScore2 >= this.finalScore) {
    $(".user" + this.userPlaying + "Win").text("Winner!!");
    $("#game-board h3").text("Winner: " + "User " + this.userPlaying)
    $("#current-player").text("User 1")
    $("#rematch").show();
    this.roundScore = 0;
    $(".roundScoreDisplay1").text(this.roundScore);
    $(".roundScoreDisplay2").text(this.roundScore);
    this.gameOver();
  } else {
    this.otherPlayer();
  }
}
pigDice.prototype.otherPlayer = function() {
  $(".roundScoreDisplay" + this.userPlaying).text(0);
  if(this.userPlaying === 1) {
    $("#user1").addClass("notPlaying");
    $("#user2").removeClass("notPlaying");
    this.userPlaying = 2;
  } else {
    $("#user2").addClass("notPlaying");
    $("#user1").removeClass("notPlaying");
    this.userPlaying = 1;
  }
  this.roundScore = 0;
  $("#current-player").text("User " + this.userPlaying)
}
pigDice.prototype.newGame  = function() {
  this.roundScore = 0;
  this.globalScore1 = 0;
  this.globalScore2 = 0;
  $(".roundScoreDisplay1").text(this.roundScore);
  $(".roundScoreDisplay2").text(this.roundScore);
  $(".globalScoreDisplay1").text(this.globalScore1);
  $(".globalScoreDisplay2").text(this.globalScore2);
  $(".player-roll").attr("disabled",false);
  $(".player-hold").attr("disabled",false);
}
pigDice.prototype.gameOver = function() {
  $(".player-roll").attr("disabled",true);
  $(".player-hold").attr("disabled",true);
}
pigDice.prototype.initial = function() {
  $("#game-board h3").text("Current Player: " + this.userToStart);
  $(".user1Win").text("User 1");
  $(".user2Win").text("User 2");
  $("#user" + this.userNotStarting()).addClass("notPlaying");
  $("#user" + this.userToStart).removeClass("notPlaying");
  $("#rematch").hide();
}
$(document).ready(function() {
  $("#description h4").click(function() {
    $(".gameplay").slideToggle();
  })
  $("#playBtn").click(function() {
    $("#description").hide();
    $("#settings").show();
  })
  $("#starter").click(function(event) {
    event.preventDefault();
    var player1 = $("#1").val();
    var player2 = $("#2").val();
    var userStarting = parseInt($("input:radio[name=starter]:checked").val());
    game = new pigDice(userStarting,player1,player2);
    game.initial();
    $("#settings").hide();
    $("#game").show();
  })
  $(".player-roll").click(function() {
    game.rollDice(); 
  })
  $(".player-hold").click(function() {
    game.hold();
  })
  $("#reset").click(function() {
    location.reload();
  })
  $("#rematch").click(function() {
    game.initial();
    game.newGame();
  })
})