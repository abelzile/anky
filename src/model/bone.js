import * as PIXI from 'pixi.js';
import * as generateUuidV4 from 'uuid/v4';
import * as ColorUtils from '../util/color-utils';

export default class Bone {
  constructor(name = '', length = 0) {
    this.id = generateUuidV4();
    this.name = name;
    this._length = length; // length of the bone
    const color = ColorUtils.genRandomColor();
    this._color = ColorUtils.rgbToHex(color.r, color.g, color.b);
    this.slots = [];
    this.parentBone = null;
    this.childBones = [];
    this.pixiBone = new PIXI.Graphics(true);
    this._redraw();
  }

  get length() { return this._length; }
  set length(val) {
    if (val < 0) {
      this._length = 0;
    } else {
      this._length = val;
    }
    this._redraw();
  }

  get color() { return this._color; }
  set color(val) {
    this._color = val;
    this._redraw();
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
    const index = childBone.parentBone.childBones.indexOf(childBone);
    childBone.parentBone.childBones.splice(index, 1);
    childBone.parentBone.pixiBone.removeChild(childBone.pixiBone);
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

  _redraw() {
    this.pixiBone
      .clear()
      .lineStyle(1, 0x000000)
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
