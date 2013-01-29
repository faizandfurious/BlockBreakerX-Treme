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
	if(gridBoard.count() === 0){
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
			window.ctx.save();
			window.ctx.translate(instructionStartButtonX + 15, 450);
			window.ctx.fillText(startString, 0,0);
			window.ctx.restore();


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
	                if(!!gridBoard.blocks[j][i])
	                	if(typeof(gridBoard.blocks[j][i].p) === 'object')
	                    	window.ctx.drawImage(image, xcoord, ycoord, w - gridBoard.buffer, h - gridBoard.buffer);
	                    else
		                    window.ctx.drawImage(gridBoard.blocks[j][i].boxImage, xcoord, ycoord, w - gridBoard.buffer, h - gridBoard.buffer);
				}
			}

		}
	}
}