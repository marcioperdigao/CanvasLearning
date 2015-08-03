
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){


    function drawScreen(){

        context.fillStyle="#eeeeee";
        context.fillRect(0,0,canvas.width,canvas.height);
        //box
        context.strokeStyle="#000000";
        context.strokeRect(1,1,canvas.width-2,canvas.height-2);
        points.push({x:p1.x,y:p1.y});

        //trilha de pontos;
        for(var i= 0;i<points.length;i++){
        context.fillStyle="red";
        context.beginPath();
        context.arc(points[i].x,points[i].y,1,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        }
        //create ball
        p1.x+=xunits;
        p1.y+=yunits;
        context.fillStyle="#000000";
        context.beginPath();
        context.arc(p1.x, p1.y,15,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }
    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");

    var speed=5;
    var pontos=function(){
        this.y=0;
        this.x=0;
    };

    var p1=new pontos();
    p1.x=50;
    p1.y=50;

    var p2=new pontos();
    p2.x=100;
    p2.y=100;

    var distancia=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));

    var moves=distancia/speed;

    var points=[];
    var angle=45;
    alert(Math.atan2(p2.y,p2.x)*180/Math.PI);

    var radians=angle*Math.PI/180;
    //alert(Math.sin(radians));
    var xunits=Math.cos(radians)*speed;
    var yunits=Math.sin(radians)*speed;


    function gameLoop(){

        if(moves>0){
            window.setTimeout(gameLoop,20);
            moves--;
        }
            drawScreen();

    }
    gameLoop();



}


