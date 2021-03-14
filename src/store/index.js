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
  },
  mutations: {},
  actions: {},
  modules: {},
});
