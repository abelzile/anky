export default class Vector {
  constructor(x = 0, y = 0, cb = undefined) {
    this._x = x;
    this._y = y;
    this.cb = cb;
  }

  get x() { return this._x; }
  set x(value) {
    this._x = value;
    this.onPropertyChanged();
  }

  get y() { return this._y; }
  set y(value) {
    this._y = value;
    this.onPropertyChanged();
  }

  onPropertyChanged() {
    if (this.cb) {
      this.cb();
    }
  }
}