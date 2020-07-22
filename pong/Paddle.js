class Paddle {
	constructor(left){
		this.y = height/2;
		this.w = 10;
		this.h = 100;
		if (left) {
			this.x = this.w;
		} else {
			this.x = width - this.w;
		}

		this.ychange = 0;
	}

	show() {
		fill(255);
		rectMode(CENTER);
		rect(this.x,this.y,this.w,this.h);
	}

	move(steps) {
		this.ychange = steps;
	}

	update() {
		this.y += this.ychange;
		this.y = constrain(this.y,this.h/2,height - this.h/2);
	}

	checkCollision(p) {
		if (p.y < this.y + this.h/2 && p.y > this.y - this.h/2) {
			if (abs(this.x - p.x) <= p.r) {
				p.xspeed *= -1;
			}
		}
	}

}