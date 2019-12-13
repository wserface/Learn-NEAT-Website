class Bot {
  constructor() {
    this.hgt = 0;
    this.vel = 0;
    this.brain = new Network(4, 2, 1);
  }

  update(cHeight, nHeight) {
    if (this.pos > 0) {
      this.vel -= 0.5;
      this.pos += this.vel;
    }
    if (this.pos < 0) {
      this.vel = 0;
      this.pos = 0;
    }

    this.brain.clear();
    this.brain.update([this.hgt, cHeight, nHeight, 1]);
    if (this.brain.outputs[0] > 0) {
      this.jump();
    }
  }

  show () {
    fill(0);
    rect(150, height-150-this.hgt, 10, 10);
  }

  mutate() {
  }

  jump() {
    if (this.hgt === 0) {
      this.vel = 10;
      this.hgt += this.vel;
    }
  }

  clone() {
  }
}
