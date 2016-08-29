const anypixel = require('anypixel');
const ctx = anypixel.canvas.getContext2D();
import Game from './game';

const game = new Game(ctx);

document.addEventListener('onButtonDown', (ev) => {
	game.setFood(ev)
});
document.addEventListener('onButtonUp', (ev) => {});
