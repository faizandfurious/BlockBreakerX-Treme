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