import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import user from './user'
import note from './note'

const store = new Vuex.Store({
  modules: {
    user: user,
    note: note
  }
})

export default store