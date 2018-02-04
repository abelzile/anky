<template>
  <div>
    <fieldset class="primary">
      <legend>Current Frame Transforms</legend>

      <label>Position</label>
      <div class="form-group">
        <label for="xPosition">x</label>
        <input id="xPosition" type="number" v-model="x" class="num-value"
               :disabled="!isBoneTransformSelected"/>
        <label for="yPosition">y</label>
        <input id="yPosition" type="number" v-model="y" class="num-value"
               :disabled="!isBoneTransformSelected"/>
      </div>

      <div class="form-group">
        <label for="rotation" class="top-label">Rotation</label>
        <input id="rotation" type="number" min="0" max="360" v-model="rotation"
               class="num-value"
               :disabled="!isBoneTransformSelected"/>
      </div>

    </fieldset>
  </div>
</template>
<script>
  import * as Types from './store/mutation-types';

  export default {
    name: 'boneTransformProperties',
    props: {
      model: Object
    },
    computed: {
      isBoneTransformSelected: {
        get() {
          return !!this.model;
        }
      },
      x: {
        get() {
          if (!this.isBoneTransformSelected) {
            return '';
          }
          return this.model.position.x;
        },
        set(value) {
          this.$store.commit(Types.UPDATE_SELECTED_BONE_TRANSFORM_X_POSITION, {x: value});
        }
      },
      y: {
        get() {
          if (!this.isBoneTransformSelected) {
            return '';
          }
          return this.model.position.y;
        },
        set(value) {
          this.$store.commit(Types.UPDATE_SELECTED_BONE_TRANSFORM_Y_POSITION, {y: value});
        }
      },
      rotation: {
        get() {
          if (!this.isBoneTransformSelected) {
            return '';
          }
          return this.model.rotation;
        },
        set(value) {
          this.$store.commit(Types.UPDATE_SELECTED_BONE_TRANSFORM_ROTATION, {rotation: value});
        }
      }
    }
  };

</script>
<style scoped>

  .form-group {
    margin-bottom: 12px;
  }

</style>
