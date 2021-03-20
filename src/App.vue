<template>
  <div id="app">
    <Navbar />
    <pathfinding-visualizer />
    <Aboutme />
    <Tutorial />
  </div>
</template>

<script>
import PathfindingVisualizer from "./components/PathfindingVisualizer.vue";
import Navbar from "./components/Navbar.vue";
import Aboutme from "./components/Aboutme.vue";
import Tutorial from "./components/Tutorial";
export default {
  components: { PathfindingVisualizer, Navbar, Aboutme, Tutorial },
};
</script>
<style lang="scss">
:root {
  --visited-clr: #e9896a;
  --shortestPath-clr: #387c6d;
  --wall-clr: #343f56;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  overflow-x: hidden;
}
</style>
