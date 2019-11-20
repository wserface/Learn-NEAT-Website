class Obstacle {
  constructor(x1, y1, x2, y2) {
    this.p1 = createVector(0, 0);
    this.p2 = createVector(0, 0);
    if (x1 < x2) {
      if (y1 < y2) {
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
      } else {
        this.p1 = createVector(x1, y2);
        this.p2 = createVector(x2, y1);
      }
    } else {
      if (y1 < y2) {
        this.p1 = createVector(x2, y1);
        this.p2 = createVector(x1, y2);
      } else {
        this.p1 = createVector(x2, y2);
        this.p2 = createVector(x1, y1);
      }
    }
  }

  touching(vector) {
    return (vector.x > this.p1.x && vector.x < this.p2.x && vector.y > this.p1.y && vector.y < this.p2.y);
  }

  show() {
    fill(255, 0, 0);
    rect(this.p1.x, this.p1.y, this.p2.x-this.p1.x, this.p2.y-this.p1.y);
  }
}
