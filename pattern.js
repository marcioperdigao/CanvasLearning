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


    function drawScreen() {


        var fillImg = new Image();
        fillImg.src = './img/watchmen.gif';
        fillImg.onload = function() {

            var fillPattern = context.createPattern(fillImg, 'repeat');
            context.fillStyle=fillPattern;
            context.fillRect(32, 32,300,300);
        }







    }

}
/**
 * Created by Nonato on 04/07/2015.
 */
