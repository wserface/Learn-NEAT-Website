class Dot {
  constructor() {
    this.pos = createVector(width/2, height-20);
    this.vel = createVector(0, 0);
    this.brain = new Brain(1000);
    this.fitness = 0;
    this.alive = true;
    this.isBest = false;
    this.reachedGoal = false;
  }

  update() {
    if (this.alive) {
      let dir = this.brain.giveDirs();
      if (dir != "Out of directions") {
        this.vel.add(dir);
        this.vel.limit(10);
        this.pos.add(this.vel);
        if (dist(this.pos.x, this.pos.y, goal.x, goal.y) <= 10) {
          this.alive = false;
          this.reachedGoal = true;
        } else if (this.pos.x < 0) {
          this.alive = false;
        } else if (this.pos.y < 0) {
          this.alive = false;
        } else if (this.pos.x > width) {
          this.alive = false;
        } else if (this.pos.y > height) {
          this.alive = false;
        }
        for (let i = 0; i<obs.length; i++) {
          if (obs[i].touching(this.pos)) {
            this.alive = false;
          }
        }
      } else {
        this.alive = false;
      }
    }
  }

  show() {
    if (this.isBest) {
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, 10, 10);
    } else {
      fill(0);
      ellipse(this.pos.x, this.pos.y, 5, 5);
    }
  }

  calculateFitness() {
    if (this.reachedGoal) {
      this.fitness = (1.0/16.0 + 100000/pow(this.brain.index, 2));
    } else {
      let distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
      this.fitness = 1.0/(distanceToGoal * distanceToGoal);
    }
  }

  clone() {
    let out = new Dot();
    out.brain = this.brain.clone();
    return out;
  }
}
