class GameRunner {
  constructor(size) {
    this.pop = new Population(150);
    this.step = 0;
    this.chunks = [];
    this.chunks[0] = 2;
    for (let i = 1; i<10; i++) {
      this.chunks.push(this.chunks[this.chunks.length-1]+(round(random(4)-2)));
      console.log(this.chunks[this.chunks.length-1]);
    }
  }

  load() {
    this.chunks[0] = 2;
    for (let i = 1; i<10; i++) {
      this.chunks.push(this.chunks[this.chunks.length-1]+(round(random(4)-2)));
      console.log(this.chunks[this.chunks.length-1]);
    }
  }

  update() {
    if (this.step%250 === 0) {
      this.chunks.push(this.chunks[this.chunks.length-1]+(round(random(4)-2)));
      console.log(this.chunks[this.chunks.length-1]);
    }
    this.pop.update(this.chunks[this.chunks.length-9], this.chunks[this.chunks.length-8]);
    this.step += 5;
  }

  show() {
    for (let i = 0; i<this.chunks.length; i++) {
      fill(100);
      if(i === this.chunks.length-14){
        fill(255, 0, 0);
      }
      rect(width+((i*250)-this.step), height-100-(25*this.chunks[i]), 250, height);
    }
    this.pop.show();
  }
}
