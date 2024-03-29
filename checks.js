//This function is used to check if the ball passes outside the canvas bounds
function checkBounds(){
    if(ball.y+ball.h > canvas.height)
        endGame();
    if(ball.y < topOffset){
        ball.y = topOffset+1;
        ball.yVelocity = -1 * ball.yVelocity;
    }
    if(ball.x < 0 || ball.x + ball.h > canvas.width){
        if(ball.x < 0){
            ball.x = 1;
        }
        else{
            ball.x = ball.x - 1;
        }
        ball.xVelocity = -1 * ball.xVelocity;
    }
}

//This function is used to determine if the ball has hit a box
function checkBallHit(){
    
    var bounceDirection = gridBoard.breakBlock(ball);

    //construct binary representation of direction for switch statement 
    var binaryDirection = 0;
    for(var i = 0; i< 4 ; i++)
        if(bounceDirection[i])
            binaryDirection += Math.pow(2,(3-i));
    
    switch(binaryDirection){
        case 0:
            break;
        case 1:
        case 11:
            ball.xVelocity = Math.abs(ball.xVelocity);
            ball.yVelocity = -1*Math.abs(ball.yVelocity);
            break;
        case 2:
        case 7:
            ball.xVelocity = -1*Math.abs(ball.xVelocity);
            ball.yVelocity = -1*Math.abs(ball.yVelocity);
            break;
        case 3:
            ball.yVelocity = -1*Math.abs(ball.yVelocity);
            break;
        case 4:
        case 14:
            ball.xVelocity = -1*Math.abs(ball.xVelocity);
            ball.yVelocity = Math.abs(ball.yVelocity);
            break; 
        case 15:
            ball.xVelocity = -1*Math.abs(ball.xVelocity);
            ball.yVelocity = Math.abs(ball.yVelocity);
            break;
        case 5:
            break;
        case 6:
            ball.xVelocity = -1*Math.abs(ball.xVelocity);
            break;
        case 8:
        case 13:
            ball.xVelocity = Math.abs(ball.xVelocity);
            ball.yVelocity = Math.abs(ball.yVelocity);
            break;
        case 9:
            ball.xVelocity = Math.abs(ball.xVelocity);
            break;
        case 10:
            break;
        case 12:
            ball.yVelocity = Math.abs(ball.yVelocity);
            break;
        default:
            break;
    } 
}

//This function is used to check if the ball has hit the bar
function checkBarHit() {
    if(ball.y + ball.h > bar.ycoord && ball.y < bar.ycoord + bar.h/2)
        if(ball.x + ball.w > bar.xcoord && ball.x < bar.xcoord + bar.w){
            ball.xVelocity += bar.velocity/2;
            if(ball.xVelocity > bar.vMax)
                ball.xVelocity = bar.vMax;
            else if(ball.xVelocity < bar.vMin)
                ball.xVelocity = bar.vMin;
            ball.yVelocity = -1*Math.abs(ball.yVelocity);
        }
}

//This function is used to check to see if a powerup should be initiated
function checkPowerup(obj){
    if(typeof(obj.p) === 'object'){
        //Checks to ensure the powerup is not the unbreakable powerup
        if(obj.p.kind !== 3){
            dropPowerup(obj.p);
        }
    }
}

function checkPowerupHitBar(obj){
    if(obj.y + obj.h > bar.ycoord && obj.y < bar.ycoord + bar.h/2){
        if(obj.x + obj.w > bar.xcoord && obj.x < bar.xcoord + bar.w){
            //Make the ball bigger
            if(obj.kind === 0){
                tempMessage.create("Super-Sized Apple!");
                ball.w = ball.w*1.5;
                ball.h = ball.h*1.5;
                ball.x = ball.x - ball.w/2;
                ball.y = ball.y - ball.h/2;
                setTimeout(function(){
                    ball.x = ball.x + ball.w/2;
                    ball.y = ball.y + ball.h/2;
                    ball.w = ball.w/1.5;
                    ball.h = ball.h/1.5;
                }, 6000);
            }

            //Make the bar bigger
            if(obj.kind === 1){
                tempMessage.create("Extended Log!");
                bar.w = bar.w*1.5;
                bar.x = bar.x + bar.w/2;
                setTimeout(function(){
                    bar.w = bar.w/1.5;
                    bar.x = bar.x + bar.w;
                }, 6000);
            }
            //Add one to the lives
            if(obj.kind === 2){
                tempMessage.create("Extra Life!");
                lives++;
            }

            pArray[pArray.indexOf(obj)] = 0;
        }
    }
}












