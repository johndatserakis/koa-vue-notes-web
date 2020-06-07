import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Main
// import NotFound from "@/components/Layouts/main/NotFound.vue";
// import Maintenance from "@/components/layouts/main/Maintenance.vue"
import Home from "@/components/layouts/pages/Home.vue";
import About from "@/components/layouts/pages/About.vue";

// User
// import Login from "@/components/user/components/Login.vue";
// import Signup from "@/components/user/components/Signup.vue";
// import Forgot from "@/components/user/components/Forgot.vue";
// import Reset from "@/components/user/components/Reset.vue";

// Account
// import Dashboard from "@/components/layouts/program/Dashboard.vue";
// import CreateNote from "@/components/layouts/program/CreateNote.vue";
// import EditNote from "@/components/layouts/program/EditNote.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home | Koa-Vue-Notes",
      description: "Home | Koa-Vue-Notes",
      partialType: "full",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About | Koa-Vue-Notes",
      description: "About | Koa-Vue-Notes",
      partialType: "full",
    },
  },
];

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
