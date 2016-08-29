export default class Food {
	constructor(ev) {

		this.ev = ev;
		this.width = 2;
		this.height = 2;
		this.active = true;

		this.coords = {
			x: this.ev.detail.x,
			y: this.ev.detail.y
		}
	}
}