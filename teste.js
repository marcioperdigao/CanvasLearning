/**
 * Created by Nonato on 02/07/2015.
 */
window.onload=function(){
    canvasApp();
}
var Debugger=function(){};
Debugger.log=function(message){
    try{
        console.log(message);

    }catch(exception){
        return;
    }
}
function canvasApp(){
    drawScreen();

    function drawScreen(){

        var canvas=document.getElementById("nova-game");
        if(!canvas.getContext) alert("erro, no context");
        var context=canvas.getContext("2d");
        Debugger.log("Drawing  Canvas");
        context.fillStyle="#ffffaa";
        context.fillRect(0,0,500,300);
        context.fillStyle="#000000";
        context.font="20px Sans-Serif";
        context.baseline="top";
        context.fillText("Hello World",195,80);

        var helloWorldImage=new Image();
        helloWorldImage.onload=function(){
            context.drawImage(helloWorldImage,220,110);
        };
        helloWorldImage.src="./img/watchmen.gif";

        context.strokeStyle="#000000";
        context.strokeRect(5,5,490,290);

    }
}