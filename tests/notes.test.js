import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import CreateNote from '../src/components/Layouts/CreateNote.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

describe('Note testing', () => {
    let actions
    let store
    beforeEach(() => {
        actions = {}
        store = new Vuex.Store({
            state: {
                user: {},
                notes: {}
            },
            actions
        })
    })

    it('CreateNote.vue test', () => {
        const wrapper = shallow(CreateNote, { store })
        expect(wrapper).toBeTruthy()
    })
})