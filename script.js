const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext('2d');

//paddle variables
var paddleHeight = 80;
var paddleWidth = 30;
var paddleVel = 3;
var distanceFromSide = 40;

//ball variables
var ballSize = 20;
var ballVel = 5;

//bools for when the controlling keys are being pushed
//also stored in an object because it looks neat
var isPushing = {
    upL: false,
    downL: false,
    upR: false,
    downR: false
};

//paddle and ball objects
const leftPaddle = {
    x: distanceFromSide, 
    y: (gameBoard.height/2)-(paddleHeight/2), //needs subtraction to be symmetrically in middle  
    width: paddleWidth,
    height: paddleHeight
};
const rightPaddle = {
    x: gameBoard.width-(distanceFromSide+paddleWidth),
    y: (gameBoard.height/2)-(paddleHeight/2),
    width: paddleWidth,
    height: paddleHeight
};
const ball = {
    x: gameBoard.width/2,
    y: gameBoard.height/2,
    size: ballSize
}

//and then draw them using the objects variables
ctx.fillStyle = 'white';
ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

//ball just disappears for now because of clearRect
//but when it also updates every frame like the paddles, it won't

addEventListener("keydown", function movePaddleL(e){
    //move left paddle
    if(e.key == "w"){
        isPushing.upL = true;
    } else if(e.key == "s"){
        isPushing.downL = true;
    }
})

addEventListener("keydown", function movePaddleR(e){
    //move right paddle
    if(e.key == "ArrowUp"){
        isPushing.upR = true;
    } else if(e.key == "ArrowDown"){
        isPushing.downR = true;
    } 
})

//paddles stop moving when key is released
addEventListener('keyup', function(e){
    if(e.key == 'w'){
        isPushing.upL = false;
    } else if(e.key == 's'){
        isPushing.downL = false;
    } else if(e.key == 'ArrowUp'){
        isPushing.upR = false;
    } else if(e.key == 'ArrowDown'){
        isPushing.downR = false;
    }
})

function gameLoop(){
    //hitting ceiling or floor stops paddle
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if(leftPaddle.y > gameBoard.height-80){ //i don't understand why it's not correct unless i subtract the height a bit
        leftPaddle.y = gameBoard.height-80;
    }
    if(rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if(rightPaddle.y > gameBoard.height-80){
        rightPaddle.y = gameBoard.height-80;
    }

    //control the paddles
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
        ctx.clearRect(gameBoard.width/2, 0, gameBoard.width, gameBoard.height);
        ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    } else if(isPushing.downR == true){
        rightPaddle.y = rightPaddle.y + paddleVel;
        ctx.clearRect(gameBoard.width/2, 0, gameBoard.width / 2, gameBoard.height);
        ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    }
}

//runs game
setInterval(gameLoop, 10);