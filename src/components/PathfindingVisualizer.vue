<template>
  <div class="container" ref="container">
    <div class="grid" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <Node
        v-for="(col, colIndex) in row"
        :key="colIndex"
        :node="col"
        @mouseDown="handleMouseDown"
        @mouseEnter="handleMouseEnter"
        @mouseUp="handleMouseUp"
      ></Node>
    </div>
  </div>
</template>

<script>
import Node from "./Node.vue";
import { dijkstra, findTheShortestPath } from "../algorithms/dijkstra";
import { aStar, findTheShortestPathFromAstar } from "../algorithms/aStar";
export default {
  components: { Node },
  data() {
    return {
      START_NODE_ROW: this.$store.state.startNode.row,
      START_NODE_COL: this.$store.state.startNode.col,
      FINISH_NODE_ROW: this.$store.state.finishNode.row,
      FINISH_NODE_COL: this.$store.state.finishNode.col,
      grid: [],
      selectedAlgorithm: "astar",
      isMousePressed: false,
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
    runPathfindingAlgo() {
      this.resetVisitedGrid();
      if (this.$store.state.selectedAlgorithm === "astar") {
        this.runAstarAlgo();
      } else if (this.$store.state.selectedAlgorithm === "dijkstra") {
        this.runDijkstraAlgo();
      }
    },
    runAstarAlgo() {
      const startNode = this.grid[this.$store.state.startNode.row][
        this.$store.state.startNode.col
      ];
      const finishNode = this.grid[this.$store.state.finishNode.row][
        this.$store.state.finishNode.col
      ];
      let visitedList = aStar(this.grid, startNode, finishNode);

      let shortestPath = findTheShortestPathFromAstar(finishNode);
      this.visualizeAlgo(visitedList, shortestPath);
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
      this.visualizeAlgo(visitedNodeInOrder, shortestPathNodesInOrder);
    },
    visualizeAlgo(visitedNodeInOrder, shortestPathNodesInOrder) {
      this.$store.state.runBtn.disabled = true;
      this.$store.state.clearBtn.disabled = true;
      this.$refs.container.classList.add("active");

      for (let i = 0; i < visitedNodeInOrder.length; i++) {
        if (i === visitedNodeInOrder.length - 1) {
          setTimeout(() => {
            this.visualizeShortestPath(shortestPathNodesInOrder);
          }, 20 * i);
        }
        setTimeout(() => {
          if (i === visitedNodeInOrder.length - 1) {
            this.$store.state.runBtn.disabled = false;
            this.$store.state.clearBtn.disabled = false;
            this.$refs.container.classList.remove("active");
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
    handleMouseDown(node) {
      this.createNewGridWithWallToggled(this.grid, node.nodeRow, node.nodeCol);
      this.isMousePressed = true;
      this.$store.state.isMousePressed = true;
    },
    handleMouseEnter(node) {
      if (!this.isMousePressed) return;
      this.createNewGridWithWallToggled(this.grid, node.nodeRow, node.nodeCol);
    },
    handleMouseUp(val) {
      this.isMousePressed = val;
    },
    createNewGridWithWallToggled(grid, nodeRow, nodeCol) {
      if (grid[nodeRow][nodeCol].isWall) {
        grid[nodeRow][nodeCol].isWall = false;
      } else {
        grid[nodeRow][nodeCol].isWall = true;
      }
    },
    resetVisitedGrid() {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          this.grid[i][j].isVisited = false;
          this.grid[i][j].distance = Infinity;
          this.grid[i][j].previousNode = null;
        }
      }
      let visitedNodes = document.querySelectorAll(".node");

      visitedNodes.forEach((node) => {
        node.classList.remove("visited");
        node.classList.remove("short");
      });
    },
    clearBoard() {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          this.grid[i][j].isVisited = false;
          this.grid[i][j].distance = Infinity;
          this.grid[i][j].isWall = false;
        }
      }
      let visitedNodes = document.querySelectorAll(".node");

      visitedNodes.forEach((node) => {
        node.classList.remove("visited");
        node.classList.remove("short");
        node.classList.remove("wall");
      });
    },
  },
  mounted() {
    this.grid = this.getInitialGrid();
    this.$store.state.runBtn.addEventListener("click", () => {
      if (this.$store.state.runBtn.classList.contains("start")) {
        this.$store.state.runBtn.classList.remove("start");
        this.$store.state.runBtn.classList.add("finish");
        this.runPathfindingAlgo();
      } else if (this.$store.state.runBtn.classList.contains("finish")) {
        this.runPathfindingAlgo();
      }
    });

    this.$store.state.clearBtn.addEventListener("click", () => {
      this.clearBoard();
    });
  },
};
</script>

<style lang="scss">
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
  margin-top: 2rem;

  &.active {
    pointer-events: none;
  }
}

.btn {
  position: absolute;
  top: 2rem;
  left: 50%;
}
</style>
