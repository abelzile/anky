<template>
  <div>
    <fieldset class="primary">
      <legend>Current Frame Transforms</legend>
      <fieldset style="border:none; padding:0;">
        <legend>Position</legend>
        <label for="xPosition">x</label>
        <input id="xPosition" type="number" v-model="x" class="int-value"
               :disabled="!isBoneTransformSelected"/>
        <label for="yPosition">y</label>
        <input id="yPosition" type="number" v-model="y" class="int-value"
               :disabled="!isBoneTransformSelected"/>
      </fieldset>
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
          this.$store.commit(Types.UPDATE_SELECTED_BONE_TRANSFORM_X_POSITION, { x: value });
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
          this.$store.commit(Types.UPDATE_SELECTED_BONE_TRANSFORM_Y_POSITION, { y: value });
        }
      }
    }
  };

</script>
<style scoped>
</style>
