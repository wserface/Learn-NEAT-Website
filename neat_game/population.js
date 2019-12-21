class Population {
  constructor(size) {
    this.bots = [];
    this.fitnessSum = 0;
    this.gen = 1;
    this.bestBot = 0;
    for (let i = 0; i<size; i++) {
      this.bots[i] = new Bot();
    }
  }

  update(cHeight, nDist, nHeight, score) {
    for (let i = 0; i<this.bots.length; i++) {
      this.bots[i].update(cHeight, nDist, nHeight, score);
    }
  }

  show() {
    for (let i = 1; i<this.bots.length; i++) {
      this.bots[i].show();
    }
    this.bots[0].show();
  }

  allBotsDead() {
    let out = false;
    for (let i = 0; i<this.bots.length; i++) {
      out = out || this.bots[i].alive;
    }
    return !out;
  }

  nextGen() {
    let newBots = [];
    this.setBestBot();
    this.calculateFitnessSum();
    newBots[0] = this.bots[this.bestBot].clone();
    newBots[0].isBest = true;
    for (let i = 1; i< this.bots.length; i++) {
      newBots[i] = this.selectParent().clone();
    }
    let out = new Population(this.bots.length);
    for (let i = 0; i<this.bots.length; i++) {
      out.bots[i] = newBots[i];
    }
    out.mutate();
    return out;
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
      this.bots[i].mutate();
    }
  }

  setBestBot() {
    let max = 0;
    let maxIndex = 0;
    for (let i = 1; i<this.bots.length; i++) {
      if (this.bots[i].fitness > max) {
        max = this.bots[i].fitness;
        maxIndex = i;
      }
    }
    this.bestBot = maxIndex;
    consoleLog("Gen "+gen+"'s Best Score: "+max+".");
  }
}
