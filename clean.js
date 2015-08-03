
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){

    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");
    var Offset=0;



    function drawScreen() {

        context.clearRect(0,0,canvas.width,canvas.height);
        var currentPath=context.beginPath();
        context.strokeStyle="red";
        context.lineWidth=5;
        context.moveTo(0,0+Offset);
        context.lineTo(50,0+Offset);
        context.lineTo(50,50+Offset);
        context.stroke();
        context.closePath();
        Offset+=20;

    }
    function gameLoop(){
        window.setTimeout(gameLoop,200);
        drawScreen();
    }
    gameLoop();

}


