const gameBoard = document.getElementById('game-board');
const gameBoardWidth = gameBoard.width; //1350
const gameBoardHeight = gameBoard.height; //585
const ctx = gameBoard.getContext('2d');

//because these values are used for two objects we can define them here
//also because it didnt work when i tried to do this:
//y: (gameBoard.height/2)-(leftPaddle.height/2)
var paddleHeight = 80;
var paddleWidth = 30;

//bools for when the controlling keys are being pushed
var upLeftIsPush = false;
var downLeftIsPush = false;
var upRightIsPush = false;
var downRightIsPush = false;

//objects are just containers with multiple variables of different types
//we can define the paddles location and size in a single container very convenient
const leftPaddle = {
    x: 40, 
    y: (gameBoard.height/2)-(paddleHeight/2), //needs subtraction to be symmetrically in middle  
    width: paddleWidth,
    height: paddleHeight,
};
const rightPaddle = {
    x: gameBoard.width-65,
    y: (gameBoard.height/2)-(paddleHeight/2),
    width: paddleWidth,
    height: paddleHeight,  
};
const ball = {
    x: gameBoardWidth/2,
    y: gameBoardHeight/2,
    width: 20,
    height: 20
}

//and then draw them using the objects variables
ctx.fillStyle = 'white';
ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

//ball just disappears for now because of clearRect
//but when it also updates every frame, it won't

addEventListener("keydown", function movePaddle(e){
    //move left paddle
    if(e.key == "w"){
        upLeftIsPush = true;
        if(upLeftIsPush == true){
            leftPaddle.y = leftPaddle.y - 5;
            //parameters of clearRect() decide how much of the screen should be cleared
            //so if i divide the width by 2, it only clears half of it, i.e the left paddle
            //but wouldnt that clear the ball too, later? i guess well find out
            ctx.clearRect(0, 0, gameBoard.width/2, gameBoard.height);
            ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        }
    } else if(e.key == "s"){
        downLeftIsPush = true;
        if(downLeftIsPush == true){
            leftPaddle.y = leftPaddle.y + 5;
            ctx.clearRect(0, 0, gameBoard.width/2, gameBoard.height);
            ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        }
    }
    //move right paddle
    if(e.key == "ArrowUp"){
        upRightIsPush = true;
        if(upRightIsPush == true){
            rightPaddle.y = rightPaddle.y - 5;
            //instead of dividing how much of the screen i can decide the start coordinate. which is the half point of the screen
            ctx.clearRect(gameBoardWidth/2, 0, gameBoard.width, gameBoard.height);
            ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
        }
    } else if(e.key == "ArrowDown"){
        downRightIsPush = true;
        if(downRightIsPush == true){
            rightPaddle.y = rightPaddle.y + 5;
            ctx.clearRect(gameBoardWidth/2, 0, gameBoard.width / 2, gameBoard.height);
            ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
        }
    } 
})

//paddles stop moving when key is released
//i guess the reason this doesn't work is because it considers going to a different key to also be keyup
//i understand the idea of adding the keys to an array instead, i just don't know how to write it syntax-wise
addEventListener('keyup', function(e){
    if(e.key == 'w' || e.key == 's'){
        upLeftIsPush = false;
        downLeftIsPush = false;
    } else if(e.key == 'ArrowUp' || e.key == 'ArrowDown'){
        upRightIsPush = false;
        downRightIsPush = false;
    }
})

function gameLoop(){
    //hitting ceiling or floor stops paddle
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if(leftPaddle.y > 500){ //for some reason 500 works but not the value of gameBoardHeight (585) ?????
        leftPaddle.y = 500;
        console.log("hit floor");
    } else if(rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if(rightPaddle.y > 500){
        rightPaddle.y = 500;
        console.log("hit floor");
    }
}

setInterval(gameLoop, 10);

//to move the paddles simultaneously we can create an empty array and add the currently held keys to it
//if array contains key move paddle
