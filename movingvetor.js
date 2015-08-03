
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();

}
function canvasApp(){
    var canvas=document.getElementById("nova-game");
    var context=canvas.getContext("2d");
    var pointImage=new Image();
    pointImage.src="img/point.png";

    function drawScreen () {
        var ball;
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, canvas.width, canvas.height);
//Box
        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
        context.fillStyle = "#000000";
        for(i=0;i<balls.length;i++){
            ball=balls[i];

            ball.x += ball.xunits;
            ball.y += ball.yunits;
            updateBall();
                context.beginPath();
                context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
                context.closePath();
                context.fill();

        }
        function updateBall(){
            if(ball.x<ball.speed || ball.x>canvas.width){
                ball.angle=180-ball.angle;
                ball.radians=ball.angle*Math.PI/180;
                ball.xunits=Math.cos(ball.radians)*ball.speed;

            }
            else if(ball.y>canvas.height || ball.y<0){
                console.log("angle:" +ball.angle+" yunits: "+ball.yunits+" y: "+ball.y);
                ball.angle=360-ball.angle;
                ball.radians=ball.angle*Math.PI/180;
                //console.log("sin(ball.radians)"+Math.sin(ball.radians));
                ball.yunits=Math.sin(ball.radians)*ball.speed;

            }
        }
    }
    var numBalls=100;
    var maxSize=20;
    var minSize=5;
    var maxSpeed=maxSize+5;
    var balls=new Array();
    var tempSpeed;
    var tempX;
    var tempY;
    var tempBall;
    var tempAngle;
    var tempRadius;
    var tempRadians;
    var tempXunits;
    var tempYunits;

    for(var i=0;i<numBalls;i++){
        tempRadius=Math.floor(Math.random()*maxSize)+minSize;
        tempX=tempRadius*2+(Math.random()*canvas.width)+tempRadius*2;
        tempY=tempRadius*2+(Math.random()*canvas.height)+tempRadius*2;
        tempSpeed=maxSpeed-tempRadius;
        tempAngle=Math.floor(Math.random()*360);
        tempRadians=tempAngle*Math.PI/180;
        tempXunits=Math.cos(tempRadians)*tempSpeed;
        tempYunits=Math.sin(tempRadians)*tempSpeed;
        tempBall={x:tempX,y:tempY,speed:tempSpeed,angle:tempAngle,radius:tempRadius,radians:tempRadians,xunits:tempXunits,yunits:tempYunits};
        balls.push(tempBall);
    }

    function gameLoop(){
            window.setTimeout(gameLoop,20);
        drawScreen();

    }
    gameLoop();

}