class Node {
  //Constructor
  constructor(p, o, w) {
    this.pos = p;
    this.sum = 0;
    if (o.length !== w.length) {
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
  visualize(t) {
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
    if (this.sum > 0) {
      fill(0, 0, 255);
    } else if (this.sum < 0) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }
    noStroke();
    ellipse(this.pos.x, this.pos.y, 33, 33);

    //Shows value of node
    if (t) {
      if (this.sum < 0) {
        fill(0);
        stroke(0);
      } else {
        fill(255);
        stroke(255);
      }
      strokeWeight(1);
      text(""+round(this.sum*1000)/1000, this.pos.x-15, this.pos.y+5);
    }
  }
}
