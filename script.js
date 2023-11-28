const gameBoard = document.getElementById('game-board'); //canvas element
const gameBoardWidth = gameBoard.width; //1350
const gameBoardHeight = gameBoard.height; //585
const context = gameBoard.getContext('2d'); //get access to the 2d interface things

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

//and then draw them using the objects variables
context.fillStyle = 'white';
context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

//and later somehow define the logic for how they move
//and redraw it every frame
//we need to manipulate the values of leftPaddle.y and rightPaddle.y in a function and run the function every frame

addEventListener("keydown", function movePaddle(e){
    //move left paddle
    if(e.key == "w"){
        upLeftIsPush = true;
        if(upLeftIsPush == true){
            leftPaddle.y = leftPaddle.y - 5;
            //parameters of clearRect() decide how much of the screen should be cleared
            //so if i divide the width by 2, it only clears half of it, i.e the left paddle
            //but wouldnt that clear the ball too, later? i guess well find out
            context.clearRect(0, 0, gameBoard.width/2, gameBoard.height);
            context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        }
    } else if(e.key == "s"){
        downLeftIsPush = true;
        if(downLeftIsPush == true){
            leftPaddle.y = leftPaddle.y + 5;
            context.clearRect(0, 0, gameBoard.width/2, gameBoard.height);
            context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        }
    }
    //move right paddle
    if(e.key == "ArrowUp"){
        upRightIsPush = true;
        if(upRightIsPush == true){
            rightPaddle.y = rightPaddle.y - 5;
            //instead of dividing how much of the screen i can decide the start coordinate. which is the half point of the screen
            context.clearRect(gameBoardWidth/2, 0, gameBoard.width, gameBoard.height);
            context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
        }
    } else if(e.key == "ArrowDown"){
        downRightIsPush = true;
        if(downRightIsPush == true){
            rightPaddle.y = rightPaddle.y + 5;
            context.clearRect(gameBoardWidth/2, 0, gameBoard.width / 2, gameBoard.height);
            context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
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
    } else if(leftPaddle.y > 500){ //for some reason 500 works instead of the value of gameBoardHeight (585) ?????
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

