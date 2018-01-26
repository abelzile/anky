<template>
  <div id="stages">
    <label id="lbl" for="stage-list">Stage:
      <select id="stage-list" @change="update($event)">
        <template v-for="stageType in stageTypes">
          <template v-if="stageType === 'setup'">
            <option v-for="stg in model" v-if="stg.stageType === 'setup'"
                    :value="stg.id">{{stg.name }}
            </option>
          </template>
          <template v-else>
            <optgroup v-for="stageType in stageTypes"
                      v-if="stageType !== 'setup'"
                      :label="pluralize(stageType).toUpperCase()">
              <option v-for="stg in model" v-if="stg.stageType === stageType"
                      :value="stg.id">{{stg.name }}
              </option>
            </optgroup>
          </template>
        </template>
      </select>
    </label>
  </div>
</template>
<script>
  import * as Const from './const';
  import * as Types from './store/mutation-types';

  export default {
    name: 'stages',
    props: {
      model: Array
    },
    computed: {
      stageTypes() {
        return Object.values(Const.STAGE_TYPE);
      }
    },
    methods: {
      update(e) {
        console.log(e);
        this.$store.commit(Types.SELECT_STAGE, e.target.value);
      },
      pluralize(str) {
        return str + 's';
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
