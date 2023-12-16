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

5/12-2023
Realized I could optimize the clearRect() and fillRect() to only be written once in the gameLoop().
In specifically this Pong: https://gist.github.com/straker/81b59eecf70da93af396f963596dfdc5
they make the ball move exactly like the paddle, by updating the y and x coordinates of the ball with a velocity value and then redrawing it. Not sure there's any other way of doing it in JS canvas. I did that, and now the ball moves, but can not collide.
Tried to make it collide. Doesn't work. Figuring it out later.

7/12-2023
I can't use the same variable for moving the ball (ballVel), I need to also make a separation between its movement in the y vs the x direction.
Might be more readable to reorder the clearRect() and fillRect() stuff to the bottom of the gameLoop(), even though it doesn't technically NEED to be after EVERYTHING in the loop.
Needed some help from the Pong I've been looking at again, the one that's been of most help throughout the project: https://gist.github.com/straker/81b59eecf70da93af396f963596dfdc5
I've realized there's two different ways of reversing a variable value, they seem to have the same effect.
    myVar = -myVar;
    myVar *= -1;
Another thing I could do with the clearRect() fillRect() stuff is stick it to the top of the gameLoop() and remove them from outside the function. Optimization! Also makes them black for some reason.

The ball collides with the paddles now. I needed to figure out how to define the paddles location so I could compare when the ball hits it, but otherwise it's just another if-statement.

The basic game works, could be made cleaner but it works.

14/12-2023
Realized one important purpose of separating paddleHeight and the individual paddles Paddle.height. A way to accelerate the difficulty could be to make the paddles smaller, but they need to keep being redrawn the new size as well. There's no need to use the paddleHeight variable anywhere other than for the paddle objects.
Because the paddles heights become two different variables this way, I can change them separately. The paddle that sees more success becomes more difficult than the other.
Could make for interesting gameplay potential, such as "the player who makes their paddle disappear first is the winner". That game would only work if the ball swapped direction when going out of screen, so I'll fix that.
Made a win condition, and a message function that can say either RIGHT or LEFT wins.
Set a timeout of 60 seconds before the win alert appears, so that we can actually see the paddle disappear when it wins.
Found a ding noise when the paddle hits ball on https://opengameart.org/content/gui-sound-effects
Added it because it's easy to add.

15/12-2023
Added win noise.
In an attempt to create restart game functionality, my computer crashed. Oops.
Apparently you can break setInterval loops with clearInterval, let me try that, aaand it worked. Hooray.
The game gets faster every time I restart it for some reason?? And the winMessage() is called twice?? But it can't find "RIGHT" or "LEFT" because the condition isn't met, so it becomes undefined.
I'm guessing the game gets faster because calling the runGame() again the game run... twice, and then thrice, and so on? And the clearInterval() doesn't actually do anything, why? But it's ok, because I don't need anything to stop or restart the game, in this case. And doing else{return;} works on the winMessage for some reason. It seems to exit the function, and since the conditions aren't met, it won't run twice. No idea why it would in the first place, but now it works.

16/12-2023
Removed secret console scoreboard because it saves a lot of lines of code and is unnecessary with the win condition gameplay goal thingy of destroying your paddle.