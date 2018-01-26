import Vector from '../vector';

export default class BoneTransform {
  constructor(bone, position = new Vector(), rotation = 0) {
    if (!bone) {
      throw new Error('bone must be set.');
    }
    this.bone = bone;
    this.position = position;
    this.rotation = rotation;
  }
}
