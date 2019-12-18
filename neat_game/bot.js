class Bot {
  constructor() {
    this.hgt = height-170;
    this.vel = 0;
    this.brain = new Network(4, 2, 1);
  }

  update(cHeight, nDist, nHeight) {
    if (this.hgt < height-120-(25*cHeight)) {
      this.vel += 0.25;
      this.hgt += this.vel;
    }
    if (this.hgt > height-120-(25*cHeight)) {
      this.vel = 0;
      this.hgt = height-120-(25*cHeight);
    }

    /*
    this.brain.clear();
     this.brain.update([this.hgt, cHeight, nDist, nHeight, 1]);
     if (this.brain.outputs[0] > 0) {
     this.jump();
     }*/
  }

  show () {
    fill(0);
    rect(200, this.hgt+10, 10, 10);
  }

  mutate() {
  }

  jump(cHeight) {
    if (this.hgt === height-120-(25*cHeight)) {
      this.vel = 0-6;
      this.hgt -= 0.1;
      document.getElementById("console").innerHTML = `${this.hgt}, ${this.vel}, ${height-120-(25*cHeight)}`;
    }
  }

  clone() {
  }
}
