<template>
  <div>
    <div id="z">
      <div id="lbl">Zoom</div>
      <button class="zoom-button" type="button" v-on:click="increaseZoom">+
      </button>
      <span id="txt">{{zoom}}</span>
      <button class="zoom-button" type="button" v-on:click="decreaseZoom">-</button>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        zoom: 1
      }
    },
    methods: {
      increaseZoom: function () {
        if (this.zoom >= 10) {
          return;
        }
        this.zoom += .5;
        this.$emit('change-zoom', this.zoom);
      },
      decreaseZoom: function () {
        if (this.zoom <= 1) {
          return;
        }
        this.zoom -= .5;
        this.$emit('change-zoom', this.zoom);
      }
    }
  };
</script>
<style scoped>
  #z {
    background-color: #002b36;
    border-radius: 3px;
    padding: 3px;
  }

  #lbl {
    color: #93a1a1;
    font-weight: bold;
    text-align: center;
  }

  #txt {
    color: #93a1a1;
    display: inline-block;
    text-align: center;
    width: 40px;
  }

  .zoom-button {
    background-color: #eeeeee;
    border-radius: 50%;
    border: none;
    color: #586e75;
    font-size: 18px;
    font-weight: bold;
    height: 18px;
    line-height: 18px;
    margin: 0;
    padding: 0;
    text-align: center;
    width: 18px;
  }
</style>
