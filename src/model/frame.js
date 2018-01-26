export default class Frame {
  constructor() {
    this.boneTransforms = [];
  }

  getBoneTransform(bone) {
    return this.boneTransforms.find(b => b.bone === bone);
  }
}
