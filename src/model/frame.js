export default class Frame {
  constructor() {
    this.boneTransforms = [];
  }

  getBoneTransform(bone) {
    return this.boneTransforms.find(b => b.bone === bone);
  }

  clone() {
    const frame = new Frame();
    frame.boneTransforms = this.boneTransforms.map(bt => bt.clone());

    return frame;
  }
}
