import * as PIXI from 'pixi.js';
import * as generateUuidV4 from 'uuid/v4';
import * as ColorUtils from '../util/color-utils';
import * as MathUtils from '../util/math-utils';

export default class Bone {
  constructor(name = '', length = 0) {
    this.id = generateUuidV4();
    this.name = name;
    this._length = length;
    const color = ColorUtils.genRandomColor();
    this._color = ColorUtils.rgbToHex(color.r, color.g, color.b);
    this.slots = [];
    this.parentBone = null;
    this.childBones = [];
    this.pixiBone = new PIXI.Graphics(true);
    this._borderColor = 0x000000;
    this._isHighlighted = false;

    this.redraw();
  }

  get length() { return this._length; }
  set length(value) {
    this._length = MathUtils.clamp(value, 0, 9999);
    this.redraw();
  }

  get color() { return this._color; }
  set color(value) {
    this._color = value;
    this.redraw();
  }

  get isHighlighted() { return this._isHighlighted; }
  set isHighlighted(value) {
    this._isHighlighted = value;

    if (value) {
      this._borderColor = 0xffffff;
    } else {
      this._borderColor = 0x000000;
    }

    this.redraw();
  }

  addChildBone(childBone) {
    if (!childBone) {
      throw new Error('childBone has no value.');
    }
    childBone.parentBone = this;

    if (!childBone.name) {
      childBone.name = 'New Bone ' + (this.childBones.length + 1);
    }

    this.pixiBone.addChild(childBone.pixiBone);
    this.childBones.push(childBone);
  }

  removeChildBone(childBone) {
    if (!childBone) {
      throw new Error('childBone has no value.');
    }
    const parentBone = childBone.parentBone;
    const index = parentBone.childBones.indexOf(childBone);
    parentBone.childBones.splice(index, 1);
    parentBone.pixiBone.removeChild(childBone.pixiBone);
    childBone.parentBone = null;
  }

  getAllChildBones() {
    const stack = [];
    const children = [];

    stack.push(this);

    while (stack.length > 0) {
      let bone = stack.pop();

      for (let i = 0; i < bone.childBones.length; i++) {
        stack.push(bone.childBones[i]);
        children.push(bone.childBones[i]);
      }
    }

    return children;
  }

  redraw() {
    this.pixiBone
      .clear()
      .lineStyle(1, this._borderColor)
      .beginFill(this._color);

    if (this._length <= 1) {
      this.pixiBone.drawCircle(0, 0, 1);
    } else if (this._length < 4) {
      this.pixiBone.drawCircle(0, 0, this._length);
    } else {
      const baseLen = 3 + Math.ceil(this._length / 100);

      this.pixiBone
        .moveTo(0, 0)
        .lineTo(0, -baseLen)
        .lineTo(this._length, 0)
        .lineTo(0, baseLen)
        .lineTo(0, 0)
    }

    this.pixiBone.endFill();
  }
}
