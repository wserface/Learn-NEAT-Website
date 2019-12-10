class GameRunner {
  constructor(size) {
    this.pop = new Population();
    this.step = 0;
    this.chunks = [];
  }

  load() {
    for (let i = 0; i<10; i++) {
      this.chunks.push(round(random(5)));
    }
  }

  update() {
    if (this.step%100 === 0) {
      this.chunks.push(round(random(5)));
    }
    this.pop.update(this.chunks[this.chunks.length-9], this.chunks[this.chunks.length-8]);
    this.step++;
  }

  show() {
    this.pop.show();
  }
}
