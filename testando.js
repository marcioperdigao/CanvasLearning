/**
 * Created by Nonato on 03/07/2015.
 */
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
        context.beginPath();

        context.fillStyle="blue";
        context.strokeStyle="green"
        context.lineWidth=2;
        context.rect(10,10,100,100);


        context.fill();
        context.stroke();

        context.save();
        context.closePath();
        context.fillStyle="black";
        context.fillRect(0,20,50,50);

        //context.save();
        context.beginPath();

        context.fillStyle="pink";
        context.strokeStyle="black";
        context.lineWidth=5;
        context.restore();
        context.rect(299,300,100,100);
        context.fill();
        context.stroke();
        //context.closePath();
 }

}/**
 * Created by Nonato on 02/07/2015.
 */

