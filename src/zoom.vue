<template>
  <div>
    <div class="zoom">
      <div class="zoom__lbl">Zoom</div>
      <button class="zoom__button" type="button" v-on:click="increaseZoom">+
      </button>
      <span class="zoom__txt">{{zoom}}</span>
      <button class="zoom__button" type="button" v-on:click="decreaseZoom">-</button>
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
  .zoom {
    background-color: #002b36;
    border-radius: 3px;
    padding: 3px;
  }

  .zoom__lbl {
    color: #93a1a1;
    font-weight: bold;
    text-align: center;
  }

  .zoom__txt {
    color: #93a1a1;
    display: inline-block;
    text-align: center;
    width: 40px;
  }

  .zoom__button {
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
