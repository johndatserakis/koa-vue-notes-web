// Mutation Observer
// https://bootstrap-vue.js.org/docs#migrating-a-project-already-using-bootstrap
import "mutationobserver-shim";

// Older browser fix github.com/johndatserakis/koa-vue-notes-api/issues/1
import "es6-promise/auto";

// Intersection Observer polyfill
import "intersection-observer";

// Date.toISOString() polyfill
import "@/common/toISOStringPolyfill";

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import "./assets/css/app.scss"; // app styles

Vue.config.productionTip = true;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");
