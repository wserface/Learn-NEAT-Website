class Brain {
  constructor(size) {
    this.index = 0;
    this.dirs = [];
    for (let i = 0; i<size; i++) {
      this.dirs[i] = p5.Vector.fromAngle(random(TWO_PI));
    }
  }

  giveDirs() {
    if (this.index < this.dirs.length) {
      let out = createVector(this.dirs[this.index].x, this.dirs[this.index].y);
      this.index++;
      return out;
    } else {
      return "Out of directions";
    }
  }

  mutate() {
    for (let i = 0; i<this.dirs.length; i++) {
      if (random(1)<0.025) {
        this.dirs[i] = p5.Vector.fromAngle(random(TWO_PI));
      }
    }
  }

  clone() {
    let out = new Brain(1);
    let outList = [];
    for (let i = 0; i<this.dirs.length; i++) {
      outList[i] = createVector(this.dirs[i].x, this.dirs[i].y);
    }
    out.dirs = outList;
    return out;
  }
}
