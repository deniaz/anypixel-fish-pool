var PF = require('pathfinding');

const colors = ['#2ecc71', '#27ae60', '#3498db', '#2980b9', '#1abc9c', '#16a085', '#e67e22', '#e74c3c'];

const DIRECTION = {
  UP: -1,
  DOWN: 1
}

export default class Fish {
  constructor(ctx, dimensions) {
    this.ctx = ctx;

    this.grid = new PF.Grid(dimensions.width, dimensions.height);
    this.finder = new PF.AStarFinder({
      heuristic: PF.Heuristic.euclidean
    });

    this.id = Math.floor(Math.random() * 256) + 1;

    this.age = Math.floor(Math.random() * 128);
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.width = 4;
    this.height = 2;

    this.direction = Math.random() < 0.5 ? DIRECTION.UP : DIRECTION.DOWN;

    this.coords = {
      x: Math.floor(Math.random() * (ctx.canvas.width - this.width)),
      y: Math.floor(Math.random() * (ctx.canvas.height - this.height))
    };

    this.velocity = {
      x: 2,
      y: 1
    };

    this.hungry = false;
    this.path = [];

    this.step = 0;
  }

  hitsVerticalBorder() {
    const { x, y } = this.coords;
    const { width, height } = this.ctx.canvas;
    return x <= 0 || x >= (width - this.width);
  }

  hitsHorizontalBorder() {
    const { x, y } = this.coords;
    const { width, height } = this.ctx.canvas;
    return y <= 0 || y >= (height - this.height);
  }

  draw() {
    //this.ctx.fillStyle = this.color;
    this.ctx.fillStyle = this.hungry ? '#e74c3c' : '#3498db';
    this.ctx.fillRect(this.coords.x, this.coords.y, this.width, this.height);
  }

  notify(coords) {
    this.hungry = true;
    console.log(`Hungry! ${this.hungry}`);
    const x = parseInt(this.coords.x, 10);
    const y = parseInt(this.coords.y, 10);
    const grid = this.grid.clone();
    this.path = this.finder.findPath(x, y, coords.x, coords.y, grid);

    if (this.step++ > 0 && this.path.length === 0) {
      console.warn(x, y, coords);
    }
  }

  stroll() {
    this.coords.x = this.coords.x + this.velocity.x;
    this.age++;

    if (this.hitsVerticalBorder()) {
      this.velocity.x = this.velocity.x * -1;
    }

    this.velocity.y = 0.25 * Math.sin(this.age * Math.PI / 64);

    if (this.hitsHorizontalBorder()) {
      this.coords.y = this.coords.y < 1 ? this.height : this.ctx.canvas.height - this.height * 2;

      if (this.coords.y > 1 && this.velocity.y < 0) {
        this.velocity.y = this.velocity.y * (-1);
      }
    } else {
      this.coords.y = this.coords.y + this.velocity.y;
    }
  }

  navigateToFood() {
    const x = parseInt(this.coords.x, 10);
    const y = parseInt(this.coords.y, 10);

    const nextStep = this.path.shift();

    if (!nextStep) {
      this.path = [];
      this.hungry = false;
      console.info('Eaten.');
      return;
    }

    this.coords.x = nextStep[0];
    this.coords.y = nextStep[1];
  }

  update() {
    if (!this.hungry) {
      this.stroll();
    } else {
      this.navigateToFood();
    }
  }
}
