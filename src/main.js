// Mutation Observer
// https://bootstrap-vue.js.org/docs#migrating-a-project-already-using-bootstrap
import "mutationobserver-shim";

// Older browser fix github.com/johndatserakis/koa-vue-notes-api/issues/1
import "es6-promise/auto";

// Intersection Observer polyfill
import "intersection-observer";

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// Color issue
// https://github.com/shakee93/vue-toasted/issues/112
import Toasted from "vue-toasted";
Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-center",
  duration: 2300
});
import "vue-toasted/dist/vue-toasted.min.css";

import VueProgressBar from "vue-progressbar";
Vue.use(VueProgressBar, {
  color: "#ADE027",
  failedColor: "#F43D41",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300
  },
  autoRevert: true,
  location: "top",
  inverse: false
});

import "./assets/css/app.scss"; // app styles

Vue.config.productionTip = true;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
