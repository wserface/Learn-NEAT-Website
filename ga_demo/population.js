class Population {
  constructor(size) {
    this.dots = [];
    this.fitnessSum = 0;
    this.gen = 1;
    this.minSteps = 1000;
    this.currentStep = 0;
    for (let i = 0; i<size; i++) {
      this.dots[i] = new Dot();
    }
  }

  update() {
    for (let i = 0; i<this.dots.length; i++) {
      this.dots[i].update();
    }
    this.currentStep++;
  }

  show() {
    for (let i = 1; i<this.dots.length; i++) {
      this.dots[i].show();
    }
    this.dots[0].show();
  }

  allDotsDead() {
    if (this.currentStep > this.minSteps) {
      return true;
    }
    let out = false;
    for (let i = 0; i<this.dots.length; i++) {
      out = out || this.dots[i].alive;
    }
    return !out;
  }

  calculateFitness() {
    for (let i = 0; i<this.dots.length; i++) {
      this.dots[i].calculateFitness();
    }
  }

  nextGen() {
    this.currentStep = 0;
    let newDots = [];
    this.calculateFitness();
    this.setBestDot();
    this.calculateFitnessSum();
    newDots[0] = this.dots[this.bestDot].clone();
    newDots[0].isBest = true;
    for (let i = 1; i< this.dots.length; i++) {
      let parent = this.selectParent();
      newDots[i] = parent.clone();
    }
    for (let i = 0; i<this.dots.length; i++) {
      this.dots[i] = newDots[i];
    }
    this.mutate();
    this.gen++;
  }

  calculateFitnessSum() {
    this.fitnessSum = 0;
    for (let i = 0; i< this.dots.length; i++) {
      this.fitnessSum += this.dots[i].fitness;
    }
  }

  selectParent() {
    let rand = random(this.fitnessSum);
    let runningSum = 0;
    for (let i = 0; i<this.dots.length; i++) {
      runningSum+= this.dots[i].fitness;
      if (runningSum > rand) {
        return this.dots[i];
      }
    }
    return null;
  }

  mutate() {
    for (let i = 1; i<this.dots.length; i++) {
      this.dots[i].brain.mutate();
    }
  }

  setBestDot() {
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i<this.dots.length; i++) {
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }
    this.bestDot = maxIndex;
    let out = "";
    if (this.dots[this.bestDot].reachedGoal) {
      this.minSteps = this.dots[this.bestDot].brain.index;
      out = ("Gen "+this.gen+":\nBest Score: "+max+", Steps: "+this.dots[maxIndex].brain.index);
    } else {
      out = ("Gen "+this.gen+":\nBest Score: "+max+", Distance from Goal: "+round(dist(this.dots[maxIndex].pos.x, this.dots[maxIndex].pos.y, goal.x, goal.y)));
    }
    document.getElementById("console").innerText = out;
  }
}
