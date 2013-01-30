//The bar object
var bar = function(){
	var exports = {};

    exports.vMax = 14;
    exports.vMin = -14;
    exports.velocity = 0;
    exports.acceleration = 0;
    
    //semaphore for keys to make smoother change of directions
    exports.dLock = 0; 	
    
    exports.image = new Image();
	exports.xcoord = 300;
	exports.ycoord = 530;
	exports.w = 120;
	exports.h = 25;
	exports.image.src = "assets/bar.png";

	return exports;

}();

//The box object
function box(x, y, p) {
    if (p === undefined)
        this.p = -1;
    else
    	this.p = p;
	this.x = x;
	this.y = y;
	this.boxImage = new Image();
	this.boxImage.src = "assets/box.png";
	
};

var tempMessage = function(){
    var exports = {};
    
    var message = "";

    exports.count = 0;
    
    exports.create = function(x){
        message = x;
        exports.count = 100;
    }


    exports.showText = function(){
        if(exports.count > 0){
            exports.count -= 1;
            return message;
        }
        return "";
    }
    
    return exports;
}();

//The ball object
var ball = function(){
	var exports = {};

	//Not moving, 1 means moving
	exports.state = 0;

	//Express Ball's trajectory and motion as vertical and horizontal velocities
    exports.xVelocity = 0;
    exports.yVelocity = 0;

	exports.x = 5;
	exports.y = 5;
	exports.w = 20;
	exports.h = 20;

	exports.image = new Image();
	exports.image.src = "assets/ball.png";



	return exports;
}();

var background = function(){
	var exports = {};
	exports.image = new Image();
	exports.sx = 0;
	exports.sy = 3000;
	exports.sWidth = 600;
	exports.sHeight = 600;
	exports.dx = 0;
	exports.dy = 0;
	exports.dWidth = 600;
	exports.dHeight = 600;
	exports.image.src = "assets/background.png"

	return exports;
}();

var cloud = function(){
	var exports = {};
	exports.image = new Image();
	exports.sx = 0;
	exports.winsy = 0;
	exports.losesy = 306;
	exports.sWidth = 425;
	exports.sHeight = 306;
	exports.dx = 100;
	exports.dy = 30;
	exports.dWidth = 425;
	exports.dHeight = 306;
	exports.image.src = "assets/cloud.png"

	return exports;
}();

var life = function(){
	var exports = {};
	exports.image = new Image();
	exports.image.src = "assets/ball.png"
	return exports;
}();

function roundedRect(x,y,width,height,radius){
    window.ctx.beginPath();
    window.ctx.moveTo(x,y+radius);
    window.ctx.lineTo(x,y+height-radius);
    window.ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    window.ctx.lineTo(x+width-radius,y+height);
    window.ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    window.ctx.lineTo(x+width,y+radius);
    window.ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    window.ctx.lineTo(x+radius,y);
    window.ctx.quadraticCurveTo(x,y,x,y+radius);
    window.ctx.stroke();
    window.ctx.save();
    window.ctx.globalAlpha = 0.5;
	window.ctx.fillStyle = "rgba(60, 70, 39, 1)";
    window.ctx.fill();
    window.ctx.restore();
}

/**
This object represents the powerup object model. It takes the coordinates of it's origin
**/
function powerup(x, y, w, h, kind){
    if (kind === undefined)
        this.kind = 0;
    else
    	this.kind = kind;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.image = new Image();
	this.image.src = "assets/powerup.png";

};
