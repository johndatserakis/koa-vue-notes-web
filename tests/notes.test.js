import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Account from '../src/components/Layouts/Account.vue'
import CreateNote from '../src/components/Layouts/CreateNote.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import Router from 'vue-router'
Vue.use(Router)

describe('Note testing', () => {
    let actions
    let store
    beforeEach(() => {
        store = new Vuex.Store({
            state: {},
            actions: {}
        })
    })

    it('CreateNote.vue test', () => {
        //Stubbing out sidebar component
        Vue.config.ignoredElements = [
            'sidebar'
        ];

        const wrapper = shallow(CreateNote, { store })

        //Check that the proper object is preset
        expect(wrapper.vm.note.title).toBe('')
        expect(wrapper.vm.note.content).toBe('')

        //Make sure we can load some values into the credentials array
        wrapper.vm.note.title = 'testTitle'
        wrapper.vm.note.content = 'testContent'

        //Check em
        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.note.title).toBe('testTitle')
        expect(wrapper.vm.note.content).toBe('testContent')

        //Hit the submit button
        wrapper.find('#create-note-button').trigger('click')
    })
})