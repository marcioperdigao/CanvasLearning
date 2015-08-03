
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){

    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");
    var counter=0;
    var tileSheet=new Image();
    tileSheet.addEventListener('load',eventSheetLoaded,false);
    tileSheet.src="img/watchmen.gif";
    function eventSheetLoaded(){
        startUp();
    }


    function drawScreen() {
        context.fillStyle="#aaaaaa";
        context.fillRect(0,0,500,500);
        context.drawImage(tileSheet,32*counter,0,32,32,50,50,64,64);
        counter++;
        if(counter>1){
            counter=0;
        }
    }
    function startUp(){
        gameLoop();
    }
    function gameLoop(){
        window.setTimeout(gameLoop,500);
        drawScreen();
    }
}


