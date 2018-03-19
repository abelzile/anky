<template>
  <div id="stages">
    <label id="lbl" for="stage-list">Stage:
      <select id="stage-list" v-model="selectedStageId">
        <template v-for="stageType in stageTypes">
          <template v-if="stageType === 'setup'">
            <option v-for="stg in model"
                    v-if="stg.stageType === 'setup'"
                    :value="stg.id">{{stg.name }}
            </option>
          </template>
          <template v-else>
            <optgroup v-for="stageType in stageTypes"
                      v-if="stageType !== 'setup'"
                      :label="pluralize(stageType).toUpperCase()">
              <option v-for="stg in model"
                      v-if="stg.stageType === stageType"
                      :value="stg.id">{{stg.name }}
              </option>
            </optgroup>
          </template>
        </template>
      </select>
    </label>
    <bone-tree-item-button text="add"
                           color="#fff"
                           backgroundColor="#268bd2"
                           @click="addStage()"></bone-tree-item-button>
  </div>
</template>
<script>
  import boneTreeItemButton from './bone-tree-item-button.vue';
  import * as Const from './const';
  import * as Types from './store/mutation-types';

  export default {
    name: 'stages',
    components: {
      boneTreeItemButton
    },
    props: {
      model: Array
    },
    computed: {
      stageTypes() {
        return Object.values(Const.STAGE_TYPE);
      },
      selectedStageId: {
        get: function() {
          const id = this.$store.state.selectedStage.id;
          this.$emit('selected-stage-changed', id);
          return id;
        },
        set: function(value) {
          this.$store.commit(Types.SELECT_STAGE, value);
        }
      }
    },
    methods: {
      pluralize(str) {
        return str + 's';
      },
      addStage() {
        this.$store.dispatch('addStage', {
          name: 'New Animation',
          stageType: Const.STAGE_TYPE.ANIMATION
        });
      }
    }
  }
</script>
<style scoped>
  #lbl {
    color: #93a1a1;
    font-weight: bold;
  }

  #stages {
    background-color: #002b36;
    border-radius: 3px;
    padding: 3px;
  }
</style>
