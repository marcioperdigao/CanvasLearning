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
    //aplication states
    const GAME_STATE_TITLE=0;
    const GAME_STATE_NEW_GAME=1;
    const GAME_STATE_NEW_LEVEL=2;
    const GAME_STATE_PLAYER_START=3;
    const GAME_STATE_PLAY_LEVEL=4;
    const GAME_STATE_PLAYER_DIE=5;
    const GAME_STATE_GAME_OVER=6;
    var currentGameState=0;
    var currentGameStateFunction=null;

    //title screen
    var titleStated=false;

    //gameover screen
    var gameOverStarted=false;

    //objects for game player

    //game environment
    var score=0;
    var level=0;
    var extraShipAtEach=10000;
    var extraShipEarned=0;
    var playerShips=3;

    //playField
    var xMin=0;
    var xMax=400;
    var yMin=0;
    var yMax=400;

    //scoreValues
    var bigRockScore=50;
    var medRockScore=75;
    var smlRockScore=100;
    var saucerScore=300;

    //rock scale constants
    const ROCK_SCALE_LARGE=1;
    const ROCK_SCALE_MEDIUM=2;
    const ROCK_SCALE_SMALL=3;

    //create game objects and arrays
    var player={};
    var rocks=[];
    var saucers=[];
    var playerMissiles=[];
    var particles=[];
    var saucerMissiles=[];

    //level specific
    var levelRockMasSpeedAdjust=1;
    var levelSaucerMax=1;
    var levelSaucerOccurenceRate=25;
    var levelSaucerSpeed=1;
    var levelSaucerFireDelay=300;
    var levelSaucerFireRate=30;
    var levelSaucerMissileSpeed=1;

    function runGame(){
        currentGameStateFunction();
    }

    function switchGameState(newState){
        currentGameState=newState;
        switch (currentGameState){
            case GAME_STATE_TITLE:
                currentGameStateFunction=gameStateTitle;
                break;
            case GAME_STATE_NEW_GAME:
                currentGameStateFunction=gameStateNewGame();
                break;
            case GAME_STATE_NEW_LEVEL:
                currentGameStateFunction=gameStateNewLevel();
                break;
            case GAME_STATE_PLAYER_START:
                currentGameStateFunction=gameStatePlayerStart();
                break;
            case GAME_STATE_PLAY_LEVEL:
                currentGameStateFunction=gameStatePlayLevel();
                break;

        }
    }

    function gameStateTitle(){
        if(titleStated!=true){
            fillBackground();
            setTextStyle();
            context.fillText("Geo Blaster By Perdigao",130,70);
            context.fillText("Press Space To Play",120,140);

            titleStated=true;
        }
        else{
            //wait for space click
            if(keyPressList[32]==true){
                console.log("space presssed");
                switchGameState(GAME_STATE_NEW_GAME);
                titleStated=false;
            }
        }
    }

    function  gameStateNewGame(){
        console.log("New Game");
        //setup new game
        level=0;
        score=0;
        playerShips=3;
        player.maxVelocity=5;
        player.width=20;
        player.height=20;
        player.halfWidth=10;
        player.halfHeight=10;
        player.rotationalVelocity=5;
        player.thrustAcceleration=0.05;
        player.misseleFrameDelay=5;
        player.thrust=false;

        fillBackground();
        renderScoreBoard();
        switchGameState(GAME_STATE_NEW_LEVEL);
    }

    function gameStateNewLevel(){
        rocks=[];
        saucers=[];
        playerMissiles=[];
        particles=[];
        saucerMissiles=[];
        level++;
        levelRockMasSpeedAdjust=level*.25;
        if(levelRockMasSpeedAdjust>3){
            levelRockMasSpeed=3;
        }
        levelSaucerMax=1+Math.floor(level/10);
        if(levelSaucerMax>5){
            levelSaucerMax=5;
        }
        levelSaucerOccurenceRate=10+3*level;
        if(levelSaucerOccurenceRate>32){
            levelSaucerOccurenceRate=32;
        }
        levelSaucerSpeed=1+5*level;
        if(levelSaucerSpeed>5){
            levelSaucerSpeed=5;
        }
        levelSaucerFireDelay=120-10*level;
        if(levelSaucerFireDelay<20){
            levelSaucerFireDelay=20;
        }
        levelSaucerFireRate=20+3*level;
        if(levelSaucerFireRate<50){
            levelSaucerFireRate=50;
        }
        levelSaucerMissileSpeed=1+.2*level;
        if(levelSaucerMissileSpeed>4){
            levelSaucerMissileSpeed=4;
        }

        //create level rocks
        for(var newRockctr=0;newRockctr<level+3;newRockctr++){
            var newRock={};
            newRock.scale=1;
            //scale
            //1=large
            //2=medium
            //3=small
            //these will be used as the devisor for the new size
            //50/1=50
            //50/2=25
            //50/3=16
            newRock.width=50;
            newRock.height=50;
            newRock.halfWidth=25;
            newRock.halfHeight=25;

            //start all new rocks in upper left for ship safety
            newRock.x=Math.floor(Math.random()*50);
            newRock.y=Math.floor(Math.random()*50);
            newRock.dx=(Math.random())*2+levelRockMasSpeedAdjust;
            if(Math.random()<.5){
                newRock.dx*=-1;
            }
            newRock.dy=(Math.random())*2+levelRockMasSpeedAdjust;
            if(Math.random()<.5){
                newRock.dx*=-1;
            }
            //rotation speed and direction
            newRock.rotationInc=(Math.random()*5)+1;
            if(Math.random()<0.5){
                newRock.rotationInc*=-1;
            }
            newRock.scoreValue=bigRockScore;
            newRock.rotation=0;

            rocks.push(newRock);
        }

        resetPlayer();
        switchGameState(GAME_STATE_PLAYER_START);


    }

    function gameStatePlayerStart(){
        fillBackground();
        renderScoreBoard();
        if(player.alpha<1){
            player.alpha+=.02;
            context.globalAlpha=player.alpha;
        }
        else{
            switchGameState(GAME_STATE_PLAY_LEVEL);
        }
        renderPlayerShip(player.x,player.y,270,1);
        context.globalAlpha=1;
        updateRocks();
        renderRocks();
    }

    function gameStatePlayLevel(){
        checkKeys();
        update();
    }
    function update(){
        updatePlayerMissile();
    }
    function updatePlayerMissile(){
        var tempPlayerMissile={};
        var playerMissileLenght=playerMissiles.length;
        for(var playerMissileCtr=playerMissileLenght;playerMissileCtr>=0;playerMissileCtr++){
            tempPlayerMissile=playerMissiles[playerMissileCtr];
        }
    }

    function checkKeys(){
        if(keyPressList[38]==true){
            //thrust
            var angleInRadians=player.rotation*Math.PI/180;
            player.facingX=Math.cos(angleInRadians);
            player.facingY=Math.sin(angleInRadians);

            var MovingXNew=player.movingX+player.thrustAcceleration*player.facingX;
            var MovingYNew=player.movingY+player.thrustAcceleration*player.facingY;
            var currentVelocity=Math.sqrt(MovingXNew*MovingXNew+MovingYNew*MovingYNew);

            if(currentVelocity<player.maxVelocity){
                player.movingX=MovingXNew;
                player.movingY=MovingYNew;
            }
            player.thrust=true;
        }
        else player.thrust=false;

        if(keyPressList[37]==true){
            //rotate counterclockwise
            player.rotation-=player.rotationalVelocity;
        }
        if(keyPressList[39]==true){
            player.rotation+=player.rotationalVelocity;
        }
        if(keyPressList[32]==true){
            if(player.missileFrameCount>player.misseleFrameDelay){
                firePlayerMissile();
                player.missileFrameCount=0;
            }
        }
    }
    function firePlayerMissile(){
        var newPlayerMissile={};
        newPlayerMissile.dx=5*Math.cos(Math.PI*(player.rotation)/180);
        newPlayerMissile.dy=5*Math.sin(Math.PI*(player.rotation)/180);
        newPlayerMissile.x=player.x+player.halfWidth;
        newPlayerMissile.y=player.y+player.halfHeight;
        newPlayerMissile.life=60;
        newPlayerMissile.lifeCtr=0;
        newPlayerMissile.width=2;
        newPlayerMissile.height=2;
        playerMissiles.push(newPlayerMissile);

    }

    function updateRocks(){
        var tempRock={};
        var rocksLenght=rocks.length-1;
        for(var rockCtr=rocks.length;rockCtr>=0;rockCtr--){
            tempRock=rocks[rockCtr];
            tempRock.x+=tempRock.dx;
            tempRock.y+=tempRock.dy;
            tempRock.rotation+=tempRock.rotationInc;
            if(tempRock.x>xMax){
                tempRock.x=xMin-tempRock.width;
            }
            else if(tempRock.x<xMin-tempRock.width){
                tempRock.x=xMax;
            }
            if(tempRock.y>yMax){
                tempRock.y=yMin-tempRock.height;
            }
            else if(tempRock.y<yMin-tempRock.height){
                tempRock.y=yMax;
            }
        }
    }

    function renderRocks(){
        var tempRock={};
        var rocksLenght=rocks.length-1;
        for(var rockCtr=rocksLenght;rockCtr>=0;rockCtr--){
            tempRock=rocks[rockCtr];
            var angleRadians=tempRock.rotation*Math.PI/180;

            context.save();
            context.setTransform(1,0,0,1,0,0);
            context.translate(tempRock.x+tempRock.halfWidth,tempRock.y+tempRock.halfHeight);
            context.rotate(angleRadians);
            context.strokeStyle="#ffffff";
            context.beginPath();
            context.moveTo(-(tempRock.halfWidth-1),-(tempRock.halfHeight));
            context.lineTo((tempRock.halfWidth-1),-(tempRock.halfHeight));
            context.lineTo((tempRock.halfWidth-1),(tempRock.halfHeight));
            context.lineTo(-(tempRock.halfWidth-1),-(tempRock.halfHeight));
            context.lineTo(-(tempRock.halfWidth-1),-(tempRock.halfHeight));

            context.stroke();
            context.closePath();
            context.restore();
        }
    }

    function resetPlayer(){
        player.rotation=270;
        player.x=.5*xMax;
        player.y=.5*yMax;
        player.facingX=0;
        player.facingY=0;
        player.movingX=0;
        player.movingY=0;
        player.alpha=0;
        player.missileFrameCount=0;
    }



    function renderScoreBoard(){
        context.fillStyle="#ffffff";
        context.fillText('Score'+score,10,20);
        renderPlayerShip(200,16,270,.75);
        context.fillText("X "+playerShips,220,20);
        context.fillText("FPS",+frameRateCounter.lastFrameCount,300,20);
    }

    function renderPlayerShip(x,y,rotation,scale){
        //Transformation
        var angleInRadians=rotation*Math.PI/180;
        context.save();//save current state in stack
        context.setTransform(1,0,0,1,0,0);//reset to identity

        //translate the new canvas origin to the center of player
        context.translate(x+player.halfWidth,y+player.halfHeight);
        context.rotate(angleInRadians);
        context.scale(scale,scale);

        //drawShip
        context.stokeStyle="#ffffff";
        context.beginPath();

        //hard coding in locations
        //facing right
        context.moveTo(-10,-10);
        context.lineTo(10,0);
        context.moveTo(10,1);
        context.lineTo(-10,10);
        context.lineTo(1,1);
        context.moveTo(1,-1);
        context.lineTo(-10,-10);

        if(player.thrust==1 && scale==1){
            //check scale ==1 for ship indicator does not display with thrust
            context.moveTo(-4,-2);
            context.lineTo(-4,1);
            context.moveTo(-5,-1);
            context.lineTo(-10,-1);
            context.moveTo(-5,0);
            context.lineTo(-10,0);
        }
        context.stroke();
        context.closePath();

        //restore Context
        context.restore();//pop old context to screen
    }

    function fillBackground(){
        //Draw Background and text
        context.fillStyle="#000000";
        context.fillRect(xMin,yMin,xMax,yMax);
    }
    function setTextStyle(){
        context.fillStyle="#ffffff";
        context.fillText('15px,sans-serif');
        context.textBaseline='top';
    }


    function drawScreen(){

        //check key

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

    document.onkeydown=function(e){
        e=e? e:window.event;
        keyPressList[e.keyCode]=true;
    };
    document.onkeyup=function(e){
        e=e?e: window.event;
        keyPressList[e.keyCode]=false;
    };

    //***aplication start here
    switchGameState(GAME_STATE_TITLE);
    frameRateCounter=new FrameRateCounter();


    gameLoop();

    function gameLoop(){
        runGame();
        window.setTimeout(gameLoop,intervalTime);
    }

    function FrameRateCounter(){
        this.lastFrameCount=0;
        var dateTemp=new Date();
        this.frameLast=dateTemp.getTime();
        delete dateTemp;
        this.frameCtr=0;
    }

    FrameRateCounter.prototype.countFrames=function(){
        var dateTemp=new Date();
        this.frameCtr++;
        if(dateTemp.getTime()>this.frameCtr+1000){
            this.lastFrameCount=this.frameCtr;
            this.frameLast=dateTemp.getTime();
            this.frameCtr=0;
        }
        delete dateTemp;
    }


}