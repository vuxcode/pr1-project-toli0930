# Time Report

> Write about what you have done and how long you have worked on each part of the project.


before 30/11-2023 because I didn't notice the time-report.md file existed before:

I have been busy with other courses, but what I've been doing trying to do so far is to go online and download the code of different already existing Pong projects, to dissect how they work.
I have realized Pong is a lot more complicated than first assumed, with HTML/CSS/JS not being a game engine. I have gotten Pong to work on Unity in the past,
but with JS it's less visual and you have to write more things from scratch, such as drawing the shapes.
You can take the approach of drawing shapes using canvas, or with CSS. I don't know which is simpler, but I'm going with canvas for now, using fillRect() to draw the shapes.
The first step to accomplish should probably be to move the paddles with WASD and arrow keys.

I have also learned of 'defer', which can be added to the src element of the HTML. I've noticed the code and HTML can't always 'see' each other depending on when they're loaded. Defer seems to get around this by fully processing the page before executing the code, which is good.

I noticed I can't use the variables inside objects within the objects. I tried to do this:
const leftPaddle = {
    height: 80,
    y: (gameBoard.height/2)-(leftPaddle.height/2), //needs subtraction to be symmetrically in middle  
};
and even with having them in this order, it didn't work.
But it's probably better practice to define values of the height and width at the top either way, especially since were reusing the same values for the rightPaddle.

I've also noticed it uses PEMDAS so the parantheses in the operation isn't needed, but it looks cleaner to me.


30/11-2023:
Yesterday, I got the paddles to move the way I want them. May not be perfect code, but for now, I'm just aiming for it to work at all. It's time to learn how to make the ball move.

I realized that there's no real difference (in this case) between creating "loose" variables vs storing them in objects. Meaning I could remove the paddle and ball objects and instead just make them variables called rightPaddleX and so on. I think the objects look cleaner, though, so I stored the isPushing bools inside an object too.

3/12-2023:
Instead of having arbitrary numbers like 40 and 70 for the x-value in my paddle objects, I changed it to variables, like so:
var distanceFromSide = 40;
var paddleWidth = 30;
const rightPaddle = {
    x: gameBoard.width-(distanceFromSide+paddleWidth),
}
to make the paddles always equally distanced from the side, even if I wanted to change the values. Say I wanted to optimize it for a different screen resolution, for example.


4/12-2023
I don't know how to make the ball move, so this week I'll look at my collection of Pongs I've found online, to see how they did it. I obviously don't want to plagiarize, though.
Did some cleanup of the code, such as removing unnecessary lines, fixing the inconsistency of sometimes using gameBoard.height and sometimes gameBoardHeight, and combining the movePaddle functions.


Some other Pongs:
https://codepen.io/gdube/pen/JybxxZ
https://www.geeksforgeeks.org/pong-game-in-javascript/
https://gist.github.com/straker/81b59eecf70da93af396f963596dfdc5
https://github.com/SethClydesdale/browser-pong