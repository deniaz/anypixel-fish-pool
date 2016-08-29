import Fish from './fish';
import Food from './food';

const FPS = 15;
const MAX_FISHES = 25;
const FONT_STYLE = '18px Arial';

export default class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.ctx.font = FONT_STYLE;

    this.fishes = [];
    this.foods = [];

    for (let i = 0; i < MAX_FISHES; i++) {
      this.fishes.push(new Fish(this.ctx, { width, height }));
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

    this.fishes.forEach(fish => {
      fish.update();
      fish.draw();
    });

    this.foods.forEach(food => this.drawFood(food));
  }

  setFood(ev) {
    const food = new Food(ev);
    this.foods.push(food);

    this.fishes.forEach(fish => {
      fish.notify(food.coords);
    });
  }

  drawFood(food) {
    this.ctx.fillStyle = "#8e44ad";
    this.ctx.fillRect(food.coords.x, food.coords.y, 2, 2);
  }
}
