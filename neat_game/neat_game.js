function setup() {
  let can = createCanvas(960, 540);
  can.parent("#demo");
  frameRate(30);
  background(200);
  text("NEAT Demonstration\n\n       Click to Start", width/2-75, height/2);
  this.on = false;
}

function draw() {
  if (this.on) {
    background(200);
    this.game.update();
    this.game.show();
  }
}

function mouseReleased() {
  if (!this.on) {
    this.on = true;
    this.game = new GameRunner(450);
    this.gen = 1;
  } else {
    this.game.pop.bots[0].jump(this.game.chunks[this.game.chunks.length-14]);
  }
}

function sigmoid(n) {
  return 1/(1+pow(3, 0-n));
}

function consoleLog(msg) {
  document.getElementById("console").innerHTML = msg;
}

function newMap() {
  let newGame = new GameRunner(0);
  newGame.pop = this.game.pop.nextGen();
  this.game = newGame;
  this.gen++;
}