console.clear();

const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext('2d');

//paddle variables
var paddleHeight = 130;
var paddleWidth = 30;
var paddleVel = 4;
var distanceFromSide = 40;

//player score
var leftScore = 0;
var rightScore = 0;

//ball variables
var ballSize = 20;
var ballVel = 3.0;
var accelerateBall = 1.1;

//bools for when the controlling keys are being pushed
var isPushing = {
    upL: false,
    downL: false,
    upR: false,
    downR: false
};

//paddle and ball objects
var leftPaddle = {
    x: distanceFromSide, 
    y: (gameBoard.height/2)-(paddleHeight/2), //needs subtraction to be symmetrically in middle  
    width: paddleWidth,
    height: paddleHeight
};
var rightPaddle = {
    x: gameBoard.width-(distanceFromSide+paddleWidth),
    y: (gameBoard.height/2)-(paddleHeight/2),
    width: paddleWidth,
    height: paddleHeight
};
var ball = {
    x: gameBoard.width/2,
    y: gameBoard.height/2,
    size: ballSize,
    xDir: ballVel,
    yDir: -ballVel
}

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
    } 
    if(e.key == 'ArrowUp'){
        isPushing.upR = false;
    } else if(e.key == 'ArrowDown'){
        isPushing.downR = false;
    }
})

function gameLoop(){
    //clear and draw paddles and ball again every frame
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    //control the paddles based on the bools we activated
    if(isPushing.upL == true){
        leftPaddle.y = leftPaddle.y-paddleVel;
    } else if(isPushing.downL == true){
        leftPaddle.y = leftPaddle.y+paddleVel;
    } 
    if(isPushing.upR == true){
        rightPaddle.y = rightPaddle.y-paddleVel;
    } else if(isPushing.downR == true){
        rightPaddle.y = rightPaddle.y+paddleVel;
    }

    //hitting ceiling or floor stops paddle
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if(leftPaddle.y > gameBoard.height-leftPaddle.height){//subtract the paddle height to define the correct coordinate
        leftPaddle.y = gameBoard.height-leftPaddle.height;
    }
    if(rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if(rightPaddle.y > gameBoard.height-rightPaddle.height){
        rightPaddle.y = gameBoard.height-rightPaddle.height;
    }

    //move ball by updating ball coordinates with whatever value i set as the velocity
    ball.x += ball.xDir;
    ball.y -= ball.yDir;

    //hitting ceiling or floor makes ball reverse y value
    if(ball.y<0 || ball.y>gameBoard.height-ball.size){
        ball.yDir *= -1;
    }

    //hitting paddle makes ball reverse x value and speed up a little bit
    if((ball.x==rightPaddle.x && ball.y>rightPaddle.y && ball.y<(rightPaddle.y+rightPaddle.height))){
        ball.xDir *= -1;
        rightPaddle.height -= 5;
    }
    if(ball.x==(leftPaddle.x+leftPaddle.width) && ball.y>leftPaddle.y && ball.y<(leftPaddle.y+leftPaddle.height)){
        ball.xDir *= -1;
        leftPaddle.height -= 5;
    }

    //if ball goes out of screen, reset its position to where it was originally, swap direction and update score
    if(ball.x>gameBoard.width){
        ball.x = gameBoard.width/2;
        ball.y = gameBoard.height/2;
        ball.xDir *= -1;
        leftScore++;
        console.log("left scored "+leftScore);
    }
    if(ball.x<0){
        ball.x = gameBoard.width/2;
        ball.y = gameBoard.height/2;
        ball.xDir *= -1;
        rightScore++;
        console.log("right scored "+rightScore);
    }
}

//runs game
setInterval(gameLoop, 10);