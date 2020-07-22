class Puck {
	constructor(){
	this.x = width/2;
	this.y = height/2;
	this.xspeed = 3;
	this.yspeed = 1;
	this.r = 12;
	}

	show() {
		ellipse(this.x,this.y,this.r*2,this.r*2);
	}

	update() {
		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;
	}

	reset() {		
		this.x = width/2;
		this.y = height/2;
	}

	edges() {
		if (this.y < this.r || this.y > height - this.r){
			this.yspeed *= -1;
		}

		if (this.x > width){
			this.reset();
		}

		if (this.x < 0){
			this.reset();
		}
	}
}