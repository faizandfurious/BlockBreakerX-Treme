//Global variables
//canvas element
canvas = document.getElementById("myCanvas");
//context element
ctx = canvas.getContext("2d");
//Bar speed multiplier
speed = 1;
stop = false;
win = false;
pArray = new Array(5);

//Initial board size
gridBoard = null;
largeBar = false;
startString = "Start";
instructions = "Instructions";
level = 0;
buttonPadding = 30;
startButtonX = 135;
instructionStartButtonX = 285;
instructionButtonX = 285;
buttonY = 415;
borderRadius = 10;
buttonHeight = 45;
menu = false;
instruction = false;
playable = false;
topOffset = 40;

//life 
lives = 3;
