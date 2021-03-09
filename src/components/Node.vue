<template>
  <div
    class="node"
    :class="[
      node.isFinish ? 'finish-node' : '',
      node.isStart ? 'start-node' : '',
    ]"
  ></div>
</template>

<script>
export default {
  props: ["node"],
};
</script>

<style>
.node {
  height: 25px;
  width: 25px;
  outline: 1px solid rgb(192, 191, 191);
  display: inline-block;
}

.finish-node {
  background: red;
}

.start-node {
  background: green;
}
</style>
