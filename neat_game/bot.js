class Bot {
  constructor() {
    this.hgt = 0;
    this.brain = new Network(4, 2, 1);
  }

  update(cHeight, nHeight) {
    this.network.clear();
    this.network.update([hgt, cHeight, nHeight, 1]);
    if (this.network.outputs[0] > 0) {
      this.jump();
    }
  }

  show () {
    rect(150, height-150-this.hgt, 10, 10);
  }

  mutate() {
  }

  jump() {
  }

  clone() {
  }
}
