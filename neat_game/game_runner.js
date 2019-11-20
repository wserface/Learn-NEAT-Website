class GameRunner {
  constructor(size) {
    this.pop = new Population(size);
    this.step = 0;
    this.chunks = [];
  }

  update() {
    this.pop.update();
    this.step++;
  }

  show() {
    this.pop.show();
  }

  generateChunk() {
    this.chunks.push(new Chunk());
  }
}

class Chunk {
  constructor() {
    this.obstacle = null;
    this.hasObstacle = false;
    if (random(1)>0.75) {
      this.obstacle = new Obstacle();
      this.hasObstacle = true;
    }
  }
}
