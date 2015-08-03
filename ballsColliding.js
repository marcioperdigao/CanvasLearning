
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();

}
function canvasApp(){
    var ball;
    var canvas=document.getElementById("nova-game");
    var context=canvas.getContext("2d");
    var pointImage=new Image();
    pointImage.src="img/point.png";

    function drawScreen () {

        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, canvas.width, canvas.height);
//Box
        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, canvas.width-2, canvas.height-2);

        update();
        testeWalls();
        collide();
        render();

    }
    function update(){
        for(var i=0;i<balls.length;i++){
            ball=balls[i];
            ball.nextX+=ball.velocityX;
            ball.nextY+=ball.velocityY;

        }
    }
    function testeWalls(){
        var ball;
        var testBall;

        for(var i=0;i<balls.length;i++){
            ball=balls[i];

            if(ball.nextX+ball.radius>canvas.width) {
                ball.velocityX = ball.velocityX * -1;
                ball.nextX = canvas.width - ball.radius;
            }
            else if(ball.nextX-ball.radius<0){
                ball.velocityX=ball.velocityX*-1;
                ball.nextX=ball.radius;
            }
            else if(ball.nextY+ball.radius>canvas.height){

                ball.velocityY=ball.velocityY*-1;
                ball.nextY=canvas.height-ball.radius;
            }
            else if(ball.nextY-ball.radius<0){
                ball.velocityY=ball.velocityY*-1;
                ball.nextY=ball.radius;
            }
        }
    }
    function render(){
        var ball;
        context.fillStyle='#000000';
        for(var i=0;i<balls.length;i++){
            ball=balls[i];
            ball.x=ball.nextX;
            ball.y=ball.nextY;

            context.beginPath();
            context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
            context.closePath();
            context.fill();
        }
    }
    function collide(){
        var ball;
        var testeBall;

        for(var i=0;i<balls.length;i++){
            ball=balls[i];
            for(var j=i+1;j<balls.length;j++){
                testeBall=balls[j];
                if(hitTestCircle(ball,testeBall)){
                    collideBalls(ball,testeBall);
                }
            }
        }
    }

        function hitTestCircle(ball1,ball2){
            var retval=false;
            var dx=ball1.nextX-ball2.nextX;
            var dy=ball1.nextY-ball2.nextY;
            var distance = (dx*dx+dy*dy);
            if(distance<=(ball1.radius+ball2.radius)*(ball1.radius+ball2.radius)){
                retval=true;
            }
            return retval;

        }

    function collideBalls(ball1,ball2){
        var dx=ball1.nextX-ball2.nextX;
        var dy=ball1.nextY-ball2.nextY;

        var collisionAngle=Math.atan2(dy,dx);

        var speed1=Math.sqrt(ball1.velocityX * ball1.velocityX +
            ball1.velocityY * ball1.velocityY);
        var speed2=Math.sqrt(ball2.velocityX * ball2.velocityX +
            ball2.velocityY * ball2.velocityY);

        var direction1=Math.atan2(ball1.velocityY,ball1.velocityX);
        var direction2=Math.atan2(ball2.velocityY,ball2.velocityX);

        var velocityx_1=speed1*Math.cos(direction1-collisionAngle);
        var velocityy_1=speed1*Math.sin(direction1-collisionAngle);
        var velocityx_2=speed2*Math.cos(direction2-collisionAngle);
        var velocityy_2=speed2*Math.sin(direction2-collisionAngle);

        var final_velocityx_1=((ball1.mass-ball2.mass)*velocityx_1+(ball2.mass+ball2.mass)*velocityx_2)/(ball1.mass+ball2.mass);
        var final_velocityx_2=((ball1.mass+ball1.mass)*velocityx_1+(ball2.mass-ball1.mass)*velocityx_2)/(ball1.mass+ball2.mass);

        var final_velocityy_1=velocityy_1;
        var final_velocityy_2=velocityy_2;

        ball1.velocityX=Math.cos(collisionAngle)*final_velocityx_1+Math.cos(collisionAngle+Math.PI/2)*final_velocityy_1;
        ball1.velocityY=Math.sin(collisionAngle)*final_velocityx_1+Math.sin(collisionAngle+Math.PI/2)*final_velocityy_1;
        ball2.velocityX=Math.cos(collisionAngle)*final_velocityx_2+Math.cos(collisionAngle+Math.PI/2)*final_velocityy_2;
        ball2.velocityY=Math.sin(collisionAngle)*final_velocityx_2+Math.sin(collisionAngle+Math.PI/2)*final_velocityy_2;

        ball1.nextX=(ball1.nextX+=ball1.velocityX);
        ball1.nextY=(ball1.nextY+=ball1.velocityY);
        ball2.nextX=(ball2.nextX+=ball2.velocityX);
        ball2.nextY=(ball2.nextY+=ball2.velocityY);

    }

    var numBalls=5;
    var balls=new Array();
    var tempSpeed;
    var tempX;
    var tempY;
    var tempBall;
    var tempAngle;
    var tempRadius;
    var tempRadians;
    var tempVelocityx;
    var tempVelocityy;


    for(var i=0;i<numBalls;i++){
       tempRadius=20;

        var placeOK=false;
        while(!placeOK){
            tempX=tempRadius*3+(Math.floor(Math.random()*canvas.width)-tempRadius*3);
            tempY=tempRadius*3+(Math.floor(Math.random()*canvas.height)-tempRadius*3);
            tempSpeed=4;
            tempAngle=Math.floor(Math.random()*360);
            tempRadians=tempAngle*Math.PI/180;
            tempVelocityx=Math.cos(tempRadians)*tempSpeed;
            tempVelocityy=Math.sin(tempRadians)*tempSpeed;

            tempBall={x:tempX,y:tempY,nextX:tempX,nextY:tempY,radius:tempRadius,speed:tempSpeed,angle:tempAngle,radians:tempRadians,velocityX:tempVelocityx,
            velocityY:tempVelocityy,mass:tempRadius};
            placeOK=canStartHere(tempBall);
        }
        balls.push(tempBall);
    }

    function  canStartHere(ball){
        var retval=true;
        for(var i=0;i<balls.length;i++){
            if(hitTestCircle(ball,balls[i])){
                retval=false;
            }
        }
        return retval;
    }


    function gameLoop(){
        window.setTimeout(gameLoop,20);
        drawScreen();

    }
    gameLoop();

}