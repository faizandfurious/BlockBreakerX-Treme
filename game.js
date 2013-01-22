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

window.onload = function(){
	setUpGame();
	setInterval(function(){
		if(!window.stop){
			draw();
		}
        moveBar();
		draw();
	}, 20);
};

//Creating the grid to place boxes into.
var boxGrid = function(){
	var exports = {};

	//Leave space between each block
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

			window.ctx.save();
			window.ctx.fillStyle = '#f00';
			window.ctx.font = 'italic bold 10px sans-serif';
			window.ctx.textBaseline = 'bottom';
			window.ctx.fillText(i + ", " + j, xcoord, ycoord);
			window.ctx.restore();

		}
	}
	console.log(boxArray);
}

//This function starts the ball's motion.
function beginGame(){
	if(ball.state === 0){
		ball.state = 1;
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

	exports.image = new Image();
	exports.xcoord = 300;
	exports.ycoord = 530;
	exports.w = 80;
	exports.h = 10;
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

	//The degree angle of the ball's trajectory
	exports.direction = 90;
	exports.speed = 1;

	exports.xcoord = 5;
	exports.ycoord = 5;
	exports.w = 20;
	exports.h = 20;

	exports.image = new Image();
	exports.image.src = "assets/ball.png";


	return exports;
}();


function drawBall(){
	if(!stop){
		if(ball.state === 0){
			ball.xcoord = (bar.xcoord + bar.w/2);
			ball.ycoord = bar.ycoord - ball.h;
			window.ctx.drawImage(ball.image, ball.xcoord, ball.ycoord, ball.w, ball.h);
		}
		else{
			checkBounds(ball);
			ball.ycoord = ball.ycoord - 3;
			window.ctx.drawImage(ball.image, ball.xcoord, ball.ycoord, ball.w, ball.h);
		}
	}
}

function draw(keyCode) {
	if(!stop){
		//Clears the entire canvas
		window.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		//Draws the bar
		window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);

		drawBall();

		window.ctx.fillText("Lives left: " + window.lives, 10, 10);

		//Redraw the current box objects on the screen
		for(var i = 0; i < boxArray.length; i++){
			window.ctx.drawImage(boxArray[i].image, boxArray[i].xcoord, boxArray[i].ycoord, boxArray[i].w - boxGrid.buffer, boxArray[i].h - boxGrid.buffer);
		}
	}
}

function checkBounds(obj){
	if(obj.xcoord < 0 || obj.xcoord > canvas.width){
		endGame();
	}
	else if(obj.ycoord < 0 || obj.ycoord > canvas.height){
		endGame();
	}
}

//Event Listeners

var direction = "stop";
var keys = 0;

function onKeyUp(event) {
    //Left arrow key
	if(event.keyCode === 37){
    	direction = "stop";
        
	}
	//Right arrow key
	else if(event.keyCode === 39){
    	direction = "stop";
	}

	draw(event.keyCode);
}

function onKeyDown(event) {
    //Left arrow key
	if(event.keyCode === 37){
        if(direction === "stop")
            direction = "left";
	}
	//Right arrow key
	else if(event.keyCode === 39){
        if(direction ==="stop")
            direction = "right";
	}
	//Space bar. Used to begin game.
	else if(event.keyCode == 32){
		beginGame();
	}

	draw(event.keyCode);
}

canvas.addEventListener('keydown', onKeyDown, false);
canvas.addEventListener('keyup', onKeyUp, false);

/**
* New Event listener function that listens for keydown manually on given time interval
* for a smoother bar motion
*/

function moveBar()
{
    switch(direction) {
        case "left":
		//Checks to see if the current move would place the bar offscreen
			if(bar.xcoord - 5 * window.speed < 0){
				bar.xcoord = 0;
			}
			//Otherwise move bar accordingly
			else{
	    	    bar.xcoord = bar.xcoord - 5*window.speed;
			}
            break;
        case "right":
            //Checks to see if the current move would place the bar offscreen
			if(bar.xcoord + bar.w + 5*window.speed > canvas.width){
				bar.xcoord = canvas.width - bar.w;
			}
			//Otherwise move the bar accordingly
			else{
	    	    bar.xcoord = bar.xcoord + 5*window.speed;

			}
            break;
        default:
            break;
    }
    

}




// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();


function onMouseDown(event) {

}
canvas.addEventListener('mousedown', onMouseDown, false);






