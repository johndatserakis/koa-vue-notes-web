import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
// import store from "./store";

import "./assets/css/app.scss";

const vueApp = createApp(App);
vueApp.use(router);
// vueApp.use(store);
vueApp.mount("#app");
