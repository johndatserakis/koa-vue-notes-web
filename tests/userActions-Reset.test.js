import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Reset from '../src/components/User/Reset.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

describe('User Action - Reset - testing', () => {
    it('Reset.vue test', () => {
        let actions
        let store

        //Stubbing out vue-router's
        Vue.config.ignoredElements = [
            'router-link'
        ];

        //Stubbing out the query object on the router
        const $route = {
            query: {}
        }

        const wrapper = shallow(Reset, { store, intercept: { $route } })
        expect(wrapper).toBeTruthy()
    })
})