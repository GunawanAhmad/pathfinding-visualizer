<template>
  <div class="container">
    <div class="grid" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <Node v-for="(col, colIndex) in row" :key="colIndex" :node="col"></Node>
    </div>
  </div>
</template>

<script>
import Node from "./Node.vue";
import { dijkstra, findTheShortestPath } from "../algorithms/dijkstra";
export default {
  components: { Node },
  data() {
    return {
      START_NODE_ROW: this.$store.state.startNode.row,
      START_NODE_COL: this.$store.state.startNode.col,
      FINISH_NODE_ROW: this.$store.state.finishNode.row,
      FINISH_NODE_COL: this.$store.state.finishNode.col,
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
      let visitedNodeInOrder = [];
      let shortestPathNodesInOrder = [];
      const startNode = this.grid[this.$store.state.startNode.row][
        this.$store.state.startNode.col
      ];
      const finishNode = this.grid[this.$store.state.finishNode.row][
        this.$store.state.finishNode.col
      ];
      visitedNodeInOrder = dijkstra(this.grid, startNode, finishNode);
      shortestPathNodesInOrder = findTheShortestPath(finishNode);
      this.visualizeDijkstra(visitedNodeInOrder, shortestPathNodesInOrder);
    },
    visualizeDijkstra(visitedNodeInOrder, shortestPathNodesInOrder) {
      for (let i = 0; i <= visitedNodeInOrder.length; i++) {
        if (i === visitedNodeInOrder.length) {
          setTimeout(() => {
            this.visualizeShortestPath(shortestPathNodesInOrder);
          }, 20 * i);
        }
        setTimeout(() => {
          if (i === visitedNodeInOrder.length) {
            this.$store.state.runBtn.disabled = false;
            this.$store.state.clearBtn.disabled = false;
          } else {
            this.$store.state.runBtn.disabled = true;
            this.$store.state.clearBtn.disabled = true;
          }
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
    this.$store.state.runBtn.addEventListener("click", () => {
      if (this.$store.state.runBtn.classList.contains("start")) {
        this.$store.state.runBtn.classList.remove("start");
        this.$store.state.runBtn.classList.add("finish");
        this.grid = this.getInitialGrid();
        this.runDijkstraAlgo();
      } else if (this.$store.state.runBtn.classList.contains("finish")) {
        let visitedNodes = document.querySelectorAll(".visited");

        visitedNodes.forEach((node) => {
          node.classList.remove("visited");
          node.classList.remove("short");
        });
        this.grid = this.getInitialGrid();
        this.runDijkstraAlgo();
      }
    });

    this.$store.state.clearBtn.addEventListener("click", () => {
      this.$store.state.runBtn.classList.add("start");
      this.$store.state.runBtn.classList.remove("finish");
      let visitedNodes = document.querySelectorAll(".visited");
      visitedNodes.forEach((node) => {
        node.classList.remove("visited");
        node.classList.remove("short");
      });
    });
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
  margin-top: 100px;
}

.btn {
  position: absolute;
  top: 2rem;
  left: 50%;
}
</style>
