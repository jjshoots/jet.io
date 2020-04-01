const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(255);
  obj = new sun(20, screenWidth, screenHeight);
  objLines = new obsLine();

  // z
  objLines.parseIn([100, 100], [300, 100]);
  objLines.parseIn([300, 100], [100, 300]);
  objLines.parseIn([100, 300], [300, 300]);

  // o
  objLines.parseIn([350, 100], [550, 100]);
  objLines.parseIn([550, 100], [550, 300]);
  objLines.parseIn([550, 300], [350, 300]);
  objLines.parseIn([350, 300], [350, 100]);

  // e
  objLines.parseIn([600, 100], [800, 100]);
  objLines.parseIn([600, 200], [800, 200]);
  objLines.parseIn([600, 300], [800, 300]);
  objLines.parseIn([600, 100], [600, 300]);

  // y
  objLines.parseIn([850, 100], [950, 200]);
  objLines.parseIn([1050, 100], [950, 200]);
  objLines.parseIn([950, 200], [950, 300]);
}

function draw() {
	clear();
	obj.update();
	obj.findC();
	obj.interceptScreenEdges();
	// objLines.draw();


	for(var i = 0; i < objLines.numLines; i++){
		obj.findIntercept(objLines.parseOut(i));
	}

	obj.cast();
	// noLoop();
}