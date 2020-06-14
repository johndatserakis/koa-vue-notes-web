import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import jwtDecode from "jwt-decode";
import store from "@/store";

Vue.use(VueRouter);

// Main Route
import Home from "@/components/layouts/pages/Home.vue";

// User Routes
import Login from "@/components/user/components/Login.vue";
import Signup from "@/components/user/components/Signup.vue";
import Forgot from "@/components/user/components/Forgot.vue";
import Reset from "@/components/user/components/Reset.vue";

// Account
import Dashboard from "@/components/layouts/program/Dashboard.vue";
import CreateNote from "@/components/layouts/program/CreateNote.vue";
import EditNote from "@/components/layouts/program/EditNote.vue";

// Other
import NotFound from "@/components/layouts/main/NotFound.vue";
import Maintenance from "@/components/layouts/main/Maintenance.vue";
import { JwtDecodeData } from "@/store/user/types";

const routes: Array<RouteConfig> = [
  // Main
  {
    path: "*",
    component: NotFound,
    name: "notFound",
    meta: { title: "Not Found", partialType: "meta" },
  },
  {
    path: "/maintenance",
    component: Maintenance,
    name: "maintenance",
    meta: { title: "Maintenance", partialType: "meta" },
  },

  // Pages
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { title: "Home", partialType: "full" },
  },

  // User
  {
    path: "/user/login",
    component: Login,
    name: "login",
    meta: { title: "Login", partialType: "full" },
  },
  {
    path: "/user/signup",
    component: Signup,
    name: "signup",
    meta: { title: "Signup", partialType: "full" },
  },
  {
    path: "/user/forgot",
    component: Forgot,
    name: "forgot",
    meta: { title: "Forgot", partialType: "full" },
  },
  {
    path: "/user/reset",
    component: Reset,
    name: "reset",
    meta: { title: "Reset", partialType: "full" },
  },

  // Program
  {
    path: "/dashboard",
    component: Dashboard,
    name: "dashboard",
    meta: { title: "Dashboard", requiresAuth: true, partialType: "account" },
  },
  {
    path: "/create-note",
    component: CreateNote,
    name: "create-note",
    meta: { title: "Create Note", requiresAuth: true, partialType: "account" },
  },
  {
    path: "/edit-note/:id",
    component: EditNote,
    name: "edit-note",
    meta: { title: "Edit Note", requiresAuth: true, partialType: "account" },
    props: true,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, _, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // Start our vue-progressbar
  router.app.$Progress.start();

  // To set the title of each route
  document.title = to.meta.title;

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken != null && refreshToken != null) {
    const decoded: JwtDecodeData = jwtDecode(accessToken);
    store.commit("user/SET_USER", decoded.data);
  }

  // If the user's not logged in do not allow into protected pages.
  if (to.meta.requiresAuth && !store.getters["user/user"].id) {
    next({ name: "home" });
  }

  next();
});

router.afterEach(() => {
  // End our vue-progressbar
  router.app.$Progress.finish();
});

export default router;
