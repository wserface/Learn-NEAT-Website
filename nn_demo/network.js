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

  //Sets the input Nodes to random numbers [-1, 1), and updates all nodes
  update() {
    for (let i = 0; i<this.inputs.length; i++) {
      this.inputs[i].sum = (random(2)-1);
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
  visualize() {
    for (let i = 0; i<this.inputs.length; i++) {
      this.inputs[i].visualize(true);
    }
    for (let c = 0; c<this.calcs.length; c++) {
      this.calcs[c].visualize(true);
    }
    for (let o = 0; o<this.outputs.length; o++) {
      this.outputs[o].visualize(true);
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
}
