<template>
    <i class="btn" v-html="iconSvg" @click="click"></i>
</template>

<script>
  import Feather from './vendor/feather.min';

  const SVG_STYLES = "display:block;margin-left:auto;margin-right:auto;";

  export default {
    name: 'tool-icon-btn',
    props: {
      id: String,
      icon: String
    },
    computed: {
      iconSvg() {
        const parser = new DOMParser();
        const html = parser.parseFromString(Feather.icons[this.icon].toSvg(), "text/html");
        const svgTags = html.getElementsByTagName('svg');
        svgTags[0].setAttribute("style", SVG_STYLES);

        return svgTags[0].outerHTML;
      }
    },
    methods: {
      click() {
        this.$emit('click', this.id);
      }
    }
  }
</script>

<style scoped>
  .btn {
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
