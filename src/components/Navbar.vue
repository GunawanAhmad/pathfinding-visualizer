<template>
  <nav class="navbar">
    <div class="node-sign">
      <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
      <p>Start Node</p>
    </div>
    <button ref="visualize" class="run-btn start">Visualize !</button>
    <button ref="clear" class="clear-btn start">Clear Board !</button>
    <div class="node-sign">
      <span class="icon"><i class="fas fa-bullseye"></i></span>
      <p>Target Node</p>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$store.state.runBtn = this.$refs.visualize;
    this.$store.state.clearBtn = this.$refs.clear;
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  min-height: 5rem;
  background: #f0c929;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  .run-btn,
  .clear-btn {
    background: #ac0d0d;
    color: white;
    border: none;
    max-height: 50px;
    padding: 1rem 2rem;
    margin-right: 1rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      background: rgb(150, 149, 149);
    }

    &:hover {
      background: #fbe6c2;
      color: #313131;
    }
  }

  .node-sign {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    color: #313131;

    &:first-child {
      margin-right: 1rem;
    }

    .icon {
      font-size: 1.5rem;
      width: 30px;
      display: block;
      display: flex;
      justify-content: center;
      margin-right: 0.1rem;
    }

    p {
      font-weight: 600;
    }
  }
}
</style>
