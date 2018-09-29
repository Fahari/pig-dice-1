function pigDice() {}
pigDice.prototype.userToStart = 1;
pigDice.prototype.userPlaying = 1;
pigDice.prototype.roundScore = 0;
pigDice.prototype.finalScore = 20;
pigDice.prototype.globalScore1 = 0;
pigDice.prototype.globalScore2 = 0;

//pigDice.prototype.userPlaying = this.userToStart;
pigDice.prototype.rollDice =  function() {
  //Generate a random number to select the item in the array
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
pigDice.prototype.hold = function(){ 
  $(".dice-image").hide();
  if(this.userPlaying === 1) {
    this.globalScore1+=this.roundScore;
    $(".globalScoreDisplay1").text(this.globalScore1);
  } else {
    this.globalScore2+=this.roundScore;
    $(".globalScoreDisplay2").text(this.globalScore2);
  }
  this.winner();
}
pigDice.prototype.winner = function() {
  if(this.globalScore1 >= this.finalScore || this.globalScore2 >= this.finalScore) {
    $(".user" + this.userPlaying + "Win").text("Winner!!");
    if(this.userPlaying === 1) {
      $("#game-board h5").text("Winner: Player 1");
    } else {
      $("#game-board h5").text("Winner: Player 2");
    }
    // $("#current-player").text("User" + this.userPlaying); 
    $("#rematch").show();
    this.roundScore = 0;
    $(".roundScoreDisplay1").text(this.roundScore);
    $(".roundScoreDisplay2").text(this.roundScore);
    $(".player-roll").attr("disabled",true);
    $(".player-hold").attr("disabled",true);
  } else {
    this.otherPlayer();
  }
}
pigDice.prototype.otherPlayer = function() {
  $(".roundScoreDisplay" + this.userPlaying).text(0);
  if(this.userPlaying === 1) {
    $("#user1").addClass("notPlaying");
    $("#user2").removeClass("notPlaying");
    $("#game-board h5").text("Current Player: Player 2");
    this.userPlaying = 2;
  } else {
    $("#user2").addClass("notPlaying");
    $("#user1").removeClass("notPlaying");
    $("#game-board h5").text("Current Player: Player 1");
    this.userPlaying = 1;
  }
  this.roundScore = 0;
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
  $(".user1Win").text("Player 1");
  $(".user2Win").text("Player 2");
  this.userPlaying = 1;
}
pigDice.prototype.initial = function() {
  $("#game-board h5").text(`Current Player: Player 1`);
  $("#user1").removeClass("notPlaying");
  $("#user2").addClass("notPlaying");
  $("#rematch").hide();
}
$(document).ready(function() {
  $("#description h4").click(function() {
    $(".gameplay").slideToggle();
  })
  $("#playBtn").click(function(event) {
    $("#description").hide();
    $("#game").show();
    event.preventDefault();
    game = new pigDice();
    $("#settings").hide();
    $("#game").show();
    game.initial();
  })
  $("#starter").click(function(event) {
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