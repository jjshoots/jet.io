const screenWidth = screen.width;
const screenHeight = screen.height;

var obsLine = [
	[0, 0, screenWidth, 0],
	[0, screenHeight, screenWidth, screenHeight],
	[0, 0, 0, screenHeight],
	[screenWidth, screenHeight, screenWidth, screenHeight]
];



function setup() {
  createCanvas(screenWidth, screenHeight);
  background(255);
  obj = new sun(20, screenWidth, screenHeight);
}

function draw() {
	clear();
	obj.update();
	obj.findC();
	obj.interceptScreenEdges();
	obj.cast();
	// noLoop();
}