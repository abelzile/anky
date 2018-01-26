<template>
  <span class="btn no-select"
        :style="{ color: color, backgroundColor: backgroundColor }"
        @click="click">{{text}}</span>
</template>
<script>
  export default {
    name: 'boneTreeItemButton',
    props: {
      text: String,
      color: String,
      backgroundColor: String
    },
    methods: {
      click() {
        this.$emit('click');
      }
    }
  }
</script>
<style scoped>
  .btn {
    cursor: pointer;
    padding: 3px;
    border-radius: 3px;
  }

  .no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
