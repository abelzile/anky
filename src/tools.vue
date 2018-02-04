<template>
  <div id="tools">
    <ul id="bones">
      <item
          class="item"
          :model="rootBone">
      </item>
    </ul>
    <div id="properties">
      <boneProperties :model="selectedBone"></boneProperties>
      <boneTransformProperties :model="selectedBoneTransform"></boneTransformProperties>
    </div>
  </div>
</template>

<script>
  import item from './bone-tree-item.vue';
  import boneProperties from './bone-properties.vue';
  import boneTransformProperties from './bone-transform-properties.vue';

  export default {
    name: 'tools',
    components: {
      item,
      boneProperties,
      boneTransformProperties
    },
    props: {
      model: Object
    },
    computed: {
      rootBone() {
        return this.model.rootBone;
      },
      selectedBone() {
        return this.model.selectedBone;
      },
      selectedBoneTransform() {
        return this.model.selectedStage.currentFrame.getBoneTransform(this.model.selectedBone);
      }
    }
  }
</script>

<style scoped>
  #tools {
    overflow: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 400px;
    background-color: #002b36;
    margin: 0;
    padding: 0;
    color: #93a1a1;
    font-weight: bold;
  }

  #bones {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    bottom: 301px;
  }

  #properties {
    position: absolute;
    padding: 4px;
    margin: 0;
    height:300px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color:#073642;
  }
</style>
<style>
  #properties fieldset.primary {
    border-top: solid 1px #93a1a1;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }

  #properties input[type="text"] {
    border-width: 1px;
  }

  #properties input[type="number"] {
    border-width: 1px;
  }

  #properties input.num-value {
    width: 100px;
  }

  #properties label.top-label {
    display: block;
  }

  #properties .controls {
    display: flex;
    flex-flow: row wrap;
  }

  #properties .control-box {
    margin: 2px;
  }
</style>