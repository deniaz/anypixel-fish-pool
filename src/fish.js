const colors = ['#AA00CC', '#bada55', '#0099CC'];

export default class Fish {
  constructor(ctx) {
    this.ctx = ctx;

    this.active = true;
    this.age = Math.floor(Math.random() * 128);
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.coords = {
      x: 0,
      y: 0
    };

    this.velocity = {
      x: 3,
      y: 0
    };

    this.width = 8;
    this.height = 4;
  }

  isActive() {
    return this.active;
  }

  isInBounds() {
    const { x, y } = this.coords;
    const { width, height } = this.ctx.canvas;
    return x >= 0 && x <= width && y >= 0 && y <= height;
  }

  draw() {
    console.debug('Drawing Fish');
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.coords.x, this.coords.y, this.width, this.height);
  }

  update() {
    console.debug('Updating Fish');
    this.coords.x = this.coords.x + this.velocity.x;
    this.coords.y = this.coords.y + this.velocity.y;

    this.velocity.y = 3 * Math.sin(this.age * Math.PI / 64);

    this.age++;
    if (!this.isInBounds()) {
      this.velocity.x = this.velocity.x * -1;
      this.velocity.y = this.velocity.y * -1;

      this.coords.x = this.coords.x + this.velocity.x*3;
      this.coords.y = this.coords.y + this.velocity.y*3;
    }

    // this.active = this.active && this.isInBounds();
  }
}
