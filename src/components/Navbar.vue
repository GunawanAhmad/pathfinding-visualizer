<template>
  <div class="nav-container">
    <nav class="navbar">
      <div class="select-algo">
        <span>Algorithm : </span>
        <span class="box">
          <span class="result" @click="openAlgoList">
            <p>{{ selectedAlgorithm }}</p>
            <span class="triangle" ref="triangle"></span>
          </span>
          <ul class="ul-list" v-if="isShowingAlgoList">
            <li @click="changeSelectedAlgo('A* Search')">A* Search</li>
            <li @click="changeSelectedAlgo('Dijkstra')">Dijkstra</li>
            <li @click="changeSelectedAlgo('Bidirectional Dijkstra')">
              Bidirectional Dijkstra
            </li>
          </ul>
        </span>
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
      selectedAlgorithm: "Dijkstra",
      isShowingAlgoList: false,
    };
  },
  mounted() {
    this.$store.state.runBtn = this.$refs.visualize;
    this.$store.state.clearBtn = this.$refs.clear;
  },
  methods: {
    changeSelectedAlgo(val) {
      this.$store.state.selectedAlgorithm = val;
      this.selectedAlgorithm = val;
      this.isShowingAlgoList = false;
      this.$refs.triangle.classList.remove("flip");
    },
    openAlgoList() {
      this.isShowingAlgoList = true;
      this.$refs.triangle.classList.add("flip");
    },
  },
};
</script>

<style lang="scss" scoped src="../scss/Navbar.scss"></style>
