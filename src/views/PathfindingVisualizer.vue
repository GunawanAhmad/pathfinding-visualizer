<template>
  <div class="container">
    <div class="grid" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <Node v-for="(col, colIndex) in row" :key="colIndex" :node="col"></Node>
    </div>
  </div>
</template>

<script>
import Node from "../components/Node.vue";
export default {
  components: { Node },
  data() {
    return {
      START_NODE_ROW: 10,
      START_NODE_COL: 10,
      FINISH_NODE_ROW: 15,
      FINISH_NODE_COL: 15,
      grid: [],
    };
  },
  methods: {
    getInitialGrid() {
      const grid = [];
      for (let row = 0; row < 30; row++) {
        const currentRow = [];
        for (let col = 0; col < 30; col++) {
          currentRow.push(this.createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
    },
    createNode(col, row) {
      return {
        col,
        row,
        isStart: row === this.START_NODE_ROW && col === this.START_NODE_COL,
        isFinish: row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL,
        isVisited: false,
        isWall: false,
        previousNode: null,
      };
    },
  },
  mounted() {
    this.grid = this.getInitialGrid();
  },
};
</script>

<style>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
</style>
