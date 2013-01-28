startString = "Start";
instructions = "Instructions";
level = 0;
buttonPadding = 30;
startButtonX = 135;
instructionButtonX = 285;
buttonY = 415;
borderRadius = 10;
buttonHeight = 45;

//life 
lives = 3;

function drawInstructions(){

}




//animates the move of the background to a different frame
function moveBackground(frame){
	setInterval(function(){
		var targetHeight = 3600-(frame*600);
		if (targetHeight!== background.sy){
			background.sy = background.sy - 20;
		}}, 5);

}
