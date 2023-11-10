const gameBoard = document.getElementById('game-board'); //canvas element
const context = gameBoard.getContext('2d'); //get access to the 2d interface things
//because these values are used for two objects we can define them here
//also because it didnt work when i tried to do this:
//y: (gameBoard.height/2)-(leftPaddle.height/2)
var paddleHeight = 80;
var paddleWidth = 30;

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