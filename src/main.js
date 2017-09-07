// Older browser support fix
// https://github.com/johndatserakis/koa-vue-notes-api/issues/1
import 'es6-promise/auto'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import store from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    theme: 'bubble',
    position: 'top-right',
    duration: 2300
})

import VModal from 'vue-js-modal'
Vue.use(VModal, { dialog: true })

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: '#ADE027',
    failedColor: '#F43D41',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
})

// Importing jQuery in ES6 style
// We need to expose jQuery as global variable
// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
// Also we're silencing the Popper Bootstrap error message
import $ from 'jquery'
window.jQuery = window.$ = $
window.Popper = {}
require('bootstrap')

/* App Styles */
import './assets/css/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})
