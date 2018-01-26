<template>
  <div>
    <tools :model="project"></tools>
    <div id="editor-main">
      <editor></editor>
    </div>
  </div>
</template>

<script>
  import tools from './tools.vue';
  import editor from './editor.vue';

  export default {
    name: 'app',
    components: {
      tools,
      editor
    },
    computed: {
      project() {
        return this.$store.state;
      }
    }
  }
</script>

<style scoped>
  #editor-main {
    position: absolute;
    top: 0;
    left: 400px;
    bottom: 0;
    right: 0;
    margin: 0;
    padding: 0;
  }
</style>