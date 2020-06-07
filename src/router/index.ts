// import Vue from "vue";
// import VueRouter, { RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";

// Vue.use(VueRouter);

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

// export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/layouts/pages/Home.vue";
// import About from "../components/layouts/pages/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
    // component: () => import("../components/layouts/pages/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/layouts/pages/About.vue")
  }
];

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes
});

export default router;
