
window.addEventListener("load",eventWindowLoaded,false);

function eventWindowLoaded(){
    canvasApp();
}
function canvasApp(){

    var canvas;
    canvas = document.getElementById("nova-game");
    var context;
    context = canvas.getContext("2d");
    var color="black";
    var message="";
    var fillOrStoke="fill";
    var selectedElement=document.getElementById("fillOrStroke");
    var colorElement=document.getElementsByClassName("coor");
    colorElement.addEventListener("change",changingColor,false);
    function changingColor(e){
        var target= e.target;
        color=target.value;
        drawScreen();
    }
    selectedElement.addEventListener("change",fillOrStrokeChanged,false);
    function fillOrStrokeChanged(e){
        var target= e.target;
        fillOrStoke= target.value;

        drawScreen();
    }
    var formeElement=document.getElementById("textBox");
    formeElement.addEventListener("keyup",textBoxChanged,false);

    function textBoxChanged(e){

        var target= e.target;
        message=target.value;

        drawScreen();
    }
    function drawScreen() {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle=color;
        context.strokeStyle="black";
        context.beginPath();
        context.lineWidth=60;
        context.moveTo(50,100);
        context.lineTo(600,100);
        context.stroke();
        context.closePath();
        context.textBaseline="top";
        context.font="30px Sans-Serif";

        var metrics=context.measureText(message);
        var textWidth=metrics.width;
        var positionX=canvas.width/2 - textWidth/2;
        switch (fillOrStoke){
            case "fill":

                context.fillText(message,positionX,100);

                break;
            case "stroke":
                context.strokeText(message,positionX,100);

                break;
            case "both":

                context.strokeStyle="black";
                context.fillText(message,positionX,100);
                context.strokeText(message,positionX,100);
                break;
            default : alert("ERRO:"+fillOrStoke);
        }
    }

}