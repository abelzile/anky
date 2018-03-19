import * as MathUtils from '../util/math-utils';
import Vector from '../vector';

export default class BoneTransform {
  constructor(bone, position = new Vector(), rotation = 0) {
    if (!bone) {
      throw new Error('bone must be set.');
    }
    this.bone = bone;
    this.position = position;
    this.position.cb = () => this.applyToBone();
    this._rotation = rotation;
  }

  get rotation() { return this._rotation; }
  set rotation(value) {
    this._rotation = value;
    this.applyToBone();
  }

  applyToBone() {
    const pixiBone = this.bone.pixiBone;
    pixiBone.position.x = this.position.x;
    pixiBone.position.y = this.position.y;
    pixiBone.rotation = MathUtils.degreesToRadians(this._rotation);
  }

  clone() {
    return new BoneTransform(this.bone, this.position.clone(), this._rotation);
  }
}
