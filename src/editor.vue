<template>
  <div>
    <div id="editor" v-on:mousemove="mouseMove"></div>
    <zoom id="zoomer" v-on:change-zoom="changeZoom"></zoom>
    <stages id="stages" :model="stages"></stages>
  </div>
</template>
<script>
  import * as Const from './const';
  import * as PIXI from 'pixi.js';
  import Vue from 'vue';
  import Key from './key';
  import stages from './stages.vue';
  import zoom from './zoom.vue';
  import * as MutationTypes from './store/mutation-types';

  export default {
    name: 'editor',
    components: {
      zoom,
      stages
    },
    props: {
      model: Object
    },
    data() {
      return {
        renderer: null,
        rootContainer: null,
        bgContainer: null,
        boneContainer: null,
        /*spaceKey: null,*/
        mouseCoordsOld: [-1, -1],
        mouseCoords: [-1, -1],
        invalidated: false
      }
    },
    computed: {
      stages() {
        return this.model.stages;
      }
    },
    methods: {
      mouseMove(e) {
        e = e || window.event;

        this.mouseCoordsOld[0] = this.mouseCoords[0];
        this.mouseCoordsOld[1] = this.mouseCoords[1];

        const target = e.target || e.srcElement,
          style = target.currentStyle || window.getComputedStyle(target, null),
          borderLeftWidth = parseInt(style['borderLeftWidth'], 10),
          borderTopWidth = parseInt(style['borderTopWidth'], 10),
          rect = target.getBoundingClientRect();

        this.mouseCoords[0] = e.clientX - borderLeftWidth - rect.left;
        this.mouseCoords[1] = e.clientY - borderTopWidth - rect.top;

        this._handleInput();
      },
      invalidate() {
        this.invalidated = true;
      },
      redraw() {
        if (!this.invalidated) {
          return;
        }
        this.renderer.render(this.rootContainer);

        this.invalidated = false;
      },
      changeZoom(zoom) {
        this.rootContainer.scale.set(zoom, zoom);
        this.invalidate();
        this.redraw();
      },
      _handleInput() {
        /*if (this.spaceKey.isDown) {
          const xDiff = this.mouseCoordsOld[0] - this.mouseCoords[0];
          const yDiff = this.mouseCoordsOld[1] - this.mouseCoords[1];

          this.rootContainer.position.x += xDiff;
          this.rootContainer.position.y += yDiff;

          this.invalidate();
        }

        this.redraw();*/
      },
      _drawRect(x, y, width, height, fillColor, g) {
        g.lineStyle(0);
        g.beginFill(fillColor);
        g.drawRect(x, y, width, height);
        g.endFill();
      },
      _createBackground(bgContainer) {
        const TILE_SIZE = 32;
        let color1 = 0x93a1a1;
        let color2 = 0x839496;
        const g = new PIXI.Graphics();
        bgContainer.addChild(g);

        const TILE_COUNT = 100;
        for (let x = 0; x < TILE_COUNT; ++x) {
          const xx = x * TILE_SIZE;

          for (let y = 0; y < TILE_COUNT; ++y) {
            const yy = y * TILE_SIZE;
            let fillColor = (y + x) % 2 === 0 ? color1 : color2;
            this._drawRect(xx, -yy - TILE_SIZE, TILE_SIZE, TILE_SIZE, fillColor, g);
            fillColor = (fillColor === color1) ? color2 : color1;
            this._drawRect(xx, yy, TILE_SIZE, TILE_SIZE, fillColor, g);
            fillColor = (fillColor === color1) ? color2 : color1;
            this._drawRect(-xx - TILE_SIZE, yy, TILE_SIZE, TILE_SIZE, fillColor, g);
            fillColor = (fillColor === color1) ? color2 : color1;
            this._drawRect(-xx - TILE_SIZE, -yy - TILE_SIZE, TILE_SIZE, TILE_SIZE, fillColor, g);
          }
        }

        g.lineStyle(1, 0x002b36);
        g.moveTo(0, 0);
        g.lineTo(TILE_SIZE * TILE_COUNT, 0);
        g.moveTo(0, 0);
        g.lineTo(0, TILE_SIZE * TILE_COUNT);
        g.moveTo(0, 0);
        g.lineTo(-TILE_SIZE * TILE_COUNT, 0);
        g.moveTo(0, 0);
        g.lineTo(0, -TILE_SIZE * TILE_COUNT);
        g.drawRect(-TILE_SIZE * TILE_COUNT, -TILE_SIZE * TILE_COUNT, TILE_SIZE * TILE_COUNT * 2, TILE_SIZE * TILE_COUNT * 2);

        console.log('done');
      },
      _mutationSubscribe(mutation, state) {
        /*switch (mutation.type) {
          case MutationTypes.ADD_BONE:
          case MutationTypes.DELETE_BONE:
          case MutationTypes.SELECT_STAGE:
          case MutationTypes.UPDATE_BONE_LENGTH:
          case MutationTypes.UPDATE_SELECTED_BONE_TRANSFORM_X_POSITION:
          case MutationTypes.UPDATE_SELECTED_BONE_TRANSFORM_Y_POSITION:
          {*/
            this.boneContainer.removeChildren();

            const rootBone = this.model.rootBone;
            const allChildBones = rootBone.getAllChildBones();

            allChildBones.forEach(this._updateBoneGraphics);

            /*break;
          }
        }*/

        this.invalidate();
        this.redraw();
      },
      _updateBoneGraphics(bone) {
        const transform = this.model.selectedStage.currentFrame.getBoneTransform(bone);

        console.log(transform);

        const pixiBone = bone.pixiBone;
        this.boneContainer.addChild(pixiBone);
        bone.applyTransform(transform);
      }
    },
    mounted() {
      const renderer = new PIXI.WebGLRenderer({
        backgroundColor: 0x073642,
        autoResize: true
      });
      const editor = document.getElementById('editor');
      editor.appendChild(renderer.view);
      renderer.view.style.position = 'absolute';
      renderer.view.style.display = 'block';
      renderer.resize(editor.offsetWidth, editor.offsetHeight);

      const bgContainer = new PIXI.Container();
      this._createBackground(bgContainer);
      this.bgContainer = bgContainer;
      this.boneContainer = new PIXI.Container();
      this.rootContainer = new PIXI.Container();
      this.rootContainer.position.x = renderer.width / 2;
      this.rootContainer.position.y = renderer.height / 2;
      this.rootContainer.addChild(this.bgContainer);
      this.rootContainer.addChild(this.boneContainer);

      this.renderer = renderer;

      //FIXME: can't capture keys and cancel events like this.
      /*this.spaceKey = new Key(32);
      this.spaceKey.press = function () {
      };*/

      this.$store.subscribe(this._mutationSubscribe);

      Vue.nextTick(() => {
        this.invalidate();
        this.redraw();
      });
    }
  }
</script>
<style scoped>
  #editor {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding:0;
  }

  #zoomer {
    position:absolute;
    bottom: 3px;
    left: 3px;
  }

  #stages {
    position:absolute;
    top: 3px;
    left: 3px;
  }
</style>