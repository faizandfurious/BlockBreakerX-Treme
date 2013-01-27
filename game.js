//Globar variables
//canvas element
window.canvas = document.getElementById("myCanvas");
//context element
window.ctx = canvas.getContext("2d");
//Bar speed multiplier
window.speed = 1;
window.stop = false;
window.lives = 5;
window.win = false;

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
		window.stop = true;
		window.ctx.save();
		window.ctx.fillStyle = '#f00';
		window.ctx.font = 'italic bold 50px sans-serif';
		window.ctx.textBaseline = 'bottom';
		window.ctx.fillText('YOU LOSE!', 100, 350);
		window.ctx.restore();
	}
}

function winGame(){
		window.stop = true;
		window.ctx.save();
		window.ctx.fillStyle = '#f00';
		window.ctx.font = 'italic bold 50px sans-serif';
		window.ctx.textBaseline = 'bottom';
		window.ctx.fillText('YOU WIN!', 100, 350);
		window.ctx.restore();

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

		//Draws the bar
		window.ctx.drawImage(bar.image, bar.xcoord, bar.ycoord, bar.w, bar.h);

		drawBall();

		window.ctx.fillText("Lives left: " + window.lives, 10, 10);


		//Iterate through the grid and draw boxes in each slot
		for(i = 0; i < grid.colNums; i++){
			for(j = 0; j < grid.rowNums; j++){
                
                if(!grid.blocks[j][i])
                    continue;

				//width of the box
				var w = grid.blockWidth;

				//Height of the box
				var h = grid.blockHeight;


				//x coordinate of the box
				var xcoord = (grid.xcoord + grid.blockWidth*i);

				//y coordinate of the box
				var ycoord = (grid.ycoord + grid.blockHeight*j);

				window.ctx.drawImage(box.image, xcoord, ycoord, w - grid.buffer, h - grid.buffer);
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



