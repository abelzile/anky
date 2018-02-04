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
                 class="num-value"
                 :disabled="!isBoneSelected"/>
        </div>
        <div class="control-box">
          <label for="boneColor" class="top-label">Color</label>
          <input id="boneColor" type="color" v-model="boneColor"
                 :disabled="!isBoneSelected"/>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
  import * as Types from './store/mutation-types';
  import * as ColorUtils from './util/color-utils';


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
      },
      boneColor: {
        get() {
          if (!this.isBoneSelected) {
            return '';
          }
          return '#' + this.model.color.toString(16);
        },
        set(value) {
          let val = value;

          if (val.startsWith('#')) {
            val = value.substring(1);
          }

          if (!ColorUtils.isValidHexString(val)) {
            return;
          }

          this.$store.commit(Types.UPDATE_BONE_COLOR, {
            boneId: this.model.id,
            newColor: parseInt(val, 16)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
