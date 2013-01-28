//This function is used to check if the ball passes outside the canvas bounds
function checkBounds(){
    if(ball.y+ball.h > canvas.height)
        endGame();
    if(ball.y < 0)
        ball.yVelocity = -1 * ball.yVelocity;
    if(ball.x < 0 || ball.x+ball.h > canvas.width)
        ball.xVelocity = -1 * ball.xVelocity;
}

//This function is used to determine if the ball has hit a box
function checkBallHit(){
    
    var bounceDirection = grid.breakBlock(ball);

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
    console.log("box's coordinates are: " + obj.x + ", " + obj.y);
    if(typeof(obj.p) === 'object'){
        console.log("powerup's coordinates are: " + obj.p.x + ", " + obj.p.y);
        dropPowerup(obj.p);
    }
}

function checkPowerupHitBar(obj){
    if(obj.y + obj.h > bar.ycoord && obj.y < bar.ycoord + bar.h/2)
        if(obj.x + obj.w > bar.xcoord && obj.x < bar.xcoord + bar.w){
            if(obj.type === 0){
                ball.w = ball.w*3;
                ball.h = ball.h*3;
                setTimeout(function(){
                    ball.w = ball.w/3;
                    ball.h = ball.h/3;
                }, 4000);
            }
            pArray[pArray.indexOf(obj)] = 0;
        }
}












