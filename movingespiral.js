
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp() {


    function drawScreen() {

        context.fillStyle = "#eeeeee";
        context.fillRect(0, 0, canvas.width, canvas.height);
        //box
        context.strokeStyle = "#000000";
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);


        if (p1.angle < 360) p1.angle++;
        else {
            p1.angle = 0;
        }
        speed+=0.001;
        var radians = p1.angle * Math.PI / 180;
        var x = Math.cos(radians) * p1.radius;
        var y = Math.sin(radians) * p1.radius;
        x += p1.x;
        y += p1.y;
        p1.radius+=p1.radiusInc;
        p1.radius+=p1.radiusInc;
        //trilha de pontos;
        arrEspecial[referencia.arrFinal]=new points({
            x:x,
            y:y
        });
        //alert("arrInicio "+referencia.arrInicio+" arrFinal: "+referencia.arrFinal);
        var j=referencia.arrInicio;
        //if(j==10)j--;

        while(j!=referencia.arrFinal){
            //alert(arrEspecial[j].x);
            // console.log("arrFinal"+referencia.arrFinal+" j: "+j+" arrInicial: "+referencia.arrInicio);

            context.fillStyle = "red";
            context.beginPath();
            context.arc(arrEspecial[j].x, arrEspecial[j].y, 3, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            if(j<arrEspecial.length-1){
                j++;
                //alert("j:"+j);
            }
            else {j=0}

        }

        referencia.arrFinal++;
        if(referencia.arrFinal==arrEspecial.length){
            referencia.arrFinal=0;
            referencia.arrInicio=1;
        }

        else if(referencia.arrFinal==referencia.arrInicio){
            referencia.arrInicio++;
            if(referencia.arrInicio==arrEspecial.length){
                referencia.arrInicio=0;
            }
        }

        //create ball

        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");


    var pontos=function(){
        this.x;
        this.y;
    };
    var p1 = new pontos();
    p1.x = 250;
    p1.y = 250;
    p1.angle = 1;
    p1.radius=2;
    p1.radiusInc=0.1;
    var speed=0.1;

    var points=function(config){
        this.x=config.x;
        this.y=config.y;

    };
    var referencia={
        arrInicio:0,
        arrFinal:0
    };

    var arrEspecial=new Array(100);
    function gameLoop(){


        window.setTimeout(gameLoop,20);

        drawScreen();

    }
    gameLoop();

}
