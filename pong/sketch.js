
let puck; 
let left;
let right;

function setup() {
  // createCanvas(800, 800);
  createCanvas(600,400);
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
  
}

function draw() {
  	background(50);

  	// puck.checkCollision(left);
  	// puck.checkCollision(right);


  	left.checkCollision(puck);
  	right.checkCollision(puck);

  	puck.update();
  	puck.edges();
	puck.show();

	left.show();
	right.show();
	left.update();
	right.update();

}

function keyReleased() {
	left.move(0);
	right.move(0);
}

function keyPressed() {
	if (key == 'w') {
		left.move(-10);
	} else if (key == 's') {
		left.move(10);
	}


	if (keyCode == UP_ARROW) {
		right.move(-10);
	} else if (keyCode == DOWN_ARROW) {
		right.move(10);
	}
}





