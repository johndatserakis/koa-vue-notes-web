import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Home from '../src/components/Layouts/Home.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

describe('Home testing', () => {
    let actions
    let store
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                user:{}
            },
            actions: {}
        })
    })

    it('Home.vue test', () => {
        const wrapper = shallow(Home, { store })
        expect(wrapper).toBeTruthy()
    })
})