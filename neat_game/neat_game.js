function setup() {
  createCanvas(960, 540);
  frameRate(30);
  this.on = false;
  this.player = new Bot();
}


function draw() {
  if (this.on) {
    this.game.update();
    this.game.show();
  } else {
    background(200);
    text("NEAT Game\n\nClick to Start.", width/2-50, height/2-5);
    this.player.update();
    this.player.show();
  }
}

function mouseReleased() {
  this.on = true;
  this.game = new GameRunner();
}

function keyReleased() {
  if (key === ' ') {
    this.player.jump();
  }
}

function sigmoid(n) {
  return 2*(1/(1+pow(5, 0-n)))-1;
}
