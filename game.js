//Global variables
//canvas element
window.canvas = document.getElementById("myCanvas");
//context element
window.ctx = canvas.getContext("2d");
//Bar speed multiplier
window.speed = 1;


//Creating the grid to place boxes into.
var boxGrid = function(){
	var exports = {};

	//Leave space between each block
	exports.buffer = 2;

	//
	exports.rowNums = 6;
	exports.colNums = 10;


	//The coordinates of the grid
	exports.xcoord = 100 - (exports.colNums*exports.buffer)/2;
	exports.ycoord = 100 - (exports.rowNums*exports.buffer)/2;;

	//The width and height of the grid
	exports.w = window.canvas.width - exports.xcoord*2;
	exports.h = window.canvas.height - exports.ycoord*2;

	exports.colWidth = exports.w/exports.colNums;
	exports.rowWidth = exports.h/exports.rowNums;


	return exports;

}();



//The bar object
var bar = function(){
	var exports = {};

	exports.image = new Image();
	exports.xcoord = 300;
	exports.ycoord = 530;
	exports.w = 80;
	exports.h = 30;
	exports.image.src = "assets/bar.png";

	return exports;

}();

//The box object
var box = function(){
	var exports = {};

	exports.xcoord = 30;
	exports.xcoord = 30;

	exports.w = 40;
	exports.h = 40;
	exports.image = new Image();
	exports.image.src = "assets/box.png";

	return exports;
}();

//The ball object
var ball = function(){
	var exports = {};


	return exports;
}();

function draw(keyCode) {
	//Clears the entire canvas
	window.ctx.clearRect(0, 0, canvas.width, canvas.height);

	//Draws the bar
	//TODO: needs to draw everything on the screen

	checkBounds(bar, canvas, keyCode);
	window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);



	//Draw the grid
	//First the columns
	var currX = boxGrid.xcoord;
	var currY = boxGrid.ycoord;
	for(var i = 0; i <= boxGrid.colNums; i++){
		window.ctx.beginPath();
		window.ctx.moveTo(currX, currY);
		console.log(currX);
		ctx.lineTo(currX, boxGrid.h + currY);
		ctx.closePath();
	    ctx.stroke();
		currX = currX + boxGrid.colWidth;
	}

	//Now the rows
	var currX = boxGrid.xcoord;
	for(var i = 0; i <= boxGrid.rowNums; i++){
		window.ctx.beginPath();
		window.ctx.moveTo(currX, currY);
		ctx.lineTo(boxGrid.w + currX, currY);
		ctx.closePath();
	    ctx.stroke();
		currY = currY + boxGrid.rowWidth;
	}

}

//This function is used to check the bounds of various objects
function checkBounds(obj, canvas, keyCode){
	if(keyCode === 37){
		//Checks to see if the current move would place the bar offscreen
		if(obj.xcoord - 5 * window.speed < 0){
			obj.xcoord = 0;
		}
	}

	else if(keyCode === 39){
		//Checks to see if the current move would place the bar offscreen
		if(obj.xcoord + obj.w + 5*window.speed > canvas.width){
			obj.xcoord = canvas.width - obj.w;
		}
	}
}



//Event Listeners

function onKeyDown(event) {
	if(event.keyCode === 37){
    	bar.xcoord = bar.xcoord - 5*window.speed;
	}
	else if(event.keyCode === 39){
		bar.xcoord = bar.xcoord + 5*window.speed;
	}
	else if(event.keyCode == 32){
		window.speed = 5;
	}

	draw(event.keyCode);
}

canvas.addEventListener('keydown', onKeyDown, false);

// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();


function onMouseDown(event) {
    // var x = event.pageX - canvas.offsetLeft;  // do not use event.x, it's not cross-browser!!!
    // var y = event.pageY - canvas.offsetTop;
    // ctx.fillStyle = "rgba(0,128,128,0.5)";
    // ctx.fillRect(x-25, y-25, 50, 50);
}
canvas.addEventListener('mousedown', onMouseDown, false);