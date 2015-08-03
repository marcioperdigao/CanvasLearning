
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){

    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");

    var blueObject={};
    var redObject={};

    blueObject.x=100;
    blueObject.y=200;
    blueObject.dx=4;
    blueObject.width=48;
    blueObject.height=48;
    blueObject.image=new Image();
    blueObject.image.src="img/blueplus.png";

    context.drawImage(blueObject.image,0,0);
    blueObject.blueImageData=context.getImageData(0,0,blueObject.width,blueObject.height);
    context.clearRect(0,0,canvas.width,canvas.height);

    redObject.x=300;
    redObject.y=200;
    redObject.dx=-4;
    redObject.width=48;
    redObject.height=48;
    redObject.image=new Image();
    redObject.image.src="img/redcircle.png";

    context.drawImage(redObject.image,0,0);
    redObject.redImageData=context.getImageData(0,0,redObject.width,redObject.height);
    context.clearRect(0,0,canvas.width,canvas.height);

    function drawScreen(){
        blueObject.x+=blueObject.dx;
        redObject.x+=redObject.dx;

        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(blueObject.image,blueObject.x,blueObject.y);
        context.drawImage(redObject.image,redObject.x,redObject.y);

        //console.log("redObject.redImageData.data[3]="+ redObject.redImageData.data[3]);
       // console.log("blueObject.blueImageData.data[3]="+ blueObject.blueImageData[3]);

        if(boundingBoxCollision(blueObject,redObject)){
            console.log("bounding box collide");

            var xMin=Math.max(blueObject.x,redObject.x);
            var yMin=Math.max(blueObject.y,redObject.y);
            var xMax=Math.min(blueObject.x+blueObject.width,redObject.x+redObject.width);
            var yMax=Math.min(blueObject.y+blueObject.height,redObject.y+redObject.height);

            for(var pixelX=xMin;pixelX<xMax;pixelX++){

                for(var pixelY=yMin;pixelY<yMax;pixelY++){
                    if(blueObject.dx==0)break;
                    var bluepixel=((pixelX-blueObject.x)+(pixelY-blueObject.y)*blueObject.width)*4+3;
                    var redpixel=((pixelX-redObject.x)+(pixelY-redObject.y)*blueObject.width)*4+3;

                    console.log("pixelX :"+pixelX+" pixelY :"+pixelY+" bluepixel :"+bluepixel+" redpixel: "+redpixel);
                    console.log("blueObject.x+blueObject.width: "+(blueObject.x+blueObject.width)+" blueObject.x= "+blueObject.x);
                    console.log("blueObject.x+blueObject.width: "+(redObject.x+redObject.width)+" blueObject.x= "+redObject.x);
                    console.log("pixelX-blueObject.x: "+(pixelX-blueObject.x)+" (pixelY-blueObject.y) :"+(pixelY-blueObject.y));
                    alert("hiii");
                    if((blueObject.blueImageData.data[bluepixel]!==0) && (redObject.redImageData.data[redpixel]!==0)){
                        console.log("pixel collision");
                        blueObject.dx=0;
                        redObject.dx=0;
                        break;
                    }
                }
            }


        }
    }

    function boundingBoxCollision(object1,object2){
        var left1=object1.x;
        var left2=object2.x;
        var right1=object1.x+object1.width;
        var right2=object2.x+object2.width;
        var top1=object1.y;
        var top2=object2.y;
        var bottom1=object1.y+object1.width;
        var bottom2=object2.y+object2.width;

        if(bottom1<top2) return (false);
        if(top1>bottom2) return (false);
        if(right1<left2) return (false);
        if(left1>right2) return (false);

        return(true);
    }


    function startUp(){
        gameLoop();
    }

    function gameLoop(){
        window.setTimeout(gameLoop,100);
        if(blueObject.dx!==0){
        drawScreen();
        }
    }
    startUp();

}


