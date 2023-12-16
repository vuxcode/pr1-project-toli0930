console.clear();

const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext('2d');
var ding = new Audio('ding.wav');
var yay = new Audio('yay.mp3');
var miss = new Audio('miss.wav');
var gameSpeed = 25; //game runs every gameSpeed milliseconds

//paddle variables
var paddleHeight = 120;
var paddleWidth = 30;
var paddleVel = 10;
var distanceFromSide = 40;
var shrinkPaddle = 20;

//player score
var leftScore = 0;
var rightScore = 0;

//ball variables
var ballSize = 20;
var ballVel = 9;

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
});

//what happens when someone wins
function resetVariables(){
    //theres 100% a better way to do this but i do not know of it
    leftPaddle.y = (gameBoard.height/2)-(paddleHeight/2);
    rightPaddle.y = (gameBoard.height/2)-(paddleHeight/2);
    leftPaddle.height = paddleHeight;
    rightPaddle.height = paddleHeight;
    ball.x = gameBoard.width/2;
    ball.y = gameBoard.height/2;
    ballVel = 9;
    ball.xDir = ballVel;
    ball.yDir = -ballVel;
    leftScore = 0;
    rightScore = 0;
    isPushing.upL = false;
    isPushing.downL = false;
    isPushing.upR = false;
    isPushing.downR = false;
}

function winMessage(winner){
    if(leftPaddle.height == 0){
        winner = "LEFT";
    } else if(rightPaddle.height == 0){
        winner = "RIGHT";
    } else {
        return; //WHY DO I NEED THIS FOR THE FUNCTION TO NOT RUN TWICE?
    }
    yay.play();
    alert(winner+" WINS!");
    alert("PLAY AGAIN?");
    resetVariables();
}

//everything within this is meant to run every gameSpeed milliseconds
function gameLoop(){
    //display win message
    if(leftPaddle.height == 0 || rightPaddle.height == 0){
        setTimeout(winMessage, 60);
    }

    //clear and draw paddles and ball again every frame
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
    ctx.fillStyle = "rgb(255, 155, 155)";
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillStyle = "rgb(151, 196, 255)";
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    ctx.fillStyle = "white";
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
        ding.play();
    }

    //hitting paddle makes ball reverse x value and shrinks paddle
    if((ball.x==rightPaddle.x && ball.y>rightPaddle.y && ball.y<(rightPaddle.y+rightPaddle.height))){
        ball.xDir *= -1;
        ding.play();
        rightPaddle.height -= shrinkPaddle;
    }
    if(ball.x==(leftPaddle.x+leftPaddle.width) && ball.y>leftPaddle.y && ball.y<(leftPaddle.y+leftPaddle.height)){
        ball.xDir *= -1;
        ding.play();
        leftPaddle.height -= shrinkPaddle;
    }

    //if ball goes out of screen
    if(ball.x>gameBoard.width || ball.x<0){
        miss.play();
        ball.x = gameBoard.width/2;
        ball.y = gameBoard.height/2;
        ball.xDir *= -1;
    }
}

//run the game
setInterval(gameLoop, gameSpeed);
