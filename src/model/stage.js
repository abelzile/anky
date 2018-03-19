import * as generateUuidV4 from 'uuid/v4';
import * as Const from '../const';

export default class Stage {
  constructor(id = generateUuidV4(), name = 'New Stage', stageType = Const.STAGE_TYPE.SETUP) {
    this.id = id;
    this.name = name;
    this.stageType = stageType;
    this.frames = [];
    this.currentFrameIndex = 0;
  }

  get currentFrame() {
    return this.frames[this.currentFrameIndex];
  }
}
