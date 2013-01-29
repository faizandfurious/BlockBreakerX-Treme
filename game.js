

window.onload = function(){
	//When the window loads, create a new gridBoard with the specified rows, columns
	initializeBoard();
	setInterval(function(){
		if(!window.stop){
        moveBar();
		draw();
	} } , 20);
};

function initializeBoard(){
	//When the window loads, create a new gridBoard with the specified rows, columns
	gridBoard = new grid(3,7);
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
		menu = true;
		changeLevel(4);
		lives = 3;
		playable = false;
	}
}

function progressGame(){
	if(level === 1){
		changeLevel(2);
	}
	else if(level === 2){
		changeLevel(3);
	}
}

function changeLevel(lvl){
	ball.state = 0;
	level = lvl;
	//Instructions level
	if(level === -1){
		moveBackground(2);
	}
	//Menu level
	else if(level === 0){
		moveBackground(1);
		lives++;
		gridBoard = new grid(3, 7);
	}
	//First Level
	else if(level === 1){
		moveBackground(3);
		gridBoard = new grid(3, 7);
	}
	//Second Level
	else if(level === 2){
		moveBackground(4);
		gridBoard = new grid(4, 9);
	}
	//Game Won
	else if(level === 3){
		moveBackground(6);
	}
	//Game Lost
	else if(level === 4){
		moveBackground(5);
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



