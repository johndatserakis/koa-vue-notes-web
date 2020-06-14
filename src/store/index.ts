import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import { user } from "@/store/user";
// import note from "@/store/note";

const store = new Vuex.Store({
  modules: {
    user,
    // note
  },
  strict: process.env.NODE_ENV !== "production",
});

export default store;
