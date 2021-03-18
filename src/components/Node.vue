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
        this.$store.state.draggedNode = "wall";

        return;
      } else {
        if (e.target.classList.contains("start-node")) {
          this.$store.state.draggedNode = "start";
        } else {
          this.$store.state.draggedNode = "target";
        }
      }
    },
    mouseEnter(e) {
      if (!e.target.draggable && !e.target.classList.contains("finish-node")) {
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
      let startNodes = document.querySelectorAll(".start-node");
      let finishNodes = document.querySelectorAll(".finish-node");
      if (startNodes.length > 1) {
        startNodes[1].classList.remove("start-node");
      }
      if (finishNodes.length > 1) {
        finishNodes[1].classList.remove("finish-node");
      }
      let newNode = this.$store.state.draggedElm;
      this.setStartOrTargetNode(newNode);
    },
    dragOver(e) {
      e.preventDefault();
    },
    dragEnter(e) {
      e.preventDefault();

      if (this.$store.state.draggedNode == "wall") return;
      this.$store.state.draggedElm = e.target;
      e.target.style.opacity = "1";
      if (this.$store.state.draggedNode == "start") {
        e.target.classList.add("start-node");
        // e.target.draggable = true;
      } else if (this.$store.state.draggedNode == "target") {
        this.$store.state.draggedNode = "target";
        e.target.classList.add("finish-node");
        // e.target.draggable = true;
      }
      if (e.target.classList.contains("wall")) {
        let nodeRow = e.target.id.split("-")[1];
        let nodeCol = e.target.id.split("-")[2];
        this.$emit("mouseUp", true);
        this.$emit("mouseEnter", { nodeRow, nodeCol });
        this.$emit("mouseUp", false);
        e.target.classList.remove("wall");
      }
    },
    dragLeave(e) {
      e.preventDefault();
      if (this.$store.state.draggedNode == "start") {
        e.target.classList.remove("start-node");
        e.target.draggable = false;
      } else if (this.$store.state.draggedNode == "target") {
        e.target.classList.remove("finish-node");
        e.target.draggable = false;
      }
    },
    dragDrop(e) {
      if (this.$store.state.draggedNode == "wall") return;
      this.setStartOrTargetNode(e.target);
      e.target.draggable = true;
    },

    setTargetNode(row, col, elm) {
      elm.classList.add("finish-node");
      elm.draggable = true;
      this.$store.state.finishNode.row = row;
      this.$store.state.finishNode.col = col;
    },
    setStartNode(row, col, elm) {
      elm.draggable = true;
      elm.classList.add("start-node");
      this.$store.state.startNode.row = row;
      this.$store.state.startNode.col = col;
    },
    setStartOrTargetNode(elm) {
      const newNode = elm.id.split("-");
      if (!newNode[2]) return;
      if (this.$store.state.draggedNode == "start") {
        this.setStartNode(newNode[1], newNode[2], elm);
      } else if (this.$store.state.draggedNode == "target") {
        this.setTargetNode(newNode[1], newNode[2], elm);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="../scss/Node.scss"></style>
