class Bot {
  constructor() {
    this.hgt = height-170;
    this.vel = 0;
    this.brain = new Network(4, 2, 1);
    this.alive = true;
    this.fitness = 0;
    this.isBest = false;
  }

  update(cHeight, nDist, nHeight, score) {
    if (this.alive) {
      this.fitness = score;
      if (this.hgt < height-120-(25*cHeight)) {
        this.vel += 0.25;
        this.hgt += this.vel;
      }
      if (this.hgt > height-120-(25*cHeight)) {
        if ((this.hgt-(height-120-(25*cHeight))) < 4) {
          this.vel = 0;
          this.hgt = height-120-(25*cHeight);
        } else {
          this.alive = false;
        }
      }
      this.brain.clear();
      this.brain.update([this.hgt, cHeight, nDist, nHeight, 1]);
      if (this.brain.outputs[0].sum > 0) {
        this.jump(cHeight);
      }
    }
  }

  show() {
    if (this.alive) {
      if (this.isBest) {
        fill(0, 255, 0);
      } else {
        fill(0);
      }
      rect(200, this.hgt+10, 10, 10);
    }
  }

  jump(cHeight) {
    if (this.hgt === height-120-(25*cHeight)) {
      this.vel = 0-6;
      this.hgt -= 0.1;
    }
  }

  mutate() {
    this.brain.mutate();
  }

  clone() {
    let out = new Bot();
    out.brain = this.brain.clone();
    return out;
  }
}
