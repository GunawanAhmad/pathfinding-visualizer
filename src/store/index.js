import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startNode: {
      row: 10,
      col: 10,
      element: null,
    },
    finishNode: {
      row: 10,
      col: 30,
      element: null,
    },
    runBtn: null,
    clearbtn: null,
    selectedAlgorithm: "dijkstra",
    isMousePressed: false,
    draggedNode: "",
    draggedElm: null,
    dragElm: null,
  },
  mutations: {},
  actions: {},
  modules: {},
});
