<template>
  <div class="nav-container">
    <nav class="navbar">
      <div class="select-algo">
        <span>Algorithm : </span>
        <select name="algorithm" id="algorithm" @change="changeSelectedAlgo">
          <option value="dijkstra" selected>Dijkstra</option>
          <option value="astar">A*</option>
        </select>
      </div>
      <button ref="visualize" class="run-btn start">Visualize !</button>
      <button ref="clear" class="clear-btn start">Clear Board !</button>
    </nav>
    <div class="color-info">
      <div class="yellow">
        <div class="color"></div>
        <p>Visited Node</p>
      </div>
      <div class="soft-yellow">
        <div class="color"></div>
        <p>Shortest Path</p>
      </div>
      <div class="red">
        <div class="color"></div>
        <p>Wall</p>
      </div>
    </div>
    <div class="sign-info">
      <div class="start info">
        <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
        <p>Start Node</p>
      </div>
      <div class="finish info">
        <span class="icon"><i class="fas fa-bullseye"></i></span>
        <p>Target Node</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAlgorithm: "dijkstra",
    };
  },
  mounted() {
    this.$store.state.runBtn = this.$refs.visualize;
    this.$store.state.clearBtn = this.$refs.clear;
  },
  methods: {
    changeSelectedAlgo(e) {
      this.$store.state.selectedAlgorithm = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped src="../scss/Navbar.scss"></style>
