// Older browser support fix
// https://github.com/johndatserakis/koa-vue-notes-api/issues/1
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    theme: 'primary',
    position: 'top-center',
    duration: 2300
})
import 'vue-toasted/dist/vue-toasted.min.css'

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: '#ADE027',
    failedColor: '#F43D41',
    thickness: '3px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
})

import axios from 'axios'

import './assets/css/app.scss' // app styles

// The following two interceptor blocks are strictly for
// attaching the top-loading bar to all axios requests and
// stoping the bar on all responses.
axios.interceptors.request.use(function (config) {
    router.app.$Progress.start()
    return config
}, function (error) {
    router.app.$Progress.fail()
    return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
    router.app.$Progress.finish()
    return response
}, function (error) {
    router.app.$Progress.fail()
    return Promise.reject(error)
})

Vue.config.productionTip = true

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')