class GameRunner {
  constructor(size) {
    this.pop = new Population();
    this.step = 0;
    this.chunks = [];
    for (let i = 0; i<10; i++) {
      addChunk();
    }
  }

  update() {
    if (this.step%100 === 0) {
      addChunk();
    }
    this.pop.update(chunks[chunks.length-9, chunks[chunks.length-8]]);
    step++;
  }

  show() {
    this.pop.show();
  }

  addChunk() {
    this.chunks.push(round(random(5)));
  }
}
