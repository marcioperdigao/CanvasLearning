/**
 * Created by Nonato on 02/07/2015.
 */
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){
    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");

    function drawScreen(){
        context.globalAlpha=1;
        context.fillStyle="#000000";
        context.fillRect(0,0,640,480);
        context.drawImage(helloWorldImage,30,30);

        if(fadein){
            alpha+=.01;
            if(alpha>=1){
                alpha=1;
                fadein=false;
            }
        }
        else{
            alpha-=.01;
            if(alpha<=0){
                alpha=0;
                fadein=true;
            }

        }
        context.font="72px Sans-Serif";
        context.textBaseline="top";
        context.globalAlpha=alpha;
        context.fillStyle="#FFFFFF";
        context.fillText(text,50,200);

    }
    var text="HELLO BRASIL";
    var alpha=0;
    var fadein=true;
    var helloWorldImage=new Image();
    helloWorldImage.src="./img/watchmen.gif";

    function gameLoope(){
        window.setTimeout(gameLoope,100);
        drawScreen();
    }
    gameLoope();
}