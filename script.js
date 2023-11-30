const gameBoard = document.getElementById('game-board');
const gameBoardWidth = gameBoard.width; //1350
const gameBoardHeight = gameBoard.height; //585
const ctx = gameBoard.getContext('2d');

//because these values are used for two objects we can define them here
//also because it didnt work when i tried to do this:
//y: (gameBoard.height/2)-(leftPaddle.height/2)
var paddleHeight = 80;
var paddleWidth = 30;
var paddleVel = 3;

//bools for when the controlling keys are being pushed
//also stored in an object because it looks neat
var isPushing = {
    upL: false,
    downL: false,
    upR: false,
    downR: false
};

//objects are just containers with multiple variables of different types
//we can define the paddles and balls location and size in a single container very convenient
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
//but when it also updates every frame like the paddles, it won't

addEventListener("keydown", function movePaddleL(eL){
    //move left paddle
    if(eL.key == "w"){
        isPushing.upL = true;
    } else if(eL.key == "s"){
        isPushing.downL = true;
    }
})

addEventListener("keydown", function movePaddleR(eR){
    //move right paddle
    if(eR.key == "ArrowUp"){
        isPushing.upR = true;
    } else if(eR.key == "ArrowDown"){
        isPushing.downR = true;
    } 
})

//paddles stop moving when key is released
addEventListener('keyup', function(e){
    if(e.key == 'w'){
        console.log("released w");
        isPushing.upL = false;
    } else if(e.key == 's'){
        console.log("released s");
        isPushing.downL = false;
    } else if(e.key == 'ArrowUp'){
        console.log("released up");
        isPushing.upR = false;
    } else if(e.key == 'ArrowDown'){
        console.log("released down");
        isPushing.downR = false;
    }
})

function gameLoop(){
    //hitting ceiling or floor stops paddle
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
        console.log("hit ceiling");
    } else if(leftPaddle.y > 500){ //for some reason 500 works but not the value of gameBoardHeight (585) ?????
        leftPaddle.y = 500;
        console.log("hit floor");
    }
    
    if(rightPaddle.y < 0){
        rightPaddle.y = 0;
        console.log("hit ceiling");
    } else if(rightPaddle.y > 500){
        rightPaddle.y = 500;
        console.log("hit floor");
    }

    if(isPushing.upL == true){
        leftPaddle.y = leftPaddle.y - paddleVel;
        //parameters of clearRect() decide how much of the screen should be cleared
        //so if i divide the width by 2, it only clears half of it, i.e the left paddle
        ctx.clearRect(0, 0, gameBoard.width/2, gameBoard.height);
        ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    } else if(isPushing.downL == true){
        leftPaddle.y = leftPaddle.y + paddleVel;
        ctx.clearRect(0, 0, gameBoard.width/2, gameBoard.height);
        ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    } 
    if(isPushing.upR == true){
        rightPaddle.y = rightPaddle.y - paddleVel;
        //instead of dividing how much of the screen i can decide the start coordinate. which is the half point of the screen
        ctx.clearRect(gameBoardWidth/2, 0, gameBoard.width, gameBoard.height);
        ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    } else if(isPushing.downR == true){
        rightPaddle.y = rightPaddle.y + paddleVel;
        ctx.clearRect(gameBoardWidth/2, 0, gameBoard.width / 2, gameBoard.height);
        ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    }
}

setInterval(gameLoop, 10);