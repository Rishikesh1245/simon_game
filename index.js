
var buttonColors = ["red", "blue","green","yellow"];     // array of colors    

var gamePattern=[];                                      // null array 
var userClickedPattern=[]; 

var level = 0;

var started = false;

// Function to start the game on first Key press

$(document).keydown(function(){

    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});


 // Event listener to check user selected color 

$(".btn").click(function(){                              
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);


});


// Function to compare game pattern and user pattern 

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(gamePattern.length === userClickedPattern.lenth){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    
}


// Function to create Game pattern using random number 

function nextSequence(){

    userClickedPattern = [];

    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber =Math.floor(Math.random()*4) ;       // 1-4 random numbers 
    var randomChosenColor = buttonColors[randomNumber];   // chosing random color based on random number
    gamePattern.push(randomChosenColor);     

    $("#" + randomChosenColor).fadeIn(100).fadeout(100).fadeIn(100);     // animate as flash game pattern 

    playSound(randomChosenColor);
}



function playSound(name){
    var audio = new Audio ("sounds/" +name+ ".mp3");                      //playing Sounds   
    audio.play();
}


function animatePress(currentColor){                                     // flash Animation 
    $("#" +currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" +currentColor).removeClass("pressed")
    },100);
}

// Restart function

function startOver(){

    level = 0;
    gamePattern = [];
    started = false; 
  }

$("h1").css("color", "red");


