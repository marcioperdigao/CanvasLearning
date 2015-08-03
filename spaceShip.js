window.addEventListener('load',WindowLoaded,false);

function WindowLoaded(){
    startCanvas();
}

function startCanvas(){
    var theCanvas=document.getElementById("nova-game");
    if(!theCanvas || !theCanvas.getContext){
        return;
    }
    var context=theCanvas.getContext("2d");
    if(!context){
        return;
    }


    function drawScreen(){

        //check key
        if(keyPressList[38]==true){
            //thrust
            var angleInRadians=rotation*Math.PI/180;
            facingX=Math.cos(angleInRadians);
            facingY=Math.sin(angleInRadians);

            var newMovingX=movingX+thrustAcellaration*facingX;
            var newMovingY=movingY+thrustAcellaration*facingY;
            var currentVelocity=Math.sqrt(newMovingX*newMovingX+newMovingY*newMovingY);

            if(currentVelocity<maxVelocity){
                movingX=newMovingX;
                movingY=newMovingY;
            }
        }

        if(keyPressList[37]==true){
            //rotate counterclockwise
            rotation-=rotationalVelocity;
        }
        if(keyPressList[39]==true){
            rotation+=rotationalVelocity;
        }
        x=x+movingX;
        y=y+movingY;

        context.globalAlpha=1;
        //update the ship

        shipState++;
        if(shipState>1){
            shipState=0;
        }
        context.fillStyle="#000000";
        context.fillRect(0,0,200,200);
        context.fillStyle='#ffffff';
        context.font="20px sans-serif";
        context.textBaseline='top';
        context.fillText("Player Ship-Static",0,180);
        context.globalAlpha=alpha;

        //Transformation

        context.save();
        context.setTransform(1,0,0,1,0,0);
        var radians=rotation*Math.PI/180;
        context.translate(x +.5*width,y+0.5*height);
        context.rotate(radians);

        //draw ship
        context.fillStyle="blue";
        context.strokeStyle="#ffffff";

        context.beginPath();

        /*context.moveTo(10-0.5*width,0-0.5*height);
        context.lineTo(19-0.5*width,19-0.5*height);
        context.lineTo(10-0.5*width,9-0.5*height);
        context.moveTo(9-0.5*width,9-0.5*height);
        context.lineTo(0-0.5*width,19-0.5*height);
        context.lineTo(9-0.5*width,0-0.5*height);
        */


        context.moveTo(-10,-10);
        context.lineTo(10,0);
        context.moveTo(10,1);
        context.lineTo(-10,10);
        context.lineTo(1,1);
        context.moveTo(1,-1);
        context.lineTo(-10,-10);


        if(shipState==1){
            //draw thrust
            context.moveTo(8,13);
            context.lineTo(11,13);
            context.moveTo(9,14);
            context.lineTo(9,18);
            context.moveTo(10,14);
            context.lineTo(10,18);
        }
        context.stroke();
        context.beginPath();

        context.restore();

        alpha+=.05;
        if(alpha>1){
            alpha=1;
        }


    }
    const FRAME_RATE=30;
    var intervalTime=1000/FRAME_RATE;
    var shipState=0;// 0=static, 1=thrust
    var rotation=0;
    var maxVelocity=1;
    var x=50;
    var y=50;
    var width=20;
    var height=20;
    var alpha=0;
    context.globalAlpha=1;
    var facingX=0;
    var facingY=0;
    var movingX=0;
    var movingY=0;
    var rotationalVelocity=5;
    var thrustAcellaration=0.03;
    var keyPressList=[];


    gameLoop();

    function gameLoop(){
        drawScreen();
        window.setTimeout(gameLoop,intervalTime);
    }
    document.onkeydown=function(e){
        e=e? e:window.event;
        keyPressList[e.keyCode]=true;
    };
    document.onkeyup=function(e){
        e=e?e: window.event;
        keyPressList[e.keyCode]=false;
    };

}