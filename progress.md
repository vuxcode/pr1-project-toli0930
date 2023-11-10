I have been busy with other courses, but what I've been doing trying to do so far is to go online and download the code of different already existing Pong projects, to dissect how they work.
I have realized Pong is a lot more complicated than first assumed, with HTML/CSS/JS not being a game engine. I have gotten Pong to work on Unity in the past,
but with JS it's less visual and you have to write more things from scratch, such as drawing the shapes.
You can take the approach of drawing shapes using canvas, or with CSS. I don't know which is simpler, but I'm going with canvas for now, using fillRect() to draw the shapes.
The first step to accomplish should probably be to move the paddles with WASD and arrow keys.

I have also learned of 'defer', which can be added to the src element of the HTML. I've noticed the code and HTML can't always 'see' each other depending on when they're loaded. Defer seems to get around this by seeing the page before executing the code, which is good.

I noticed I can't use the variables inside objects within the objects. I tried to do this:
const leftPaddle = {
    height: 80,
    y: (gameBoard.height/2)-(leftPaddle.height/2), //needs subtraction to be symmetrically in middle  
};
and even with having them in this order, it didn't work.
But it's probably better practice to define values of the height and width at the top either way, especially since were reusing the same values for the rightPaddle.

I've also noticed it uses PEMDAS so the parantheses in the operation isn't needed, but it looks cleaner to me.