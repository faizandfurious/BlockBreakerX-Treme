Ramy Elshenawy, relshena
Diandian Xiao, dxiao
Faiz Abbasi, fabbasi

The game is played by using the space bar to launch the ball to break blocks. The player may advance to different levels once the blocks complete. Powerups will fall from the sky randomly. These will help you, whether increasing the ball or bar size. A screen display depending on whether you win or lose.

Rectangles, Rounded Rectangles, Text
Rectangle is used at the top to draw the scoring area.
Rounded rectangled are used on the menu buttons
Text is drawn in various places

Transfromations:Translate
Translated the start string in the instructions 

Mouse Events
There is a mousedown listener. The handler will detect when the user presses the start button. 

Keyboard Events
We use keyboard controls, i.e. with space bar to launch ball and arrow keys to move the paddle.

Timer 
We use setInterval to slowly slide the image background.

Images, Sprites
Our background is one large image. We slice to grab pieces of it.

Anonymous Functions, Expressions
Our moveBackground method takes of the anonymous function expression. We can set interval and pass an anonymous function like setInterval(function(){ ... }, 50);
Type Conversion
In level/life pane, we use some type conversion with concatenating "Level: " with the variable levels which contains an number.

Array, Multidimensional
We used an multidimensional array to deal with the grid of blocks.

Math Methods: Random and Floor
We use random to generate where powerups occur. We used floor to turn floats into ints for some math needed.

Objects and Constructors
We used constructors for setting up box.







