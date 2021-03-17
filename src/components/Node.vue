<template>
  <div
    class="node"
    :class="[
      node.isFinish ? 'finish-node' : '',
      node.isStart ? 'start-node' : '',
    ]"
    :draggable="node.isStart || node.isFinish"
    :id="`node-${node.row}-${node.col}`"
    @dragstart="dragStart"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @dragover="dragOver"
    @drop="dragDrop"
    @dragend="dragEnd"
    @mousedown="mouseDown"
    @mouseenter="mouseEnter"
    @mouseup="mouseUp"
  ></div>
</template>

<script>
export default {
  props: ["node"],
  data() {
    return {
      startNode: null,
      finishNode: null,
      lastSelectedNode: null,
    };
  },
  mounted() {
    this.startNode = document.querySelector(".start-node");
    this.finishNode = document.querySelector(".finish-node");
  },

  methods: {
    mouseDown(e) {
      if (!e.target.draggable) {
        let nodeRow = e.target.id.split("-")[1];
        let nodeCol = e.target.id.split("-")[2];
        this.$emit("mouseDown", { nodeRow, nodeCol });
        e.target.classList.toggle("wall");
        return;
        // e.preventDefault();
      } else {
        if (e.target.classList.contains("start-node")) {
          this.$store.state.draggedNode = "start";
        } else {
          this.$store.state.draggedNode = "target";
        }
      }
    },
    mouseEnter(e) {
      if (!e.target.draggable) {
        if (this.$store.state.isMousePressed) {
          let nodeRow = e.target.id.split("-")[1];
          let nodeCol = e.target.id.split("-")[2];
          this.$emit("mouseEnter", { nodeRow, nodeCol });
          e.target.classList.toggle("wall");
        }
        e.preventDefault();
      }
    },
    mouseUp() {
      this.$store.state.isMousePressed = false;
      this.$emit("mouseUp", false);
    },

    dragStart(e) {
      e.target.style.opacity = "0";
    },
    dragEnd(e) {
      e.preventDefault();
      e.target.style.opacity = "1";
    },
    dragOver(e) {
      e.preventDefault();
    },
    dragEnter(e) {
      e.preventDefault();
      e.target.style.opacity = "1";
      if (this.$store.state.draggedNode == "start") {
        e.target.classList.add("start-node");
        e.target.draggable = true;
      } else {
        this.$store.state.draggedNode = "target";
        e.target.classList.add("finish-node");
        e.target.draggable = true;
      }
    },
    dragLeave(e) {
      e.preventDefault();
      if (this.$store.state.draggedNode == "start") {
        e.target.classList.remove("start-node");
        e.target.draggable = false;
      } else {
        this.$store.state.draggedNode = "target";
        e.target.classList.remove("finish-node");

        e.target.draggable = false;
      }
    },
    dragDrop(e) {
      const newNode = e.target.id.split("-");
      let startNodes = document.querySelectorAll(".start-node");
      let finishNodes = document.querySelectorAll(".finish-node");

      if (!newNode[2]) return;

      if (this.$store.state.draggedNode == "start") {
        e.target.classList.add("start-node");
        this.$store.state.startNode.row = newNode[1];
        this.$store.state.startNode.col = newNode[2];
      } else {
        e.target.classList.add("finish-node");
        this.$store.state.finishNode.row = newNode[1];
        this.$store.state.finishNode.col = newNode[2];
      }
      e.target.draggable = true;
      if (startNodes.length > 1) {
        startNodes[1].classList.remove("start-node");
      }
      if (finishNodes.length > 1) {
        finishNodes[1].classList.remove("finish-node");
      }
    },
    checkStartNodeTotal() {
      let startNode = document.querySelectorAll(".start-node");
      return startNode;
    },
  },
};
</script>

<style lang="scss" scoped src="../scss/Node.scss"></style>
