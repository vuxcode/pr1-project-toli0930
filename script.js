const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext('2d');

//paddle variables
var paddleHeight = 80;
var paddleWidth = 30;
var paddleVel = 3;
var distanceFromSide = 40;

//ball variables
var ballSize = 20;
var ballVel = 2;

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

//activate movement bools
addEventListener("keydown", function movePaddle(e){
    if(e.key == "w"){
        isPushing.upL = true;
    } else if(e.key == "s"){
        isPushing.downL = true;
    }
    if(e.key == "ArrowUp"){
        isPushing.upR = true;
    } else if(e.key == "ArrowDown"){
        isPushing.downR = true;
    } 
})
//deactivate movement bools
addEventListener('keyup', function stopPaddle(e){
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
    //control the paddles based on the bools we activated
    if(isPushing.upL == true){
        leftPaddle.y = leftPaddle.y - paddleVel;
    } else if(isPushing.downL == true){
        leftPaddle.y = leftPaddle.y + paddleVel;
    } 
    if(isPushing.upR == true){
        rightPaddle.y = rightPaddle.y - paddleVel;
    } else if(isPushing.downR == true){
        rightPaddle.y = rightPaddle.y + paddleVel;
    }
    //move ball by updating ball coordinates with 5
    ball.x += ballVel;
    ball.y += -ballVel;
    //clear and draw paddles and ball again every frame
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    //hitting ceiling or floor stops paddle
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if(leftPaddle.y > gameBoard.height-paddleHeight){//i get why i need to subtract 80 now, its because of the height of the paddle
        leftPaddle.y = gameBoard.height-paddleHeight;
    }
    if(rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if(rightPaddle.y > gameBoard.height-paddleHeight){
        rightPaddle.y = gameBoard.height-paddleHeight;
    }

    //hitting ceiling or floor makes ball reverse y value
    if(ball.y < 0){
        ball.y = -ballVel;
    } else if(ball.y > gameBoard.height-ball.size){
        ball.y = -ballVel;
    }
}

//runs game
setInterval(gameLoop, 10);