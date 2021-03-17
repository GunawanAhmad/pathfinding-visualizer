<template>
  <div id="app">
    <Navbar />
    <pathfinding-visualizer />
    <Aboutme />
  </div>
</template>

<script>
import PathfindingVisualizer from "./components/PathfindingVisualizer.vue";
import Navbar from "./components/Navbar.vue";
import Aboutme from "./components/Aboutme.vue";
export default {
  components: { PathfindingVisualizer, Navbar, Aboutme },
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
