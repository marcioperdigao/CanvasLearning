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
    drawScreen();
    function drawScreen(){
        //draw a big box on the screen
        context.fillStyle="black";
        context.fillRect(10,10,200,200);
        context.save();
        context.beginPath();
        context.rect(0,0,50,50);

        context.clip();

        //red circle
        context.beginPath();
        context.strokeStyle="red";
        context.lineWidth=5;
        context.arc(100,100,100,(Math.PI/180)*0,(Math.PI/180)*360,false);

        //full circle
        context.stroke();
        context.closePath();

        context.restore();

        //reclip to the entire canvas
        context.beginPath();
        context.rect(0,0,500,500);
        context.clip();

        //draw a blue line that is clipped
        context.beginPath();
        context.strokeStyle="blue";
        context.lineWidth=5;
        context.arc(100,100,50,(Math.PI/180)*0,(Math.PI/180)*360,false);

        //full circle
        context.stroke();
        context.closePath();
    }

}/**
 * Created by Nonato on 02/07/2015.
 */
