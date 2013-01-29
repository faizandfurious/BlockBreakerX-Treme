//Event Listeners
function onKeyUp(event) {
    if(playable){
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
}

/**
* New Event listener function that listens for keydown manually on given time interval
* for a smoother bar motion
*/

function onKeyDown(event) {
    if(playable){
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
}

function onMouseDown(event) {
        var x = event.pageX - canvas.offsetLeft;  
        var y = event.pageY - canvas.offsetTop;

        var widthInstructions = window.ctx.measureText(instructions).width;
        var widthStart = window.ctx.measureText(startString).width;
        if(menu){
            if (x>startButtonX && x<startButtonX+widthStart && y>buttonY && y< buttonY+buttonHeight) {
                moveBackground(3);
                level = 1;
                playable = true;
            }
            else if (x>instructionButtonX && x<instructionButtonX+widthInstructions && y>buttonY && y< buttonY+buttonHeight) {
                moveBackground(3);
                level = -1;
            }
        }
        else if(instruction){
            if (x>instructionStartButtonX && x<instructionStartButtonX+widthStart && y>buttonY && y< buttonY+buttonHeight) {
                moveBackground(3);
                level = 1;
                playable = true;
        }
        else if(restartable){
            if (x>instructionStartButtonX && x<instructionStartButtonX+widthStart && y>buttonY && y< buttonY+buttonHeight) {
                moveBackground(3);
                level = 1;
            }
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('keydown', onKeyDown, false);
canvas.addEventListener('keyup', onKeyUp, false);