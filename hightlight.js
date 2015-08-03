
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){

    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");
    var mouseX;
    var mouseY;

    var tileSheet=new Image();
    tileSheet.addEventListener("load",eventSheetLoaded,false);
    tileSheet.src="img/tanks_sheet.png";
    var imageData=context.createImageData(32,32);
    function eventSheetLoaded(){
        startUp();
    }
    function startUp(){
        context.fillStyle="#aaaaaa";
        context.fillRect(0,0,250,250);
        drawTileSheet();
    }
    function drawTileSheet(){
        context.drawImage(tileSheet,0,0);
    }
    function hightlightTile(tileId,x,y){
        context.fillStyle="#aaaaaa";
        context.fillRect(0,0,256,128);
        drawTileSheet();
        imageData=context.getImageData(x,y,32,32);
        for(j=3;j<imageData.data.length;j+=4){
            imageData.data[j]=33;
        }
        var startX=Math.floor(tileId%8)*32;
        var startY=Math.floor(tileId/8)*32;
        context.strokeStyle="red";
        context.strokeRect(startX,startY,32,32);
    }
    function onMouseMove(e){
        mouseX= e.clientX-canvas.offsetLeft;
        mouseY= e.clientY-canvas.offsetTop;

    }

    function onMouseClick(e){
        console.log("click: " +mouseX+","+mouseY);
        if(mouseY<128){
            var col=Math.floor(mouseX/32);
            var row=Math.floor(mouseY/32);
            var tileId=(row*7)+(col+row);
            hightlightTile(tileId,col*32,row*32);
        }
        else{
            var col=Math.floor(mouseX/32);
            var row=Math.floor(mouseY/32);

            context.putImageData(imageData,col*32,row*32);
        }
    }
    canvas.addEventListener("mousemove",onMouseMove,false);
    canvas.addEventListener("click",onMouseClick,false);

}


