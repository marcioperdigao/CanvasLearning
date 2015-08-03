/**
 * Created by Nonato on 05/07/2015.
 */
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
        context.fillStyle="red";
        context.shadowOffsetX=4;
        context.shadowOffsetY=4;
        context.shadowBlur=4;
        context.shadowColor="black";
        context.fillRect(10,10,100,100);

        context.shadowOffsetX=-4;
        context.shadowOffsetY=-4;
        context.shadowBlur=4;
        context.shadowColor="black";
        context.fillRect(150,10,100,100);

        context.fillStyle="yellow";
        context.shadowOffsetX=4;
        context.shadowOffsetY=4;
        context.shadowBlur=60;
        context.shadowColor="red";
        context.arc(200,200,40,(Math.PI/180)*360,false);
        context.fill();

    }

}


/**
 * Created by Nonato on 04/07/2015.
 */
