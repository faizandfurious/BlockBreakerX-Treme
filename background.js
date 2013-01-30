startString = "Start";
instructions = "Instructions";
level = 0;
buttonPadding = 30;
startButtonX = 135;
instructionButtonX = 285;
buttonY = 415;
borderRadius = 10;
buttonHeight = 45;
go = null;

//life 
lives = 3;

//animates the move of the background to a different frame
function moveBackground(frame){

	//Everytime we have to move the background, we stop the previous process.
	clearInterval(go);

	console.log("background source y: " + background.sy);
	go = setInterval(function(){
		var targetHeight = 3600-(frame*600);
		if (targetHeight < background.sy){
			background.sy = background.sy - 5;
		}
		else if (targetHeight > background.sy){
			background.sy = background.sy + 5;
		}}, 5);
}