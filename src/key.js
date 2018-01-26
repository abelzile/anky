export default class Key {
  constructor(keyCode, el = window) {
    this.code = keyCode;
    this.isDown = false;
    this.isUp = true;
    this.press = undefined;
    this.release = undefined;

    this._downHandler = function(event) {
      if (event.keyCode === this.code) {
        if (this.isUp && this.press) {
          this.press();
        }
        this.isDown = true;
        this.isUp = false;
      }
      event.preventDefault();
    }.bind(this);

    this._upHandler = function(event) {
      if (event.keyCode === this.code) {
        if (this.isDown && this.release) {
          this.release();
        }
        this.isDown = false;
        this.isUp = true;
      }
      event.preventDefault();
    }.bind(this);

    el.addEventListener('keydown', this._downHandler, false);
    el.addEventListener('keyup', this._upHandler, false);
  }
}
