import * as Const from '../const';

export default class Project {
  constructor(name) {
    this.name = name;
    this.stages = [];
    this.rootBone = null;
    this.selectedStage = null;
    this._selectedBone = null;
  }

  get selectedBone() { return this._selectedBone; }
  set selectedBone(value) {
    if (this._selectedBone) {
      this._selectedBone.isHighlighted = false;
    }
    this._selectedBone = value;
    this._selectedBone.isHighlighted = true;
  }

  getAllBones() {
    const bones = this.rootBone.getAllChildBones();
    bones.unshift(this.rootBone);

    return bones;
  }

  getBoneById(id, startBone = this.rootBone) {
    const stack = [];
    let bone = null;

    stack.push(startBone);

    while (stack.length > 0) {
      bone = stack.pop();

      if (bone.id === id) {
        break;
      }

      if (bone.childBones && bone.childBones.length) {
        for (let i = 0; i < bone.childBones.length; i++) {
          stack.push(bone.childBones[i]);
        }
      }
    }

    return bone;
  }

  getStageById(id) {
    return this.stages.find(s => s.id === id);
  }
}
