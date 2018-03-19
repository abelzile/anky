<template>
  <div class="timeline">
    <div class="stage-name">
      {{stageName}}
    </div>
    <table class="grid">
      <tr>
        <th scope="col">PLAY CONTROLS!</th>
        <th scope="col" v-for="n in totalFrames">
          {{ n }}
        </th>
      </tr>
      <tr v-for="bone in bones" :key="bone.id">
        <td>{{ bone.name }}</td>
        <td v-for="n in totalFrames">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'timeline',
    data() {
      return {
        totalFrames: 10
      };
    },
    props: {
      model: Object
    },
    computed: {
      stageName() {
        return this.model.selectedStage.name;
      },
      bones() {
        const allChildBones = this.model.rootBone.getAllChildBones();
        allChildBones.unshift(this.model.rootBone);

        return allChildBones;
      }
    }
  }
</script>

<style scoped>
  /*
  let color1 = 0x93a1a1;
        let color2 = 0x839496;
   */

  .timeline {
    background-color:#073642;
  }

  .stage-name {
    background-color: #002b36;
    color: #93a1a1;
    font-weight: bold;
    padding: 3px;
  }

  .grid {
    border-collapse: collapse;
    border: 1px solid #073642;
  }

  .grid th, .grid td {
    border: 1px solid #073642;
    background-color: #839496;
    width: 20px;
    white-space: nowrap;
  }

  .grid th[scope=col] {
    text-align: center;
    border-bottom: 2px solid #073642;
  }


</style>
