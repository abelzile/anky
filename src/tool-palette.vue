<template>
  <div class="palette">
    <div class="palette__lbl">
      Tools
    </div>
    <tool-icon-btn
        class="palette__btn"
        :class="{ 'palette__btn--active' : (currentToolId === TOOL_TYPE.SELECT) }"
        icon="pointer"
        id="select"
        @click="setTool"></tool-icon-btn>
    <tool-icon-btn
        class="palette__btn"
        :class="{ 'palette__btn--active': (currentToolId === TOOL_TYPE.MOVE) }"
        icon="move"
        id="move"
        @click="setTool"></tool-icon-btn>
    <tool-icon-btn
        class="palette__btn"
        :class="{ 'palette__btn--active': (currentToolId === TOOL_TYPE.ROTATE) }"
        icon="rotate-cw"
        id="rotate"
        @click="setTool"></tool-icon-btn>
  </div>
</template>

<script>
  import * as Const from './const';
  import Vue from 'vue';
  import toolIconBtn from './tool-icon-btn.vue';

  export default {
    name: 'tool-palette',
    data() {
      return {
        currentToolId: '',
        TOOL_TYPE: Const.TOOL_TYPE
      }
    },
    components: {
      toolIconBtn
    },
    methods: {
      setTool(btn) {
        if (btn === this.currentToolId) {
          return;
        }
        this.currentToolId = btn;
        this.$emit('selected-tool-changed', this.currentToolId);
      }
    },
    mounted() {
      Vue.nextTick(() => {
        this.setTool(this.TOOL_TYPE.SELECT);
      });
    }
  }
</script>

<style scoped>
  .palette {
    background-color: #002b36;
    border-radius: 3px;
    color: #93a1a1;
    padding: 3px;
  }

  .palette__lbl {
    color: #93a1a1;
    font-weight: bold;
  }

  .palette__btn {
    display: block;
    border-radius: 3px;
    text-align: center;
    margin-bottom: 3px;
  }

  .palette__btn--active {
    background-color: #93a1a1;
    color: #002b36;
  }
</style>