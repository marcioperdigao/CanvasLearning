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
        var angulo=0;
        var x=50,y=100,width=40,height=40;
        var angleInRadians=(angulo*Math.PI/180);
        drawScreen();
        var keyPressed;
        var keyPressedLow;
        var tam1=1;
        var tam2=1;


    window.addEventListener("keydown",eventKeyPressed,true);
    function eventKeyPressed(e){
        keyPressed=String.fromCharCode(e.keyCode);
        keyPressedLow=keyPressed.toLowerCase();

        if(keyPressedLow=="d"){
            keyPressedLow=undefined;
            keyPressed=undefined;
            x+=5;
        }
        if(keyPressedLow=="b"){

            keyPressedLow=undefined;
            keyPressed=undefined;
            tam1++;
            tam2++;
        }

    }
        function drawScreen() {

                setInterval(function () {

                    context.setTransform(1,0,0,1,0,0);
                    context.fillStyle="black";
                    context.fillRect(0,0,640,480);
                    context.setTransform(1,0,0,1,0,0);
                    angleInRadians=(angulo*Math.PI/180);
                    context.translate(x+width/2,y+height/2);


                    context.scale(tam1,tam2);
                    context.rotate(angleInRadians);
                    context.fillStyle="red";
                    context.fillRect(-.5*width, -.5*height,width,height);
                    if(angulo<360){
                        angulo+=5;
                    }
                    else angulo=0;


            },100);

        }


}
