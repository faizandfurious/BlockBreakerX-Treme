//Creating the grid to place boxes into.
var grid = function(){
	var exports = {};

	//Leave space between each block
	exports.buffer = 2;

	//The number of rows and columns
	exports.rowNums = 3;
	exports.colNums = 7;
    
    var arr = Array(exports.rowNums);

    for(var y = 0; y < exports.rowNums; y++) {
        arr[y] = Array(exports.colNums);
        for(var x = 0; x<exports.colNums; x++) {
            arr[y][x] = true;
        }
    }

    exports.blocks = arr;
    
    //integer array representing transparency of broken block images
    var arr2 = Array(exports.rowNums);

    for(var y = 0; y < exports.rowNums; y++) {
        arr2[y] = Array(exports.colNums);
        for(var x = 0; x<exports.colNums; x++) {
            arr2[y][x] = 0;
        }
    }

    exports.brokenBlocks = arr2;

	//The coordinates of the grid
	exports.xcoord = 100 - (exports.colNums*exports.buffer)/2;
	exports.ycoord = 100 - (exports.rowNums*exports.buffer)/2;;

	//The width and height of the grid
	exports.w = window.canvas.width - exports.xcoord*2;
	//TODO Remove fixed number, find appropriate ratio
	exports.h = window.canvas.height*.6 - exports.ycoord*2;

	//The width and height of each slot
	exports.blockWidth = exports.w/exports.colNums;
	exports.blockHeight = exports.h/exports.rowNums;

    exports.inGrid = function(x, y){
        return (x > exports.xcoord && x < exports.xcoord + exports.w) &&
               (y > exports.ycoord && y < exports.ycoord + exports.h);
    }

    function breakBlockByCorner(obj,x,y){
        var row = getBrickRow(x,y);
        var col = getBrickCol(x,y); 
        
        //if there's no longer a block there do nothing
        if(!exports.blocks[row][col])
            return false;
        
        

        return true;
    }

    function getBrickRow(x,y){
        return Math.floor((y - exports.ycoord) / exports.blockHeight);
    }
    function getBrickCol(x,y){
        return Math.floor((x - exports.xcoord) / exports.blockWidth);
    }

    exports.breakBlock = function(obj){

        //Array keeping track of which corners overlap block to 
        //determine which direction ball should bounce 
        //[top left, top right, bottom right, bottom left]
        var bounceDirection = [false,false,false,false];

        var removeList = [];

        //Check all four corners
        if(grid.inGrid(ball.x, ball.y)){
            removeList.push(getBrickRow(ball.x, ball.y));
            removeList.push(getBrickCol(ball.x, ball.y));
            bounceDirection[0] = breakBlockByCorner(ball, ball.x, ball.y);
        }

        if(grid.inGrid(ball.x+ball.w, ball.y)){
            removeList.push(getBrickRow(ball.x+ball.w, ball.y));
            removeList.push(getBrickCol(ball.x+ball.w, ball.y));
            bounceDirection[1] = breakBlockByCorner(ball, ball.x+ball.w, ball.y);
        }

        if(grid.inGrid(ball.x+ball.w, ball.y+ball.h)){
            removeList.push(getBrickRow(ball.x+ball.w, ball.y+ball.h));
            removeList.push(getBrickCol(ball.x+ball.w, ball.y+ball.h));
            bounceDirection[2] = breakBlockByCorner(ball, ball.x+ball.w, ball.y+ball.h);
        }

        if(grid.inGrid(ball.x, ball.y+ball.h)){
            removeList.push(getBrickRow(ball.x, ball.y+ball.h));
            removeList.push(getBrickCol(ball.x, ball.y+ball.h));
            bounceDirection[3] = breakBlockByCorner(ball, ball.x, ball.y+ball.h);
        }
        
        //if there is a block there remove it
        if(bounceDirection[0] || bounceDirection[1] || bounceDirection[2] || bounceDirection[3])
            for(var i = 0; i<removeList.length; i+=2){
                if(exports.blocks[removeList[i]][removeList[i+1]]) {
                    exports.brokenBlocks[removeList[i]][removeList[i+1]] = 100;
                    exports.blocks[removeList[i]][removeList[i+1]] = false;
                } 
            }           

        return bounceDirection;
            
    }

    //Returns the count of blocks left
    exports.count = function(){
        var num = 0;
        for(var y = 0; y < exports.rowNums; y++) {
            for(var x = 0; x<exports.colNums; x++) {
                //Checks if there is a block at that position
                if(exports.blocks[y][x]){
                    ++num;
                }
            }
        }

        return num;
    }

	return exports;

}();
