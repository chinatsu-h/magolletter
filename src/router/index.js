import { createRouter, createWebHistory } from "vue-router";
import Home from "../Home.vue";
import Viewer from "../Viewer.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/viewer",
    component: Viewer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;