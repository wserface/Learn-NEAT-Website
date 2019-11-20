class Obstacle {
  constructor() {
    this.x = width+round(random(100));
    this.hgt = round(random(2)+1);
  }
  
  update() {
    this.x -= 2.5;
  }
  
  show() {
    rect(this.x-5, 2*height/3-this.hgt*20, 10, this.hgt*20);
  }
  
  touching(pos) {
    return (pos.x > 0);
  }
}
