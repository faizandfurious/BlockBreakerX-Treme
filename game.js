//Global variables
//canvas element
window.canvas = document.getElementById("myCanvas");
//context element
window.ctx = canvas.getContext("2d");
//Bar speed multiplier
window.speed = 1;

window.onload = function(){
	setInterval(function(){
        move();
		draw();
	}, 20);
};

//Creating the grid to place boxes into.
var boxGrid = function(){
	var exports = {};

	//Leave space between each block
	exports.buffer = 2;

	//The number of rows and columns
	exports.rowNums = 3;
	exports.colNums = 8;


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

//This function starts the ball's motion.
function beginGame(){
	if(ball.state === 0){
		ball.state = 1;
	}
}

function endGame(){
	ball.state = 0;
	draw();
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
var box = function(){
	var exports = {};

	exports.image = new Image();
	exports.image.src = "assets/box.png";

	return exports;
}();

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

function draw(keyCode) {
	//Clears the entire canvas
	window.ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Draws the bar
	//TODO: needs to draw everything on the screen
    if(keyCode !== undefined)
    {
	    checkBoundsOnInput(bar, canvas, keyCode);
    }

	window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);

	drawBall();

	//Draw the grid
	// //First the columns
	// var currX = boxGrid.xcoord;
	// var currY = boxGrid.ycoord;
	// for(var i = 0; i <= boxGrid.colNums; i++){
	// 	window.ctx.beginPath();
	// 	window.ctx.moveTo(currX, currY);
	// 	console.log(currX);
	// 	ctx.lineTo(currX, boxGrid.h + currY);
	// 	ctx.closePath();
	//     ctx.stroke();
	// 	currX = currX + boxGrid.colWidth;
	// }

	// //Now the rows
	// var currX = boxGrid.xcoord;
	// for(var i = 0; i <= boxGrid.rowNums; i++){
	// 	window.ctx.beginPath();
	// 	window.ctx.moveTo(currX, currY);
	// 	ctx.lineTo(boxGrid.w + currX, currY);
	// 	ctx.closePath();
	//     ctx.stroke();
	// 	currY = currY + boxGrid.rowWidth;
	// }

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

			window.ctx.drawImage(box.image, xcoord, ycoord, w - boxGrid.buffer, h - boxGrid.buffer);
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

//This function is used to check the bounds of various objects when the canvas receives input from the keyboard
function checkBoundsOnInput(obj, canvas, keyCode){
	//Left arrow key
	if(keyCode === 37){
		//Checks to see if the current move would place the bar offscreen
		if(obj.xcoord - 5 * window.speed < 0){
			obj.xcoord = 0;
		}
	}

	//Right arrow key
	else if(keyCode === 39){
		//Checks to see if the current move would place the bar offscreen
		if(obj.xcoord + obj.w + 5*window.speed > canvas.width){
			obj.xcoord = canvas.width - obj.w;
		}
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
    	    bar.xcoord = bar.xcoord - 5*window.speed;
            break;
        case "right":
    	    bar.xcoord = bar.xcoord + 5*window.speed;
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






