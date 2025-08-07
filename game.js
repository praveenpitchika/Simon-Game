function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function gameover(){
    var go = new Audio("./sounds/wrong.mp3");
    go.play();
}

level = 0
gamePattern = [];

function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour  = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    // console.log(randomChosenColour)
    $("#"+randomChosenColour).addClass("pressed");
    playSound(randomChosenColour);
    setTimeout(function() {
    $("#"+randomChosenColour).removeClass("pressed");}, 100);
    level += 1;
    $("#level-title").text("level  " + level);
};

$(".btn").click(function(event){
    var userChosenColour = event.target.id 
    userClickedPattern.push(userChosenColour)
    $("#"+userChosenColour).addClass("pressed");
    playSound(userChosenColour);
    setTimeout(function() {
    $("#"+userChosenColour).removeClass("pressed");}, 100);
    if (gamePattern.length == userClickedPattern.length){

    if (arraysEqual(gamePattern,userClickedPattern)){
        // nextSequence()
        setTimeout(nextSequence,800);
        userClickedPattern = [];
        console.log("Pattern Matched")
    }else {
        $("body").addClass("game-over")
        $("#level-title").text("Game Over..!!(Press any Key to Restart)");
        gameover();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        level = 0
        console.log("Pattern Not matched")
        gamePattern = [];
        userClickedPattern = [];
    }     }
});

$("body").keypress(function() { //this is start a game
    nextSequence()
});



