class Population {
  constructor(size) {
    this.bots = [];
    this.fitnessSum = 0;
    this.gen = 1;
    this.minSteps = 1000;
    this.currentStep = 0;
    for (let i = 0; i<size; i++) {
      this.bots[i] = new Bot();
    }
  }

  update(cHeight, nHeight) {
    for (let i = 0; i<this.bots.length; i++) {
      this.bots[i].update(cHeight, nHeight);
    }
    this.currentStep++;
  }

  show() {
    for (let i = 1; i<this.bots.length; i++) {
      this.bots[i].show();
    }
    this.bots[0].show();
  }

  allbotsDead() {
    if (this.currentStep > this.minSteps) {
      return true;
    }
    let out = false;
    for (let i = 0; i<this.bots.length; i++) {
      out = out || this.bots[i].alive;
    }
    return !out;
  }

  calculateFitness() {
    for (let i = 0; i<this.bots.length; i++) {
      this.bots[i].calculateFitness();
    }
  }

  nextGen() {
    this.currentStep = 0;
    let newbots = [];
    this.calculateFitness();
    this.setBestBot();
    this.calculateFitnessSum();
    newbots[0] = this.bots[this.bestBot].clone();
    newbots[0].isBest = true;
    for (let i = 1; i< this.bots.length; i++) {
      let parent = this.selectParent();
      newbots[i] = parent.clone();
    }
    for (let i = 0; i<this.bots.length; i++) {
      this.bots[i] = newbots[i];
    }
    this.mutate();
    this.gen++;
  }

  calculateFitnessSum() {
    this.fitnessSum = 0;
    for (let i = 0; i< this.bots.length; i++) {
      this.fitnessSum += this.bots[i].fitness;
    }
  }

  selectParent() {
    let rand = random(this.fitnessSum);
    let runningSum = 0;
    for (let i = 0; i<this.bots.length; i++) {
      runningSum+= this.bots[i].fitness;
      if (runningSum > rand) {
        return this.bots[i];
      }
    }
    return null;
  }

  mutate() {
    for (let i = 1; i<this.bots.length; i++) {
      this.bots[i].brain.mutate();
    }
  }

  setBestBot() {
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i<this.bots.length; i++) {
      if (this.bots[i].fitness > max) {
        max = this.bots[i].fitness;
        maxIndex = i;
      }
    }
    this.bestBot = maxIndex;
    if (this.bots[this.bestBot].reachedGoal) {
      this.minSteps = this.bots[this.bestBot].brain.index;
      console.log("Gen "+this.gen+"'s Best Score: "+max+", Steps: "+this.bots[maxIndex].brain.index);
    } else {
      console.log("Gen "+this.gen+"'s Best Score: "+max+", Distance from Goal: "+round(dist(this.bots[maxIndex].pos.x, this.bots[maxIndex].pos.y, goal.x, goal.y)));
    }
  }
}
