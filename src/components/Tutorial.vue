<template>
  <div>
    <div class="container" v-if="isShowTutorial">
      <div class="tutorial">
        <h1 class="title">{{ setPagesData.Title }}</h1>
        <p class="description">{{ setPagesData.description }}</p>

        <img
          :src="require(`../assets/${setPagesData.img}`)"
          class="img"
          alt=""
        />

        <div class="buttons">
          <div class="left-side">
            <button class="Skip btn" @click="isShowTutorial = false">
              Skip tutorial
            </button>
          </div>
          <div class="right-side">
            <button
              class="btn previous"
              @click="currentPage--"
              :disabled="currentPage > 0 ? false : true"
            >
              Back
            </button>
            <button
              class="btn next"
              @click="currentPage++"
              :disabled="currentPage < pagesData.length - 1 ? false : true"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tutorial-icon"
      v-if="!isShowTutorial"
      @click="isShowTutorial = true"
    >
      <div class="icon">
        <i class="fas fa-lightbulb"></i>
      </div>
      <p>Tutorial</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
      isShowTutorial: true,
      pagesData: [
        {
          Title: "Welcome to Pathfinding Visualizer !",
          description:
            'If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!',
          imgLink: "https://storyset.com/people",
          img: "welcome.svg",
        },
        {
          Title: "What is a pathfinding algorithm?",
          description:
            "Pathfinding algorithm is an algorithm that used to find shortest path between two points.",
          imgLink: "https://storyset.com/city",
          img: "navigation.svg",
        },
        {
          Title: "Using the Navigation bar",
          description:
            "You can pick the type of the algorithm and start visualizing the algorithm from the navigation bar. You can clear the board like previous path and wall by clicking the clear board button.",
          img: "navbar.jpg",
        },
        {
          Title: "Adding Walls",
          description:
            "Click the grid to add a wall, hold the click and move your mouse to add more wall. Walls are impenetrable, meaning that a path cannot cross through them.",
          img: "addWall.gif",
        },
      ],
    };
  },

  computed: {
    setPagesData() {
      return this.pagesData[this.currentPage];
    },
  },
};
</script>

<style scoped lang="scss" src="../scss/Tutorial.scss"></style>
