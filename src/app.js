const anypixel = require('anypixel');
const ctx = anypixel.canvas.getContext2D();
import Game from './game';

const { width, height } = anypixel.config;
const game = new Game(ctx, width, height);

document.addEventListener('onButtonDown', (ev) => {
	game.setFood(ev)
});

document.addEventListener('onButtonUp', (ev) => {});
