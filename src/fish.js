const colors = ['#0099CC', '#BADA55', '#AA0000'];

const DIRECTION = {
  UP: -1,
  DOWN: 1
}

export default class Fish {
  constructor(ctx) {
    this.ctx = ctx;

    this.id = Math.floor(Math.random() * 256) + 1;

    this.active = true;
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
  }

  isActive() {
    return this.active;
  }

  isInBounds() {
    const { x, y } = this.coords;
    const { width, height } = this.ctx.canvas;
    return x >= 0 && x <= (width - this.width) && y >= 0 && y <= (height - this.height);
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
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.coords.x, this.coords.y, this.width, this.height);
  }

  update() {
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
        console.info(this.coords.y, this.velocity.y);
      }
    } else {
      this.coords.y = this.coords.y + this.velocity.y;
    }
    // if (!this.isInBounds()) {
    //   console.info('Not in bound');
    //
    //
    //   // this.coords.x = this.coords.x + this.velocity.x*3;
    //   // this.coords.y = this.coords.y + this.velocity.y*3;
    // }

    // this.active = this.active && this.isInBounds();
  }
}
