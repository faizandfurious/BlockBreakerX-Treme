

window.onload = function(){
	//When the window loads, create a new gridBoard with the specified rows, columns
	gridBoard = new grid(3,7);
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
		if(level === 1){
			ball.state = 0;
			changeLevel(2);
		}
		else if(level === 2){
			window.stop = true;
			window.ctx.save();
			window.ctx.fillStyle = '#f00';
			window.
			window.ctx.font = 'italic bold 50px Consolas';
			window.ctx.textBaseline = 'bottom';
			window.ctx.fillText('YOU WIN!', 100, 350);
			window.ctx.restore();
		}

}

function changeLevel(lvl){
	level = lvl;
	if(level === 2){
		lives++;
		gridBoard = new grid(4, 9);
	}
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





// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();



