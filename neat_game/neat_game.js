function setup() {
  let can = createCanvas(960, 540);
  can.parent("#demo");
  frameRate(30);
  background(200);
  text("NEAT Demonstration\n\n       Click to Start", width/2-75, height/2);
  this.on = false;
  this.game = new GameRunner(150);
}

function draw() {
  if (this.on) {
    this.game.update();
    this.game.show();
  }
}

function mouseReleased() {
  if (!this.on) {
    this.on = true;
  }
}

function sigmoid(n) {
  return 1/(1+pow(3, 0-n));
}
