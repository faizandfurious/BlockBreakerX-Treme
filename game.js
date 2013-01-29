//Globar variables
//canvas element
window.canvas = document.getElementById("myCanvas");
//context element
window.ctx = canvas.getContext("2d");
//Bar speed multiplier
window.speed = 1;
window.stop = false;
window.win = false;
window.powering = false;
window.pArray = new Array(5);

largeBar = false;
startString = "Start";
instructions = "Instructions";
level = 0;
buttonPadding = 30;
startButtonX = 135;
instructionStartButtonX = 285;
instructionButtonX = 285;
buttonY = 415;
borderRadius = 10;
buttonHeight = 45;
menu = false;
instruction = false;

//life 
lives = 5;

window.onload = function(){
	setInterval(function(){
		if(!window.stop){
        moveBar();
		draw();
	} } , 20);
};

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
		menu = true;
		level = 0;
		resetBackground();
	}
}

function winGame(){
		window.stop = true;
		window.ctx.save();
		window.ctx.fillStyle = '#f00';
		window.
		window.ctx.font = 'italic bold 50px Consolas';
		window.ctx.textBaseline = 'bottom';
		window.ctx.fillText('YOU WIN!', 100, 350);
		window.ctx.restore();

}

function dropPowerup(pp){
	if(pp.y < canvas.height){
		powering = true;
		pp.y+=3;
		if(pArray.indexOf(pp) < 0){
			pArray.push(pp);
		}
	}

	else{
		pArray[pArray.indexOf(pp)] = 0;
	}
	drawPowerups();
}

function drawPowerups(){
	for(var i = 0; i < pArray.length; i++){
		if(typeof(pArray[i]) != null && typeof pArray[i] == 'object' ){
			window.ctx.drawImage(pArray[i].image, pArray[i].x, pArray[i].y+=4, pArray[i].w, pArray[i].h);
			checkPowerupHitBar(pArray[i]);
		}
	}
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
            checkBallHit();
            checkBarHit();
			ball.y = ball.y + ball.yVelocity;
            ball.x = ball.x + ball.xVelocity;
			window.ctx.drawImage(ball.image, ball.x, ball.y, ball.w, ball.h);
		}
	}
}

function draw(keyCode) {
	if(grid.count() === 0){
		winGame();
	}

	if(!stop){
		//Clears the entire canvas
		window.ctx.clearRect(0, 0, canvas.width, canvas.height);

		window.ctx.drawImage(background.image,background.sx,background.sy,background.sWidth,
		background.sHeight,background.dx, background.dy, 600,600);
		window.ctx.font="30px Consolas";
		//Menu
		if(level === 0){
			menu = true;
			instruction = false;
			var widthInstructions = window.ctx.measureText(instructions).width;
			var widthStart = window.ctx.measureText(startString).width;

			window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
			roundedRect(startButtonX,buttonY,widthStart+buttonPadding,buttonHeight,borderRadius);
			window.ctx.fillText(startString, 150, 450);
			roundedRect(instructionButtonX,buttonY,widthInstructions+buttonPadding,buttonHeight, borderRadius);
			window.ctx.fillText(instructions, 300, 450);
		}
		//Instructions
		else if (level === -1){
			menu = false;
			instruction = true;
			window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";

			window.ctx.fillRect(50,50,500,500);
			window.ctx.fillStyle = "rgb(100, 100, 100)";
			window.ctx.fillText("Instructions", 100, 100);
			var widthInstructions = window.ctx.measureText(instructions).width;
			var widthStart = window.ctx.measureText(startString).width;

			window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
			roundedRect(instructionStartButtonX,buttonY,widthStart+buttonPadding,buttonHeight,borderRadius);
			window.ctx.fillText(startString, instructionStartButtonX + 15, 450);


		}
		//Top Info Bar
		else{
			menu = false;
			instruction = false;
			drawPowerups();
			window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
			window.ctx.fillRect(0,0,600,40);
			window.ctx.fillStyle = "rgb(100, 100, 100)";
			window.ctx.fillText("Level: "+level, 10, 28);
			var lifeX = 480;
			//loops to draw the various lives
			if(lives > 3){
				window.ctx.drawImage(life.image, lifeX, 8, 35, 30);
				window.ctx.save();
				window.ctx.font="20px Consolas";
				window.ctx.fillText("x" + lives, lifeX + 35, 30);
				window.ctx.restore();
			}
			
			else{
				for(var i=0 ; i < lives ; i++){
					window.ctx.drawImage(life.image,lifeX, 8,35, 30);
					lifeX = lifeX+35;
				}
			}

			//Draws the bar
			window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);

			drawBall();

			//Iterate through the grid and draw boxes in each slot
			for(i = 0; i < grid.colNums; i++){
				for(j = 0; j < grid.rowNums; j++){

					//width of the box
					var w = grid.blockWidth;

					//Height of the box
					var h = grid.blockHeight;


					//x coordinate of the box
					var xcoord = (grid.xcoord + grid.blockWidth*i);

					//y coordinate of the box
					var ycoord = (grid.ycoord + grid.blockHeight*j);

					//Create a local variable to store the brokenBox image, as the reference to the box is gone
					var image = new Image();
					image.src = "assets/brokenBox.png";

					if(grid.brokenBlocks[j][i] > 0){
					    window.ctx.globalAlpha = grid.brokenBlocks[j][i]/100;
	                    grid.brokenBlocks[j][i]-= 2;
	                    window.ctx.drawImage(image, xcoord, ycoord, w - grid.buffer, h - grid.buffer);
	                    window.ctx.globalAlpha = 1;
	                    }
	                    var image = new Image();
	                    image.src = "assets/brokenBox.png";
	                if(!!grid.blocks[j][i])
	                	if(typeof(grid.blocks[j][i].p) === 'object')
	                    	window.ctx.drawImage(image, xcoord, ycoord, w - grid.buffer, h - grid.buffer);
	                    else
		                    window.ctx.drawImage(grid.blocks[j][i].boxImage, xcoord, ycoord, w - grid.buffer, h - grid.buffer);
				}
			}

		}
	}
}

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



