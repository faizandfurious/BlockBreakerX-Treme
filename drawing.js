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

function drawMessage(){

    window.ctx.font = 'bold 50px Consolas';
   		window.ctx.textBaseline = 'bottom';
		window.ctx.fillStyle = "rgba(0, 220, 0, "+tempMessage.count/100+")";
  		window.ctx.fillText(tempMessage.showText(), 20, bar.ycoord-150+tempMessage.count);
}

function draw(keyCode) {
	if(gridBoard.count() === 0){
		progressGame();
	}
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
		var widthStart = window.ctx.measureText(startString).width;
		window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
		roundedRect(instructionStartButtonX,buttonY,widthStart+buttonPadding,buttonHeight,borderRadius);
		window.ctx.fillText(startString, instructionStartButtonX + 15, 450);
		window.ctx.fillStyle = "rgb(100, 100, 100)";
		window.ctx.font="12px Consolas";
		window.ctx.fillText("Hit space to bar to send the ball into the air.",100,150);
		window.ctx.fillText("Use arrow keys to move bar.",100,165);
		window.ctx.fillText("Collect powerups to help you!",100,180);
		window.ctx.font="24px Consolas";

		window.ctx.fillText("Destroy all the blocks to win!",100,225);
	}


	//The game is won
	else if(level === 3){
		menu = true;
		window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
		window.ctx.drawImage(cloud.image,cloud.sx,cloud.winsy,cloud.sWidth,
		cloud.sHeight,cloud.dx, cloud.dy, 425,306);
		window.ctx.font="30px Consolas";
		var widthInstructions = window.ctx.measureText(instructions).width;
		var widthStart = window.ctx.measureText(startString).width;
		roundedRect(startButtonX,buttonY,widthStart+buttonPadding,buttonHeight,borderRadius);
		window.ctx.fillText(startString, 150, 450);
		roundedRect(instructionButtonX,buttonY,widthInstructions+buttonPadding,buttonHeight, borderRadius);
		window.ctx.fillText(instructions, 300, 450);
	}

	else if(level === 4){
		menu = true;

		window.ctx.drawImage(cloud.image,cloud.sx,cloud.losesy,cloud.sWidth,
		cloud.sHeight,cloud.dx, cloud.dy, 425,306);

		window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";

		window.ctx.font="30px Consolas";
		var widthInstructions = window.ctx.measureText(instructions).width;
		var widthStart = window.ctx.measureText(startString).width;
		roundedRect(startButtonX,buttonY,widthStart+buttonPadding,buttonHeight,borderRadius);
		window.ctx.fillText(startString, 150, 450);
		roundedRect(instructionButtonX,buttonY,widthInstructions+buttonPadding,buttonHeight, borderRadius);
		window.ctx.fillText(instructions, 300, 450);
	}



	//Top Info Bar
	else{
		menu = false;
		instruction = false;
		drawPowerups();
		window.ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
		window.ctx.fillRect(0,0,600,topOffset);
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

		
        

		//Iterate through the grid and draw boxes in each slot
		for(i = 0; i < gridBoard.colNums; i++){
			for(j = 0; j < gridBoard.rowNums; j++){

				//width of the box
				var w = gridBoard.blockWidth;

				//Height of the box
				var h = gridBoard.blockHeight;


				//x coordinate of the box
				var xcoord = (gridBoard.xcoord + gridBoard.blockWidth*i);

				//y coordinate of the box
				var ycoord = (gridBoard.ycoord + gridBoard.blockHeight*j);

				//Create a local variable to store the brokenBox image, as the reference to the box is gone
				var image = new Image();
				image.src = "assets/brokenBox.png";

				if(gridBoard.brokenBlocks[j][i] > 0){
				    window.ctx.globalAlpha = gridBoard.brokenBlocks[j][i]/100;
                    gridBoard.brokenBlocks[j][i]-= 2;
                    window.ctx.drawImage(image, xcoord, ycoord, w - gridBoard.buffer, h - gridBoard.buffer);
                    window.ctx.globalAlpha = 1;
                }

                var image = new Image();
                image.src = "assets/brokenBox.png";
                if(!!gridBoard.blocks[j][i]){
                	if(typeof(gridBoard.blocks[j][i].p) === 'object')
                		if(gridBoard.blocks[j][i].breakable){
                    		window.ctx.drawImage(image, xcoord, ycoord, w - gridBoard.buffer, h - gridBoard.buffer);
                		}
                    	else{
                    		window.ctx.drawImage(gridBoard.blocks[j][i].boxImage, xcoord, ycoord, w - gridBoard.buffer, h - gridBoard.buffer);
                    	}

                    else
	                    window.ctx.drawImage(gridBoard.blocks[j][i].boxImage, xcoord, ycoord, w - gridBoard.buffer, h - gridBoard.buffer);
                }
			}

		}
        
        drawMessage();

        drawBall();
	}
}

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
