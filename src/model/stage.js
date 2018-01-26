import * as generateUuidV4 from 'uuid/v4';
import * as Const from '../const';

export default class Stage {
  constructor(name, stageType = Const.STAGE_TYPE.SETUP) {
    this.id = generateUuidV4();
    this.name = name;
    this.stageType = stageType;
    this.frames = [];
    this.currentFrameIndex = 0;
  }

  get currentFrame() {
    return this.frames[this.currentFrameIndex];
  }
}
