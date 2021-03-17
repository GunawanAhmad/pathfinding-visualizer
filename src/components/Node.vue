<template>
  <div
    class="node"
    :class="[
      node.isFinish ? 'finish-node draggable' : '',
      node.isStart ? 'start-node draggable' : '',
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
        e.preventDefault();
      }
      e.target.classList.add("last");
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
      e.target.style.opacity = "0.6";
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
      e.target.classList.add(["start-node", "draggable"]);
    },
    dragLeave(e) {
      e.preventDefault();
    },
    dragDrop(e) {
      const newNode = e.target.id.split("-");
      if (!newNode[2]) return;
      let lastDraggedElement = document.querySelector(".last");
      if (
        (lastDraggedElement.classList.contains("start-node") &&
          e.target.classList.contains("finish-node")) ||
        (e.target.classList.contains("start-node") &&
          lastDraggedElement.classList.contains("finish-node"))
      )
        return;
      if (lastDraggedElement.classList.contains("start-node")) {
        e.target.classList.add("start-node", "draggable");
        this.$store.state.startNode.row = newNode[1];
        this.$store.state.startNode.col = newNode[2];
      } else {
        e.target.classList.add("finish-node", "draggable");
        this.$store.state.finishNode.row = newNode[1];
        this.$store.state.finishNode.col = newNode[2];
      }
      if (e.target === lastDraggedElement) return;
      lastDraggedElement.draggable = false;
      lastDraggedElement.className = "";
      lastDraggedElement.classList.add("node");
      e.target.draggable = true;
    },
    checkStartNodeTotal() {
      let startNode = document.querySelectorAll(".start-node");
      return startNode;
    },
  },
};
</script>

<style lang="scss" scoped src="../scss/Node.scss"></style>
