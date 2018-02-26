import Vue from 'vue';
import Vuex from 'vuex';
import * as Const from '../const';
import Bone from '../model/bone';
import BoneTransform from '../model/bone-transform';
import Frame from '../model/frame';
import Project from '../model/project';
import Stage from '../model/stage';
import Vector from '../vector';
import * as Types from './mutation-types';

Vue.use(Vuex);

const project = new Project('test project');
const setupStage = new Stage('Setup');
const setupFrame = new Frame();
setupStage.frames.push(setupFrame);
project.stages.push(setupStage);
project.selectedStage = setupStage;


project.stages.push(new Stage('Test', Const.STAGE_TYPE.ANIMATION));


const rootBone = new Bone();
rootBone.name = 'Root Bone';
const rootBoneTransSetup = new BoneTransform(rootBone, new Vector(), 0);

project.rootBone = rootBone;
setupFrame.boneTransforms.push(rootBoneTransSetup);

/*const childBone1 = new Bone();
const childBone1TransSetup = new BoneTransform(childBone1);
rootBone.addChildBone(childBone1);
setupFrame.boneTransforms.push(childBone1TransSetup);

const childBone2 = new Bone();
const childBone2TransSetup = new BoneTransform(childBone2);
setupFrame.boneTransforms.push(childBone2TransSetup);

childBone1.addChildBone(childBone2);*/

const getters = {
  getBoneById: state => id => {
    return state.getBoneById(id);
  },
  getStageById: state => id => {
    return state.getStageById(id);
  }
};

const mutations = {
  [Types.ADD_BONE](state, parentBoneId) {
    const parentBone = this.getters.getBoneById(parentBoneId);
    const newBone = new Bone();
    parentBone.addChildBone(newBone);

    const stage = state.selectedStage;

    if (stage.stageType === Const.STAGE_TYPE.SETUP) {
      const f = stage.frames[0];

      //TODO: find parent bone's transform in f and use it to set new bone transform's position and rotation.

      const newBoneTransform = new BoneTransform(newBone /*set from parent*/);
      f.boneTransforms.push(newBoneTransform);

      state.selectedBone = newBone;
    } else {
      throw new Error('Cannot add bone to non-setup stage.');
    }
  },
  [Types.DELETE_BONE](state, boneId) {
    const boneToDelete = this.getters.getBoneById(boneId);

    const parentBone = boneToDelete.parentBone;
    if (!parentBone) {
      throw new Error(`parentBone of bone ${boneId} is null. Bone cannot be deleted.`);
    }

    parentBone.removeChildBone(boneToDelete);

    for (const bone of boneToDelete.getAllChildBones()) {
      for (const stage of state.stages) {
        for (const frame of stage.frames) {
          for (let i = frame.boneTransforms.length; i-- > 0; ) {
            const transform = frame.boneTransforms[i];
            if (transform.bone === bone) {
              frame.boneTransforms.splice(i, 1);
            }
          }
        }
      }

      bone.childBones.length = 0;
      bone.parentBone = null;
    }

    state.selectedBone = parentBone;
  },
  [Types.SELECT_STAGE](state, stageId) {
    state.selectedStage = this.getters.getStageById(stageId);
  },
  [Types.UPDATE_BONE_NAME](state, payload) {
    const bone = this.getters.getBoneById(payload.boneId);
    bone.name = payload.newName;
  },
  [Types.SELECT_BONE](state, boneId) {
    const bone = this.getters.getBoneById(boneId);

    if (!bone) {
      return;
    }

    state.selectedBone = bone;
  },
  [Types.UPDATE_BONE_LENGTH](state, payload) {
    const bone = this.getters.getBoneById(payload.boneId);
    bone.length = payload.newLength;
  },
  [Types.UPDATE_BONE_COLOR](state, payload) {
    const bone = this.getters.getBoneById(payload.boneId);
    bone.color = payload.newColor;
  },
  [Types.UPDATE_SELECTED_BONE_TRANSFORM_POSITION](state, payload) {
    const boneTransform = state.selectedStage.currentFrame.getBoneTransform(state.selectedBone);
    boneTransform.position.x = payload.x;
    boneTransform.position.y = payload.y;
  },
  [Types.UPDATE_SELECTED_BONE_TRANSFORM_X_POSITION](state, payload) {
    const boneTransform = state.selectedStage.currentFrame.getBoneTransform(state.selectedBone);
    boneTransform.position.x = payload.x;
  },
  [Types.UPDATE_SELECTED_BONE_TRANSFORM_Y_POSITION](state, payload) {
    const boneTransform = state.selectedStage.currentFrame.getBoneTransform(state.selectedBone);
    boneTransform.position.y = payload.y;
  },
  [Types.UPDATE_SELECTED_BONE_TRANSFORM_ROTATION](state, payload) {
    const boneTransform = state.selectedStage.currentFrame.getBoneTransform(state.selectedBone);
    boneTransform.rotation = payload.rotation;
  }
};

export default new Vuex.Store({
  state: project,
  getters,
  mutations
});
