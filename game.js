//Globar variables
//canvas element
window.canvas = document.getElementById("myCanvas");
//context element
window.ctx = canvas.getContext("2d");
//Bar speed multiplier
window.speed = 1;
window.stop = false;
window.lives = 5;

window.onload = function(){
	setInterval(function(){
		if(!window.stop){
        moveBar();
		draw();
	} } , 20);
};

//Creating the grid to place boxes into.
var boxGrid = function(){
	var exports = {};

	//Leave space between each block
	exports.buffer = 2;

	//The number of rows and columns
	exports.rowNums = 2;
	exports.colNums = 5;
    
    var arr = Array(exports.rowNums);

    for(var y = 0; y < exports.rowNums; y++) {
        arr[y] = Array(exports.colNums);
        for(var x = 0; x<exports.colNums; x++) {
            arr[y][x] = true;
        }
    }

    exports.blocks = arr;


	//The coordinates of the grid
	exports.xcoord = 100 - (exports.colNums*exports.buffer)/2;
	exports.ycoord = 100 - (exports.rowNums*exports.buffer)/2;;

	//The width and height of the grid
	exports.w = window.canvas.width - exports.xcoord*2;
	//TODO Remove fixed number, find appropriate ratio
	exports.h = window.canvas.height*.6 - exports.ycoord*2;

	//The width and height of each slot
	exports.blockWidth = exports.w/exports.colNums;
	exports.blockHeight = exports.h/exports.rowNums;

    exports.inGrid = function(x, y){
        return (x > exports.xcoord && x < exports.xcoord + exports.w) &&
               (y > exports.ycoord && y < exports.ycoord + exports.h);
    }

    exports.breakBlock = function(obj,x,y){
        var row = Math.floor((y - exports.ycoord) / exports.blockHeight);
        var col = Math.floor((x - exports.xcoord) / exports.blockWidth);

        if(!exports.blocks[row][col])
            return;
        
        exports.blocks[row][col] = false;
        //decide which way ball should bounce based on which edge its closest to
        var xOffset = row*exports.blockWidth + exports.xcoord;
        var yOffset = col*exports.blockHeight + exports.ycoord;
    }

	return exports;

}();

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
    
    //semaphore for keys to make smoother change of directions
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

	//Express Ball's trajectory and motion as vertical and horizontal velocities
    exports.xVelocity = 0;
    exports.yVelocity = 0;

	exports.x = 5;
	exports.y = 5;
	exports.w = 20;
	exports.h = 20;

	exports.image = new Image();
	exports.image.src = "assets/ball.png";

    //checks if ball is intersecting rectangular region (x1,y1) ,(x2,y2)
    //if so, ball bounces and returns true, if not, returns false
    exports.intersect = function(x1,y1,x2,y2) {
        
    }


	return exports;
}();


function drawBall(){
	if(!stop){
		if(ball.state === 0){
			ball.x = (bar.xcoord + bar.w/2);
			ball.y = bar.ycoord - ball.h;
			window.ctx.drawImage(ball.image, ball.x, ball.y, ball.w, ball.h);
		}
		else{
			checkBounds();
            checkBallHit();
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
		
		//Draws the bar
		window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);

		drawBall();

		window.ctx.fillText("Lives left: " + window.lives, 10, 10);

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
		// 	currX = currX + boxGrid.blockWidth;
		// }

		// //Now the rows
		// var currX = boxGrid.xcoord;
		// for(var i = 0; i <= boxGrid.rowNums; i++){
		// 	window.ctx.beginPath();
		// 	window.ctx.moveTo(currX, currY);
		// 	ctx.lineTo(boxGrid.w + currX, currY);
		// 	ctx.closePath();
		//     ctx.stroke();
		// 	currY = currY + boxGrid.blockHeight;
		// }

		//Iterate through the grid and draw boxes in each slot
		for(i = 0; i < boxGrid.colNums; i++){
			for(j = 0; j < boxGrid.rowNums; j++){
                
                if(!boxGrid.blocks[j][i])
                    continue;

				//width of the box
				var w = boxGrid.blockWidth;

				//Height of the box
				var h = boxGrid.blockHeight;


				//x coordinate of the box
				var xcoord = (boxGrid.xcoord + boxGrid.blockWidth*i);

				//y coordinate of the box
				var ycoord = (boxGrid.ycoord + boxGrid.blockHeight*j);

				window.ctx.drawImage(box.image, xcoord, ycoord, w - boxGrid.buffer, h - boxGrid.buffer);
			}
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

}

function checkBallHit(){
    //Check all four corners

    if(boxGrid.inGrid(ball.x, ball.y))
        boxGrid.breakBlock(ball, ball.x, ball.y);

    if(boxGrid.inGrid(ball.x+ball.w, ball.y))
        boxGrid.breakBlock(ball, ball.x+ball.w, ball.y);

    if(boxGrid.inGrid(ball.x+ball.w, ball.y+ball.h))
        boxGrid.breakBlock(ball, ball.x+ball.w, ball.y+ball.h);

    if(boxGrid.inGrid(ball.x, ball.y+ball.h))
        boxGrid.breakBlock(ball, ball.x, ball.y+ball.h);
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




// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();


function onMouseDown(event) {

}
canvas.addEventListener('mousedown', onMouseDown, false);






