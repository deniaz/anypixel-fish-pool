export default class Food {
	constructor(ev) {

		this.ev = ev;

		this.coords = {
			x: this.ev.detail.x,
			y: this.ev.detail.y
		}
	}
}