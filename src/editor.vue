<template>
  <div>
    <div id="editor" v-on:mousemove="mouseMove"></div>
    <zoom id="zoomer" v-on:change-zoom="changeZoom"></zoom>
    <stages id="stages" :model="stages"></stages>
    <tool-palette id="palette"
                  @selected-tool-changed="updateTool"></tool-palette>
  </div>
</template>
<script>
  import * as PIXI from 'pixi.js';
  import Vue from 'vue';
  import * as Const from './const';
  import stages from './stages.vue';
  import * as Types from './store/mutation-types';
  import toolPalette from './tool-palette.vue';
  import Vector from './vector';
  import zoom from './zoom.vue';
  import * as MathUtils from './util/math-utils';

  const tools = {
    [Const.TOOL_TYPE.SELECT](bone, store) {
      const pixiBone = bone.pixiBone;
      pixiBone.interactive = true;
      pixiBone.on('click', (e) => {
        e.stopPropagation();
        store.commit(Types.SELECT_BONE, bone.id);
      });
    },
    [Const.TOOL_TYPE.MOVE](bone, store) {
      const pixiBone = bone.pixiBone;
      pixiBone.interactive = true;

      const onStartDrag = (e) => {
        e.stopPropagation();
        store.commit(Types.SELECT_BONE, bone.id);

        pixiBone.data = e.data;
        pixiBone.dragging = true;
      };

      const onEndDrag = () => {
        pixiBone.dragging = false;
        pixiBone.data = null;
      };

      const onDrag = () => {
        if (!pixiBone.dragging) {
          return;
        }
        store.commit(
          Types.UPDATE_SELECTED_BONE_TRANSFORM_POSITION,
          pixiBone.data.getLocalPosition(pixiBone.parent));
      };

      pixiBone
        .on('mousedown', onStartDrag)
        .on('mouseup', onEndDrag)
        .on('mouseupoutside', onEndDrag)
        .on('mousemove', onDrag);
    },
    [Const.TOOL_TYPE.ROTATE](bone, store) {
      const pixiBone = bone.pixiBone;
      pixiBone.interactive = true;

      const onStartDrag = (e) => {
        e.stopPropagation();
        store.commit(Types.SELECT_BONE, bone.id);

        pixiBone.data = e.data;
        pixiBone.dragging = true;
      };

      const onEndDrag = () => {
        pixiBone.dragging = false;
        pixiBone.data = null;
      };

      const onDrag = (e) => {
        if (!pixiBone.dragging) {
          return;
        }

        const pos = pixiBone.data.getLocalPosition(pixiBone.parent);
        const angle = MathUtils.radiansToDegrees(MathUtils.getAngle(pixiBone.position, pos));

        store.commit(
          Types.UPDATE_SELECTED_BONE_TRANSFORM_ROTATION,
          { rotation: angle });
      };

      pixiBone
        .on('mousedown', onStartDrag)
        .on('mouseup', onEndDrag)
        .on('mouseupoutside', onEndDrag)
        .on('mousemove', onDrag);
    }
  };

  export default {
    name: 'editor',
    components: {
      zoom,
      stages,
      toolPalette
    },
    props: {
      model: Object
    },
    $_renderer: new PIXI.WebGLRenderer({
      backgroundColor: 0x073642,
      autoResize: true
    }),
    $_rootContainer: new PIXI.Container(),
    $_bgContainer: null,
    $_boneContainer: new PIXI.Container(),
    data() {
      return {
        /*spaceKey: null,*/
        mouseCoordsOld: [-1, -1],
        mouseCoords: [-1, -1],
        selectedToolId: ''
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
      redraw() {
        this.$options.$_renderer.render(this.$options.$_rootContainer);
      },
      changeZoom(zoom) {
        this.$options.$_rootContainer.scale.set(zoom, zoom);
        this.redraw();
      },
      updateTool(toolId) {
        if (!toolId) {
          if (!this.selectedToolId) {
            return;
          }
          toolId = this.selectedToolId;
        }

        const toolFunc = tools[toolId];

        for (const bone of this.model.getAllBones()) {
          const pixiBone = bone.pixiBone;
          pixiBone.interactive = false;
          pixiBone.removeAllListeners();
          toolFunc(bone, this.$store);
        }

        this.selectedToolId = toolId;
      },
      _handleInput() {
        /*if (this.spaceKey.isDown) {
          const xDiff = this.mouseCoordsOld[0] - this.mouseCoords[0];
          const yDiff = this.mouseCoordsOld[1] - this.mouseCoords[1];

          this.$options.$_rootContainer.position.x += xDiff;
          this.$options.$_rootContainer.position.y += yDiff;

          this.invalidate();
        }

        this.redraw();*/
      },
      _drawRect(x, y, width, height, fillColor, g) {
        g.lineStyle(0).beginFill(fillColor).drawRect(x, y, width, height).endFill();
      },
      _createBackground() {
        const TILE_SIZE = 32;
        let color1 = 0x93a1a1;
        let color2 = 0x839496;
        const g = new PIXI.Graphics(true);
        const bgContainer = new PIXI.Container();
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

        g.lineStyle(1, 0x002b36)
          .moveTo(0, 0)
          .lineTo(TILE_SIZE * TILE_COUNT, 0)
          .moveTo(0, 0)
          .lineTo(0, TILE_SIZE * TILE_COUNT)
          .moveTo(0, 0)
          .lineTo(-TILE_SIZE * TILE_COUNT, 0)
          .moveTo(0, 0)
          .lineTo(0, -TILE_SIZE * TILE_COUNT)
          .drawRect(-TILE_SIZE * TILE_COUNT, -TILE_SIZE * TILE_COUNT, TILE_SIZE * TILE_COUNT * 2, TILE_SIZE * TILE_COUNT * 2);

        return bgContainer;
      },
      _refreshPixiBones(mutation, state) {
        //console.log(mutation);

        if (!mutation) {
          this.redraw();
          return;
        }

        switch (mutation.type) {
          case Types.UPDATE_BONE_COLOR:
          case Types.UPDATE_BONE_LENGTH:
          case Types.UPDATE_BONE_NAME:
          case Types.UPDATE_SELECTED_BONE_TRANSFORM_POSITION:
          case Types.UPDATE_SELECTED_BONE_TRANSFORM_ROTATION:
          case Types.UPDATE_SELECTED_BONE_TRANSFORM_X_POSITION:
          case Types.UPDATE_SELECTED_BONE_TRANSFORM_Y_POSITION:
            // don't update tool
            break;
          default:
            this.updateTool();
            break;
        }

        this.redraw();
      }
    },
    mounted() {
      const renderer = this.$options.$_renderer;
      renderer.plugins.interaction.autoPreventDefault = true;

      const editor = document.getElementById('editor');
      editor.appendChild(renderer.view);
      renderer.view.style.position = 'absolute';
      renderer.view.style.display = 'block';
      renderer.resize(editor.offsetWidth, editor.offsetHeight);

      this.$options.$_bgContainer = this._createBackground();

      const boneContainer = this.$options.$_boneContainer;
      const rootContainer = this.$options.$_rootContainer;
      rootContainer.position.x = renderer.width / 2;
      rootContainer.position.y = renderer.height / 2;
      rootContainer.addChild(this.$options.$_bgContainer);
      rootContainer.addChild(boneContainer);

      //FIXME: can't capture keys and cancel events like this.
      /*this.spaceKey = new Key(32);
      this.spaceKey.press = function () {
      };*/

      this.$store.subscribe(this._refreshPixiBones);

      boneContainer.addChild(this.model.rootBone.pixiBone);

      const stagesEl = document.getElementById('stages');
      const y = stagesEl.offsetTop + stagesEl.offsetHeight;
      document.getElementById('palette').style.top = (y + 3) + 'px';

      Vue.nextTick(() => {
        this._refreshPixiBones();
      });
    }
  }
</script>
<style scoped>
  #editor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
  }

  #zoomer {
    position: absolute;
    bottom: 3px;
    left: 3px;
  }

  #stages {
    position: absolute;
    top: 3px;
    left: 3px;
  }

  #palette {
    position: absolute;
    top: 100px;
    left: 3px;
  }
</style>