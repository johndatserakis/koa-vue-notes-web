// Mutation Observer
// https://bootstrap-vue.js.org/docs#migrating-a-project-already-using-bootstrap
import "mutationobserver-shim";

// Older browser fix github.com/johndatserakis/koa-vue-notes-api/issues/1
import "es6-promise/auto";

// Intersection Observer polyfill
import "intersection-observer";

// Date.toISOString() polyfill
import "@/common/toISOStringPolyfill.ts";

import { isProd } from "@/common/get-env";

import Vue from "vue";
import App from "@/App.vue";

import router from "@/router";
import store from "@/store";

import { ToastPlugin } from "bootstrap-vue";
Vue.use(ToastPlugin);

import VueProgressBar from "vue-progressbar";
Vue.use(VueProgressBar, {
  color: "#ADE027",
  failedColor: "#F43D41",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
});

import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA_TRACKING_ID,
  enabled: isProd,
  router,
});

// Attach our axios interceptor
import { runAxiosAuthInterceptor } from "@/common/axios-auth-interceptor";
runAxiosAuthInterceptor();

import "@/assets/css/app.scss"; // app styles

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
