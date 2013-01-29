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

//Initial board size
gridBoard = new grid(3, 7);
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
playable = false;

//life 
lives = 3;

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
		lives = 3;
		playable = false;
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

function changeLevel(level){
	resetBoard();
}

function resetBoard(){
	lives = 5;
	gridBoard = new grid(2, 2);
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



