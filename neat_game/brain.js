class Network {
  //Constructor
  constructor(ins, cas, ous) {
    this.outputs = [];
    this.calcs = [];
    this.inputs = [];

    //Sets data for each node of each list
    for (let i = 0; i<ous; i++) {
      this.outputs.push(new Node(createVector(3*(width/4), (i+1)*(height/(ous+1))), [], []));
    }

    for (let i = 0; i<cas; i++) {
      let w = [];
      for (let x = 0; x<ous; x++) {
        w.push(random(2)-1);
      }
      this.calcs.push(new Node(createVector(2*(width/4), (i+1)*(height/(cas+1))), this.outputs, w));
    }

    for (let i = 0; i<ins; i++) {
      let w = [];
      for (let x = 0; x<cas; x++) {
        w.push(random(2)-1);
      }
      this.inputs.push(new Node(createVector((width/4), (i+1)*(height/(ins+1))), this.calcs, w));
    }
  }

  update(list) {
    for (let i = 0; i<this.inputs.length; i++) {
      this.inputs[i].sum = list[i];
      this.inputs[i].output();
    }
    for (let c = 0; c<this.calcs.length; c++) {
      this.calcs[c].output();
    }
    for (let o = 0; o<this.outputs.length; o++) {
      this.outputs[o].output();
    }
  }

  //Visualizes all nodes
  show() {
    for (let i = 0; i<this.inputs.length; i++) {
      this.inputs[i].show(false);
    }
    for (let c = 0; c<this.calcs.length; c++) {
      this.calcs[c].show(false);
    }
    for (let o = 0; o<this.outputs.length; o++) {
      this.outputs[o].show(false);
    }
  }

  clear() {
    for (let i = 0; i<this.inputs.length; i++) {
      this.inputs[i].sum = 0;
    }
    for (let c = 0; c<this.calcs.length; c++) {
      this.calcs[c].sum = 0;
    }
    for (let o = 0; o<this.outputs.length; o++) {
      this.outputs[o].sum = 0;
    }
  }

  clone() {
  }
}

class Node {
  //Constructor
  constructor(p, o, w) {
    this.pos = p;
    this.sum = 0;
    if (o.length != w.length) {
      throw new Error("Make sure the output list has the same length as the weight list.");
    }
    this.outputs = o;
    this.weights = w;
  }

  //Takes input from another node
  input(i) {
    this.sum += i;
  }

  //Outputs data to connected nodes
  output() {
    let out = sigmoid(this.sum);
    for (let i = 0; i<this.outputs.length; i++) {
      this.outputs[i].input(out*this.weights[i]);
    }
  }

  //Shows the Node and Connections
  show(t) {
    //Visualizes connections before node
    for (let i = 0; i<this.outputs.length; i++) {
      let n = this.outputs[i];
      if (this.weights[i] > 0) {
        stroke(0, 0, 255);
      } else {
        stroke(255, 0, 0);
      }
      strokeWeight(abs(this.weights[i]*5));
      line(this.pos.x, this.pos.y, n.pos.x, n.pos.y);
    }

    //Visualizes the node
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 33, 33);

    //Shows value of node
    if (t) {
      stroke(0);
      strokeWeight(1);
      fill(0);
      text(""+round(this.sum*1000)/1000, this.pos.x-15, this.pos.y+5);
    }
  }

  clone() {
  }
}
