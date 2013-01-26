//Global variables
//canvas element
window.canvas = document.getElementById("myCanvas");
//context element
window.ctx = canvas.getContext("2d");
//Bar speed multiplier
window.speed = 1;
window.stop = false;
window.lives = 5;
window.boxArray = [];
window.finished = false;
window.powerArray = [];

window.onload = function(){
	setUpGame();
	setInterval(function(){
		if(!window.stop){
        moveBar();
		draw();
	} } , 20);
};

//Creating the grid to place boxes into.
var boxGrid = function(){
	var exports = {};

	//Leave space between each bbar.dLock
	exports.buffer = 2;

	//The number of rows and columns
	exports.rowNums = 2;
	exports.colNums = 5;


	//The coordinates of the grid
	exports.xcoord = 100 - (exports.colNums*exports.buffer)/2;
	exports.ycoord = 100 - (exports.rowNums*exports.buffer)/2;;

	//The width and height of the grid
	exports.w = window.canvas.width - exports.xcoord*2;
	//TODO Remove fixed number, find appropriate ratio
	exports.h = window.canvas.height*.6 - exports.ycoord*2;

	//The width and height of each slot
	exports.colWidth = exports.w/exports.colNums;
	exports.rowWidth = exports.h/exports.rowNums;


	return exports;

}();

//This function is called at the start of the game. It sets up the box grid with the appropriate boxes.
function setUpGame(){
	//Iterate through the grid and draw boxes in each slot
	for(i = 0; i < boxGrid.colNums; i++){
		for(j = 0; j < boxGrid.rowNums; j++){
			//width of the box
			var w = boxGrid.colWidth;

			//Height of the box
			var h = boxGrid.rowWidth;


			//x coordinate of the box
			var xcoord = (boxGrid.xcoord + boxGrid.colWidth*i);

			//y coordinate of the box
			var ycoord = (boxGrid.ycoord + boxGrid.rowWidth*j);


			var box = new Box("assets/box.png", xcoord, ycoord, w, h);
			window.ctx.drawImage(box.image, xcoord, ycoord, w - boxGrid.buffer, h - boxGrid.buffer);
			boxArray.push(box);

			//DEBUGGING PURPOSES
			window.ctx.save();
			window.ctx.fillStyle = '#f00';
			window.ctx.font = 'italic bold 10px sans-serif';
			window.ctx.textBaseline = 'bottom';
			window.ctx.fillText(i + ", " + j, xcoord, ycoord);
			window.ctx.restore();

		}
	}
}

//This function starts the ball's motion.
function beginGame(){
	if(ball.state === 0){
		ball.state = 1;
        ball.xVelocity = bar.velocity/2;
        ball.yVelocity = -3;
	}
}

function endGame(){
	ball.state = 0;
	if(window.lives > 0){
		window.lives--;
		draw();
	}
	else{
		window.stop = true;
		window.ctx.save();
		window.ctx.fillStyle = '#f00';
		window.ctx.font = 'italic bold 50px sans-serif';
		window.ctx.textBaseline = 'bottom';
		window.ctx.fillText('YOU LOSE!', 100, 350);
		window.ctx.restore();
	}
}



//The bar object
var bar = function(){
	var exports = {};

    exports.vMax = 14;
    exports.vMin = -14;
    exports.velocity = 0;
    exports.acceleration = 0;
    exports.dLock = 0;
	
    exports.image = new Image();
	exports.xcoord = 300;
	exports.ycoord = 530;
	exports.w = 120;
	exports.h = 15;
	exports.image.src = "assets/bar.png";

	return exports;

}();

//The box object
function Box(imageSrc, xcoord, ycoord, w, h){

	this.image = new Image();
	this.image.src = imageSrc;
	this.xcoord = xcoord;
	this.ycoord = ycoord;
	this.w = w;
	this.h = h;
};

//The ball object
var ball = function(){
	var exports = {};

	//Not moving, 1 means moving
	exports.state = 0;

	//Express Ball's trajectory and motion as vertical and horizontal velocities
    exports.xVelocity = 0;
    exports.yVelocity = 0;

	exports.x = 5;
	exports.y = 5;
	exports.w = 20;
	exports.h = 20;

	exports.image = new Image();
	exports.image.src = "assets/ball.png";


	return exports;
}();

//The powerup object
var powerUp = function(){
	var exports = {};

	exports.x = 30;
	exports.y = 30;
	exports.w = 30;
	exports.h = 30;

	exports.image = new Image();
	exports.image.src = "assets/ball.png";

	return exports;

}();

function drawPowerUp(){
	window.ctx.drawImage(powerUp.image, powerUp.x, ++powerUp.y, powerUp.w, powerUp.h);
}


function drawBall(){
	if(!stop){
		if(ball.state === 0){
			ball.x = (bar.xcoord + bar.w/2);
			ball.y = bar.ycoord - ball.h;
			window.ctx.drawImage(ball.image, ball.x, ball.y, ball.w, ball.h);
		}
		else{
			checkBounds();
			ball.y = ball.y + ball.yVelocity;
            ball.x = ball.x + ball.xVelocity;
			window.ctx.drawImage(ball.image, ball.x, ball.y, ball.w, ball.h);
		}
	}
}

function draw(keyCode) {
	if(!stop){
		//Clears the entire canvas
		window.ctx.clearRect(0, 0, canvas.width, canvas.height);

		if(typeof(keyCode) === 'object'){
		//Draws the bar
		bar.xcoord = keyCode.x - bar.w/2;
		window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);
		}

		else{
		//Draws the bar
		window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);
		}

		drawBall();

		drawPowerUp();

		window.ctx.fillText("Lives left: " + window.lives, 10, 10);

		//Redraw the current box objects on the screen
		for(var i = 0; i < boxArray.length; i++){
			window.ctx.drawImage(boxArray[i].image, boxArray[i].xcoord, boxArray[i].ycoord, boxArray[i].w - boxGrid.buffer, boxArray[i].h - boxGrid.buffer);
			window.ctx.save();
			window.ctx.fillStyle = '#f00';
			window.ctx.font = 'italic bold 10px sans-serif';
			window.ctx.textBaseline = 'bottom';
			window.ctx.fillText(i, boxArray[i].xcoord, boxArray[i].ycoord);
			window.ctx.restore();
		}
	}
}

function checkBounds(){
    if(ball.y+ball.h > canvas.height)
        endGame();
    if(ball.y < 0)
        ball.yVelocity = -1 * ball.yVelocity;
    if(ball.x < 0 || ball.x+ball.h > canvas.width)
        ball.xVelocity = -1 * ball.xVelocity;

    //Check if ball hits the bar
    if(ball.y <= bar.ycoord + 1 && ball.y > bar.ycoord - ball.w)
    	if(ball.x <= bar.xcoord + bar.w && ball.x >= bar.xcoord)
    		ball.yVelocity = -1 * ball.yVelocity;
    

}

//Event Listeners


function onKeyUp(event) {

    if(event.keyCode === 37){
        if(bar.dLock === -1){
            bar.acceleration = 0; 
            bar.dLock = 0;
        }
    }
    if(event.keyCode === 39){
        if(bar.dLock === 1){
            bar.acceleration = 0;
            bar.dLock = 0;
        }
    }

	draw(event.keyCode);
}

function onKeyDown(event) {

    
    //Left arrow key
	if(event.keyCode === 37){
        if(bar.dLock > -1){
            bar.acceleration = -2;
            bar.dLock = -1;
        }
	}
	//Right arrow key
	if(event.keyCode === 39){
        if(bar.dLock < 1){
            bar.acceleration = 2;
            bar.dLock = 1;
        }
    }
	//Space bar. Used to begin game.
	else if(event.keyCode == 32){
		beginGame();
		powerArray.push(powerUp);
	}

	draw(event.keyCode);
}

function mouseMove(event){
	draw(event);
}

canvas.addEventListener('keydown', onKeyDown, false);
canvas.addEventListener('keyup', onKeyUp, false);
canvas.addEventListener('mousemove', mouseMove, false);


/**
* New Event listener function that listens for keydown manually on given time interval
* for a smoother bar motion
*/

function moveBar()
{
    var friction = 0;
    var vnew = bar.velocity + bar.acceleration;
    if(vnew <= bar.vMax && vnew >= bar.vMin)
        bar.velocity = vnew;

    if(bar.acceleration === 0){
        if(bar.velocity > 0)
            friction = -.5;
        else if(bar.velocity < 0)
            friction = .5;
    }

    bar.velocity+=friction;
    
    var xNew = bar.xcoord + bar.velocity;
    if(xNew < 0){
        xNew = 0;
        bar.dLock = 0;
        bar.velocity = 0;
        bar.acceleration = 0;
    }
    else if(xNew+bar.w > canvas.width){
        xNew = canvas.width - bar.w;
        bar.dLock = 0;
        bar.velocity = 0;
        bar.acceleration = 0;
    }
    bar.xcoord = xNew;


}

function powerUp(){


}



// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();


function onMouseDown(event) {

}
canvas.addEventListener('mousedown', onMouseDown, false);






