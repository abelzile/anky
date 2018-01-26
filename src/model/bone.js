import * as generateUuidV4 from 'uuid/v4';
import * as PIXI from 'pixi.js';

export default class Bone {
  constructor(name = '', length = 0) {
    this.id = generateUuidV4();
    this.name = name;
    this._length = length; // length of the bone
    this.slots = [];
    this.parentBone = null;
    this.childBones = [];
    this.pixiBone = new PIXI.Graphics(true);
    this._updatePixiBone();
  }

  get length() {
    return this._length;
  }
  set length(val) {
    this._length = val;
    this._updatePixiBone();
  }

  addChildBone(childBone) {
    if (!childBone) {
      throw new Error('childBone has no value.');
    }
    childBone.parentBone = this;

    if (!childBone.name) {
      childBone.name = 'New Bone ' + (this.childBones.length + 1);
    }

    this.childBones.push(childBone);
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

  _updatePixiBone() {
    this.pixiBone.clear().lineStyle(1, 0xff0000, 1);

    if (this._length < 4) {
      this.pixiBone.drawCircle(0, 0, 3);
    } else {
      this.pixiBone.moveTo(0, 0).lineTo(this._length, 0);
    }

    this.pixiBone.endFill();
  }
}
