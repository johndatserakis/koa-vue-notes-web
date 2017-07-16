// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import store from './store'
import { mapState, mapGetters, mapActions } from 'vuex'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
     theme: "bubble",
     position: "top-right",
     duration : 2300
})

import { addAuthorizationHeader } from '@/common/utilities'

// Importing jQuery in ES6 style
// We need to expose jQuery as global variable
// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
import $ from "jquery";
window.jQuery = window.$ = $;
window.Tether = {};
require('bootstrap');

/* App Styles */
import './assets/css/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  // mixins: [mixins],
  computed: {
      ...mapGetters(['user'])
  },
  mounted () {

    // console.log(this.addAuthorizationHeader(234))
  },
  // methods: {
  //   addAuthorizationHeader (accessToken) {
  //       // axios.defaults.headers.common['Authorization'] = "Bearer " +  accessToken
  //       return 'yo tho';
  //   }
  // }
  // created: function() {
  //   setTimeout(function() {
  //     console.log('wow')
  //   }, 3000)
  // }
})

// Vue.mixin({
//   methods: {
//     capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
//   }
// })

