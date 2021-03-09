import Vue from "vue";
import VueRouter from "vue-router";
import PathfindingVisualizer from "../views/PathfindingVisualizer";

Vue.use(VueRouter);

const routes = [
  {
    name: "Pathfinding Visializer",
    path: "/",
    component: PathfindingVisualizer,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
