# Bug List

> Make a list of the things that don't work as expected. Keep a list of things that you have fixed and try to document how you solved them.

1. Problem: *Describe your problem here* 
My paddles couldn't move at the same time, because JS cannot register two key inputs at the same time.
I tried to create a bool that became true upon the key press, false upon key release, and the movePaddle code can only work when the bool is true. I couldn't nest that in the if(keyinput) statement along with the bool true though, so I separated it in a different function, and finally it works.

Now the paddles are super fast for some reason. Don't know why that is. I can easily modify that though, so I wouldn't consider it a problem.

2. New problem. The paddles are a bit buggy in their controls. I'll see what I can do.
Turns out it didn't work very well to have if(e.key == 'w' || e.key == 's') here. Better to split it up.
addEventListener('keyup', function(e){
    if(e.key == 'w'){
        console.log("released w");
        upLeftIsPush = false;
    } else if(e.key == 's'){
        console.log("released s");
        downLeftIsPush = false;
    } else if(e.key == 'ArrowUp'){
        console.log("released up");
        upRightIsPush = false;
    } else if(e.key == 'ArrowDown'){
        console.log("released down");
        downRightIsPush = false;
    }
})

3. Another problem. When both paddles are touching the ceiling or floor, the right paddle can move beyond it for some reason. I'll fix it.
Easy fix. Just separate the if chain.
from:
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if(leftPaddle.y > 500){
        leftPaddle.y = 500;
        console.log("hit floor");
    } else if(rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if(rightPaddle.y > 500){
        rightPaddle.y = 500;
        console.log("hit floor");
    }

to:
    if(leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if(leftPaddle.y > 500){
        leftPaddle.y = 500;
        console.log("hit floor");
    }
    if(rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if(rightPaddle.y > 500){
        rightPaddle.y = 500;
        console.log("hit floor");
    }

since everything else needs to be false for one thing to be true. This way, they can both be true/false independently.