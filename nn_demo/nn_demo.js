function setup() {
  var can = createCanvas(1920/2, 1080/2);
  can.parent("#demo");
  frameRate(1);
  this.on = false;
  this.auto = true;
}

function draw() {
  if (this.on) {
    if (this.auto) {
      background(200);
      this.net.clear();
      this.net.update();
      this.net.visualize();
      this.max = this.net.outputs[0].sum;
      this.maxIndex = 0;
      for (let i = 0; i<this.net.outputs.length; i++) {
        if (this.max<this.net.outputs[i].sum) {
          this.max = this.net.outputs[i].sum;
          this.maxIndex = i;
        }
      }
      stroke(0);
      strokeWeight(1);
      fill(0);
      text("Max Output: "+this.max+"\nNode Index: "+this.maxIndex, 10, 20);
    }
  } else {
    background(200);
    stroke(0);
    strokeWeight(1);
    text("                Neural Network Visualizer\n\n                           Click to Start.", width/2-125, height/2-25);
  }
}


//Resets the entire network or updates it
function keyReleased() {
  if (this.on) {
    if (key === 'r') {
      this.net = new Network(this.net.inputs.length, this.net.calcs.length, this.net.outputs.length);
    } else if (key === ' ') {
      this.auto = !this.auto;
    }
  }
}

function mouseReleased() {
  if (!this.on) {
    this.on = true;
    console.log("Welcome to the Neural Network Visualizer.\n\nIf a Node or Connection is Blue, it's value is positive.\n\nIf a Node of Connection is Red, it's value is negative.\n\nThickness of the lines represent the weight of the connection.\n\nPress R to make a new Network.");
    this.net = new Network(5, 4, 2);
  }
}

function sigmoid(n) {
  return 2*(1/(1+pow(5, 0-n)))-1;
}
