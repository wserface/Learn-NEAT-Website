class Bot {
  constructor() {
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.isBest = false;

    this.brain = new Network(5, 4, 2);
    this.fitness = 0;
  }

  update(nextObs) {
    //Physics
    if (this.pos.y > 0) {
      this.vel.y -= 0.5;
      this.pos.y += this.vel.y;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 0;
    }

    //Neural Network
    //Input 1: Y Position
    //Input 2: Distance to next obstacle
    //Input 3: Height Value of next obstacle
    //Input 4: Speed
    //Input 5: Bias
    /*let action = this.brain.update([this.pos.y, nextObs.x, nextObs.hgt, this.vel.y, 1]);
    if (action === 1) {
      this.jump();
    }*/
  }

  show() {
    if (this.isBest) {
      fill(0);
    } else {
      fill(0, 255, 0);
    }
    ellipse(width/4, 2*height/3-(this.pos.y*5), 25, 25);
  }

  jump() {
    if (this.pos.y === 0) {
      this.vel.y += 5;
      this.pos.y += 0.1;
    }
  }

  calculateFitness() {
    this.fitness = this.pos.x;
  }

  clone() {
    let out = new Bot();
    out.brain = this.brain.clone();
    return out;
  }
}
