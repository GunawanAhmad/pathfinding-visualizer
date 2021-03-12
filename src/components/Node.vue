<template>
  <div
    class="node"
    :class="[
      node.isFinish ? 'finish-node draggable' : '',
      node.isStart ? 'start-node draggable' : '',
    ]"
    :id="`node-${node.row}-${node.col}`"
    @dragstart="dragStart"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @dragover="dragOver"
    @drop="dragDrop"
    @dragend="dragEnd"
    @mousedown="mouseDown"
  ></div>
</template>

<script>
export default {
  props: ["node"],
  data() {
    return {
      startNode: null,
      finishNode: null,
    };
  },
  mounted() {
    this.startNode = document.querySelector(".start-node");
    this.finishNode = document.querySelector(".finish-node");
  },

  methods: {
    mouseDown(e) {
      if (e.target.classList.contains("draggable")) {
        if (e.target === this.startNode) {
          this.startNode.classList.add("inDrag");
        } else {
          this.finishNode.classList.add("inDrag");
        }
        return;
      }
      e.preventDefault();
    },
    dragStart(e) {
      if (this.startNode.classList.contains("inDrag")) {
        e.target.classList.remove("start-node", "draggable");
      } else if (this.finishNode.classList.contains("inDrag")) {
        e.target.classList.remove("finish-node", "draggable");
      }
    },
    dragEnd(e) {
      console.log(e.target);
    },
    dragOver(e) {
      e.preventDefault();
    },
    dragEnter(e) {
      e.preventDefault();
      if (this.startNode.classList.contains("inDrag")) {
        e.target.classList.add("start-node", "draggable");
      } else if (this.finishNode.classList.contains("inDrag")) {
        e.target.classList.add("finish-node", "draggable");
      }
    },
    dragLeave(e) {
      e.preventDefault();
      e.target.classList.remove("start-node", "draggable");
      if (this.startNode.classList.contains("inDrag")) {
        e.target.classList.remove("start-node", "draggable");
      } else if (this.finishNode.classList.contains("inDrag")) {
        e.target.classList.remove("finish-node", "draggable");
      }
    },
    dragDrop(e) {
      const newNode = e.target.id.split("-");

      if (this.startNode.classList.contains("inDrag")) {
        e.target.classList.add("start-node", "draggable");
        this.startNode.classList.remove("inDrag");
        this.$store.state.startNode.row = newNode[1];
        this.$store.state.startNode.col = newNode[2];
      } else if (this.finishNode.classList.contains("inDrag")) {
        e.target.classList.add("finish-node", "draggable");
        this.finishNode.classList.remove("inDrag");
        this.$store.state.finishNode.row = newNode[1];
        this.$store.state.finishNode.col = newNode[2];
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
