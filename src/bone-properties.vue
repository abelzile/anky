<template>
  <div>
    <fieldset class="primary">
      <legend>Basic Properties</legend>
      <div class="controls">
        <div class="control-box">
          <label for="boneName" class="top-label">Name</label>
          <input id="boneName" type="text" v-model="boneName"
                 :disabled="!isBoneSelected"/>
        </div>
        <div class="control-box">
          <label for="boneLength" class="top-label">Length</label>
          <input id="boneLength" type="number" v-model="boneLength"
                 class="int-value"
                 :disabled="!isBoneSelected"/>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
  import * as Types from './store/mutation-types';

  export default {
    name: 'boneProperties',
    props: {
      model: Object
    },
    computed: {
      isBoneSelected: {
        get() {
          return !!this.model;
        }
      },
      boneName: {
        get() {
          if (!this.isBoneSelected) {
            return '';
          }
          return this.model.name;
        },
        set(value) {
          this.$store.commit(Types.UPDATE_BONE_NAME, {
            boneId: this.model.id,
            newName: value
          });
        }
      },
      boneLength: {
        get() {
          if (!this.isBoneSelected) {
            return 0;
          }
          return this.model.length;
        },
        set(value) {
          this.$store.commit(Types.UPDATE_BONE_LENGTH, {
            boneId: this.model.id,
            newLength: value
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
