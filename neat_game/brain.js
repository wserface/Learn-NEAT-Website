class Network {
  //Constructor
  constructor(ins, cas, ous) {
    this.outputs = [];
    this.calcs = [];
    this.inputs = [];

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

  mutate() {
    for (let i = 0; i<this.inputs.length; i++) {
      for (let w = 0; w<this.inputs[i].weights; w++) {
        this.inputs[i].weights[w] = (random(1)<0.05) ? (random(2)-1) : this.inputs[i].weights[w];
      }
    }
    for (let i = 0; i<this.calcs.length; i++) {
      for (let w = 0; w<this.calcs[i].weights; w++) {
        this.inputs[i].weights[w] = (random(1)<0.05) ? (random(2)-1) : this.inputs[i].weights[w];
      }
    }
  }

  clone() {
    let out = new Network(this.inputs.length, this.calcs.length, this.outputs.length);
    for (let i = 0; i<this.calcs.length; i++) {
      out.calcs[i] = this.calcs[i].clone(out.outputs);
    }
    for (let i = 0; i<this.outputs.length; i++) {
      out.inputs[i] = this.inputs[i].clone(out.calcs);
    }
    return out;
  }
}

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

  clone(outs) {
    return new Node(this.pos, outs, this.weights);
  }
}
