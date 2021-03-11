<template>
  <div class="container">
    <button @click="runDijkstraAlgo" class="btn">RUN</button>
    <div class="grid" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <Node v-for="(col, colIndex) in row" :key="colIndex" :node="col"></Node>
    </div>
  </div>
</template>

<script>
import Node from "../components/Node.vue";
import { dijkstra, findTheShortestPath } from "../algorithms/dijkstra";
export default {
  components: { Node },
  data() {
    return {
      START_NODE_ROW: 12,
      START_NODE_COL: 13,
      FINISH_NODE_ROW: 11,
      FINISH_NODE_COL: 30,
      grid: [],
    };
  },
  methods: {
    getInitialGrid() {
      const grid = [];
      for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 40; col++) {
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
        distance: Infinity,
      };
    },

    runDijkstraAlgo() {
      const startNode = this.grid[this.START_NODE_ROW][this.START_NODE_COL];
      const finishNode = this.grid[this.FINISH_NODE_ROW][this.FINISH_NODE_COL];
      const visitedNodeInOrder = dijkstra(this.grid, startNode, finishNode);
      const shortestPathNodesInOrder = findTheShortestPath(finishNode);
      this.visualizeDijkstra(visitedNodeInOrder, shortestPathNodesInOrder);
    },
    visualizeDijkstra(visitedNodeInOrder, shortestPathNodesInOrder) {
      for (let i = 0; i <= visitedNodeInOrder.length; i++) {
        if (i === visitedNodeInOrder.length) {
          setTimeout(() => {
            console.log("short");
            this.visualizeShortestPath(shortestPathNodesInOrder);
          }, 20 * i);
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add("visited");
        }, 20 * i);
      }
    },
    visualizeShortestPath(shortestPathNodesInOrder) {
      for (let i = 0; i < shortestPathNodesInOrder.length; i++) {
        setTimeout(() => {
          const node = shortestPathNodesInOrder[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add("short");
        }, 20 * i);
      }
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

.btn {
  position: absolute;
  top: 2rem;
  left: 50%;
}
</style>
