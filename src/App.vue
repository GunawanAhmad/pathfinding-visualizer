<template>
  <div id="app">
    <Navbar />
    <pathfinding-visualizer />
  </div>
</template>

<script>
import PathfindingVisualizer from "./components/PathfindingVisualizer.vue";
import Navbar from "./components/Navbar.vue";
export default {
  components: { PathfindingVisualizer, Navbar },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
</style>
