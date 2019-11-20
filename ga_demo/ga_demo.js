function setup() {
  var can = createCanvas(960, 540);
  can.parent("#demo");
  frameRate(30);
  background(200);
  console.log("Welcome to a demonstration on Genetic Algorithms.\n\nSee https://www.github.com/code-bullet, who inspired this project.\n\nClick the frame to start the program.");
  text("Genetic Algorithm Demonstration based on Code Bullet (github/code-bullet)'s \"Smart Dots Genetic Algorithm Tutorial\"\n\n                                            Data Summary in Console (Ctrl/Cmd Shift I). Click to start.", width/2-300, height/2);
  this.on = false;
}


function draw() {
  if (this.on) {
    if (!this.pop.allDotsDead()) {
      background(200);
      fill(0, 0, 255);
      ellipse(this.goal.x, this.goal.y, 15, 15);
      for (let i = 0; i<this.obs.length; i++) {
        obs[i].show();
      }
      pop.update();
      pop.show();
    } else {
      this.pop.nextGen();
    }
  }
}

function mouseReleased() {
  if (!this.on) {
    this.on = true;
    console.log("Data on each of the generations are recorded here.\n");
    this.pop = new Population(300);
    this.goal = createVector(width/2, 20);
    this.obs = new Array(5);
    this.obs[0] = new Obstacle(width/2-100, 3*height/7-5, width/2+100, 3*height/7+5);
    this.obs[1] = new Obstacle(width/2-400, 3*height/7-5, width/2-200, 3*height/7+5);
    this.obs[2] = new Obstacle(width/2+400, 3*height/7-5, width/2+200, 3*height/7+5);
    this.obs[3] = new Obstacle(width/2-200, 2*height/7-5, width/2-100, 2*height/7+5);
    this.obs[4] = new Obstacle(width/2+100, 2*height/7-5, width/2+200, 2*height/7+5);
  }
}
