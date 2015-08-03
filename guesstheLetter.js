/**
 * Created by Nonato on 02/07/2015.
 */
window.onload=function(){
    canvasApp2();

};
var Debugger = function () { };
Debugger.log = function (message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
};

function canvasApp2(){
    var canvas=document.getElementById("nova-game");
    var context=canvas.getContext("2d");
    var guesses=0;
    var message="Guess The Letter From a (lower) to z(higher";
    var letter=[
        "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
        "p","q","r","s","t","u","v","w","x","y","z"
    ];
    var today=new Date();
    var letterToGuess="";
    var higherOrLower="";
    var lettersGuessed;
    var gameOver=false;
    initGame();

    function drawScreen(){
        context.fillStyle="#ffffaa";
        context.fillRect(0,0,500,300);

        context.strokeStyle="#000000";
        context.strokeRect(5,5,490,290);
        context.textBaseline="top";

        //Date
        context.fillStyle="#000000";
        context.font="10px Sans-Serif";
        context.fillText(today,150,10);

        //message
        context.fillStyle="#F00000";
        context.font="14px Sans-Serif";
        context.fillText(message,125,30);
        context.fillStyle="#109910";
        context.font="16px Sans-Serif";
        context.fillText("Guesses: "+guesses,215,50);

        //Higher or Lower
        context.fillStyle="#000000";
        context.font="16px Sans-Serif";
        context.fillText("Higher or Lower: "+higherOrLower,150,125);

        //Letter Guessed
        context.fillStyle="#FF0000";
        context.font="16px Sans-Serif";
        context.fillText("Letter Guessed: "+lettersGuessed.toString(),10,260);
        if(gameOver){
            context.fillStyle="#FF0000";
            context.font="40px Sans-Serif";
            context.fillText("YOU WIN, YOU WIN!",150,180);

        }


    }

    function initGame(){
        var letterIndex =Math.floor(Math.random()*letter.length);

        letterToGuess=letter[letterIndex];
        guesses=0;
        lettersGuessed=[];
        gameOver=false;
        window.addEventListener("keydown",eventKeyPressed,true);
        drawScreen();
    }
    function eventKeyPressed(e){
        if(!gameOver){
            var letterPressed=String.fromCharCode(e.keyCode);
            letterPressed=letterPressed.toLowerCase();
            guesses++;
            lettersGuessed.push(letterPressed);
            if(letterPressed==letterToGuess){
                gameOver=true;
            }
            else{
                var letterIndex=letter.indexOf(letterToGuess);
                var guessIndex=letter.indexOf(letterPressed);
                Debugger.log(guessIndex);
                if(guessIndex<0){
                    higherOrLower="That is not letter";
                }
                else if(guessIndex>letterIndex){
                    higherOrLower="Lower";
                }
                else{
                    higherOrLower="Higher";
                }
            }
            drawScreen();
        }

    }

}