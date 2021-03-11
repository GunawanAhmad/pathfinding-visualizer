<template>
  <div
    class="node"
    :class="[
      node.isFinish ? 'finish-node' : '',
      node.isStart ? 'start-node' : '',
    ]"
    :id="`node-${node.row}-${node.col}`"
    @click="test"
    :draggable="node.isStart ? true : false"
  ></div>
</template>

<script>
export default {
  props: ["node"],
  methods: {
    test(e) {
      console.log(e.target);
    },
  },
};
</script>

<style>
.node {
  height: 25px;
  width: 25px;
  outline: 1px solid rgb(192, 191, 191);
  display: inline-block;
}

.node.finish-node {
  background: transparent;

  height: 25px;
  width: 25px;
  outline: 1px solid rgb(192, 191, 191);
  display: inline-block;
  position: relative;
}

.node.start-node {
  position: relative;
  background: transparent;
  height: 25px;
  width: 25px;
  outline: 1px solid rgb(192, 191, 191);
  display: inline-block;
}

.node.start-node::before {
  /* display: none; */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 1.5rem;
  content: "\f3c5";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: black;
}

.node.finish-node::before {
  /* display: none; */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 1.5rem;
  content: "\f140";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: black;
}

.visited {
  background: gray;
}

.short {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes visitedAnimation {
  /* 0% {
    opacity: 0.2;
    background-color: gray;
    border-radius: 100%;
  }

  50% {
    opacity: 0.5;
    background-color: gray;
  }

  75% {
    opacity: 0.7;
    background-color: gray;
  }

  100% {
    opacity: 1;
    background-color: gray; */
  /* } */
}

@keyframes shortestPath {
  0% {
    opacity: 0.3;
    background-color: rgb(255, 254, 106);
  }

  50% {
    opacity: 0.7;
    background-color: rgb(255, 254, 106);
  }

  100% {
    opacity: 1;
    background-color: rgb(255, 254, 106);
  }
}
</style>
