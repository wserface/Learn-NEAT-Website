class GameRunner {
  constructor(size) {
    this.pop = new Population(size);
    this.step = 0;
    this.chunks = [];
    this.chunks[0] = 2;
    for (let i = 1; i<10; i++) {
      this.chunks.push(this.chunks[this.chunks.length-1]+(round(random(4)-2)));
    }
  }

  update() {
    if (this.pop.allBotsDead()) {
      this.pop.nextGen();
    } else {
      if (this.step%250 === 0) {
        this.chunks.push(this.chunks[this.chunks.length-1]+(round(random(4)-2)));
      }
      this.pop.update(this.chunks[this.chunks.length-14], this.step%250, this.chunks[this.chunks.length-13], this.step);
      this.step += 5;
    }
  }

  show() {
    for (let i = 0; i<this.chunks.length; i++) {
      fill(100);
      if (i === this.chunks.length-14) {
        fill(0, 255, 0);
      }
      if (i === this.chunks.length-13) {
        fill(255, 0, 0);
      }
      rect(width+((i*250)-this.step), height-100-(25*this.chunks[i]), 250, height);
    }
    this.pop.show();
  }
}
