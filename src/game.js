import Fish from './fish';

const FPS = 5;
const FONT_STYLE = '18px Arial';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.ctx.font = FONT_STYLE;

    this.fishes = [];

    for (let i = 0; i < 3; i++) {
      this.fishes.push(new Fish(this.ctx));
    }

    this.startLoop();
  }

  startLoop() {
    this.interval = setInterval(() => {
      this.render();
    }, 1000/FPS);
  }

  render() {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);

    this.fishes.forEach(fish => fish.update());
    this.fishes = this.fishes.filter(fish => fish.isActive());

    if (this.fishes.length < 3) {
      this.fishes.push(new Fish(this.ctx));
    }

    this.fishes.forEach(fish => fish.draw());
  }
}
