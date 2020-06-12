import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

// Main Route
import Home from "@/components/Layouts/Home.vue";

// User Routes
import Login from "@/components/User/Login.vue";
import Signup from "@/components/User/Signup.vue";
import Forgot from "@/components/User/Forgot.vue";
import Reset from "@/components/User/Reset.vue";

// Account
import Account from "@/components/Layouts/Account.vue";
import CreateNote from "@/components/Layouts/CreateNote.vue";
import EditNote from "@/components/Layouts/EditNote.vue";

// Other
import NotFound from "@/components/Layouts/NotFound.vue";

const routes: Array<RouteConfig> = [
  // Main
  {
    path: "*",
    component: NotFound,
    name: "notFound",
    meta: { title: "Not Found" },
  },
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { title: "Home" },
  },

  // User
  {
    path: "/user/login",
    component: Login,
    name: "login",
    meta: { title: "Login" },
  },
  {
    path: "/user/signup",
    component: Signup,
    name: "signup",
    meta: { title: "Signup" },
  },
  {
    path: "/user/forgot",
    component: Forgot,
    name: "forgot",
    meta: { title: "Forgot" },
  },
  {
    path: "/user/reset",
    component: Reset,
    name: "reset",
    meta: { title: "Reset" },
  },

  // Program
  {
    path: "/account",
    component: Account,
    name: "account",
    meta: { title: "Account", requiresAuth: true },
  },
  {
    path: "/createNote",
    component: CreateNote,
    name: "createNote",
    meta: { title: "Create Note", requiresAuth: true },
  },
  {
    path: "/editNote",
    component: EditNote,
    name: "editNote",
    meta: { title: "Edit Note", requiresAuth: true },
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

  // Grab the accessToken and refreshToken. Dealing with the localStorage
  // and Vuex has been tricky,
  // so we'll just set everything here at the top of the waterfall.
  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
  const refreshToken = localStorage.getItem("refreshToken")
    ? localStorage.getItem("refreshToken")
    : null;

  // What we're accounting for is the instance of a reload, because up until
  // then the user object will be present if they've already logged in.
  // So if an accessToken is present let's set the user object and their
  // access/refresh tokens.
  if (accessToken) {
    router.app.$options.store.dispatch("user/setUserAndTokens", {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  // If the user's not logged in do not allow into protected pages.
  if (to.meta.requiresAuth && !router.app.$options.store.getters["user/user"]) {
    next({ name: "home" });
  }

  next();
});

router.afterEach(() => {
  // End our vue-progressbar
  router.app.$Progress.finish();
});

// The following two interceptor blocks are strictly for
// attaching the top-loading bar to all axios requests and
// stoping the bar on all responses.
axios.interceptors.request.use(
  function(config) {
    router.app.$Progress.start();
    return config;
  },
  function(error) {
    router.app.$Progress.fail();
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  function(response) {
    router.app.$Progress.finish();
    return response;
  },
  function(error) {
    router.app.$Progress.fail();
    return Promise.reject(error);
  },
);

export default router;
