<template>
  <li class="item">
    <div class="item-outer">
      <span class="expander"
            v-if="isFolder"
            @click="toggle">{{(model.childBones.length === 0) ? '&nbsp;' : (open ? '&ndash;' : '+')}}
      </span>
      <span
          :class="[itemTextClass, (isSelectedBone) ? selectedClass : unselectedClass]"
          @click="selectBone(model.id)">
        {{model.name}}
      </span>
      <span class="icons">
        <boneTreeItemButton text="add" color="#fff" backgroundColor="#268bd2"
                            @click="addChild(model.id)"></boneTreeItemButton>
        <boneTreeItemButton text="delete" color="#fff"
                            backgroundColor="#cb4b16"
                            @click="deleteBone(model.id)"></boneTreeItemButton>
      </span>
    </div>
    <ul class="sub-item" v-show="open" v-if="isFolder">
      <item
          class="item"
          v-for="model in model.childBones"
          :key="model.id"
          :model="model">
      </item>
    </ul>
    <simplert ref="simplert"></simplert>
  </li>
</template>
<script>
  import boneTreeItemButton from './bone-tree-item-button.vue';
  import simplert from 'vue2-simplert';
  import * as Types from './store/mutation-types';

  export default {
    name: 'item',
    components: {
      simplert,
      boneTreeItemButton
    },
    props: {
      model: Object
    },
    data: function () {
      return {
        open: false,
        itemTextClass: 'item-text',
        selectedClass: 'selected',
        unselectedClass: 'unselected'
      }
    },
    computed: {
      isFolder: function () {
        return true;
      },
      showExpander() {
      },
      isSelectedBone() {
        if (!this.$store.state.selectedBone) {
          return false;
        }
        return this.$store.state.selectedBone.id === this.model.id;
      }
    },
    methods: {
      toggle() {
        if (this.isFolder) {
          this.open = !this.open;
        }
      },
      addChild(parentBoneId) {
        this.open = true;
        this.$store.commit(Types.ADD_BONE, parentBoneId);
      },
      deleteBone(boneId) {
        this.$refs.simplert.openSimplert({
          title: 'Delete Bone?',
          message: 'Permanently delete this bone and its child bones?',
          type: 'warning',
          useConfirmBtn: true,
          onConfirm: () => {
            this.$store.commit(Types.DELETE_BONE, boneId);
          }
        });
      },
      selectBone(boneId) {
        this.$store.commit(Types.SELECT_BONE, boneId);
      }
    }
  }
</script>
<style scoped>
  .sub-item {
    padding: 0;
    margin: 0;
  }

  .item {
    list-style: none;
    white-space: nowrap;
    padding-left: 1em;
  }

  .item-outer {
  }

  .item-text {
    border-radius: 3px;
    border: none;
    padding: 3px;
    margin-right: 3px;
    margin-left: 3px;
  }

  .selected {
    background-color: #93a1a1;
    color: #002b36;
    cursor: default;
  }

  .unselected {
    cursor: pointer;
  }

  .item-outer:hover > .icons {
    visibility: visible;
  }

  .expander {
    cursor: pointer;
    font-weight: bold;
    font-size: 150%;
    vertical-align: middle;
  }

  .icons {
    visibility: hidden;
    vertical-align: middle;
  }

</style>
