const gameBoard = document.getElementById('game-board'); //canvas element
const gameBoardWidth = gameBoard.width;
const gameBoardHeight = gameBoard.height;
const context = gameBoard.getContext('2d'); //get access to the 2d interface things
//because these values are used for two objects we can define them here
//also because it didnt work when i tried to do this:
//y: (gameBoard.height/2)-(leftPaddle.height/2)
var paddleHeight = 80;
var paddleWidth = 30;
var leftIsPushing = false;
var rightIsPushing = false;

//objects are just containers with multiple variables of different types
//we can define the paddles location and size in a single container
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

addEventListener("keydown", movePaddle);
addEventListener("keyup", stopMovingRight);
addEventListener("keyup", stopMovingLeft)

    function movePaddle(e){
        //move left paddle
            if(e.key == "w"){
                leftIsPushing = true;
                leftPaddle.y = leftPaddle.y - 5;
            //parameters of clearRect() decide how much of the screen should be cleared
            //so if i divide the width by 2, it only clears half of it, i.e the left paddle
                context.clearRect(0, 0, gameBoard.width / 2, gameBoard.height);
                context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
                console.log(leftPaddle.y);
            } else if(e.key == "s"){
                leftPaddle.y = leftPaddle.y + 5;
                context.clearRect(0, 0, gameBoard.width / 2, gameBoard.height);
                context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
            }    
        //move right paddle
        if(rightIsPushing == true){
            if(e.key == "ArrowUp"){
                rightPaddle.y = rightPaddle.y - 5;
                //instead of dividing how much of the screen i can decide the start coordinate. which is the half point of the screen
                context.clearRect(gameBoardWidth/2, 0, gameBoard.width, gameBoard.height);
                context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
                console.log(e.key);
            } else if(e.key == "ArrowDown"){
                rightPaddle.y = rightPaddle.y + 5;
                context.clearRect(gameBoardWidth/2, 0, gameBoard.width / 2, gameBoard.height);
                context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
            }    
        }
    }

    function stopMovingRight(e){
        rightIsPushing = false;
    }
    function stopMovingLeft(e){
        leftIsPushing = false;
    }

//because the two functions are almost identical i wonder if theres a way to combine them into one

