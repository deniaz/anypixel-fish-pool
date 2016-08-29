const anypixel = require('anypixel');
const ctx = anypixel.canvas.getContext2D();
ctx.font = 'bold 18px Arial';

const text = 'Digital. High Five.';
const textLength = ctx.measureText(text).width + 6;
const brand = 'Namics.';
const brandLength = ctx.measureText(brand).width;

var textX = ctx.canvas.width;
var textY = ctx.canvas.height / 2 + 6;

setInterval(() => {
  ctx.fillStyle = '#D21E1E';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#000000';
  ctx.fillText(text, textX--, textY);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(brand, textLength + textX, textY);

  if (textX < ((textLength + brandLength) * -1)) {
    textX = ctx.canvas.width;
  }
  // console.info(textX, textLength);
}, 1000/30);
