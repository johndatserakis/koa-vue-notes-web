import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Account from '@/components/Layouts/Account'
import CreateNote from '@/components/Layouts/CreateNote'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('Note Testing', () => {
    let actions
    let state
    let store

    beforeEach(() => {
        state = {
            note: {}
        }

        actions = {
            ['note/createNote']: jest.fn()
            // ['note/createNote']: jest.fn(() => Promise.resolve({}))
        }

        store = new Vuex.Store({
            modules: {
                note: {
                    state,
                    actions
                }
            }
        })
    })

    it('CreateNote.vue test', () => {
        const wrapper = shallowMount(CreateNote, {
            store,
            localVue,
            propsData: {},
            stubs: ['sidebar']
        })

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
        // wrapper.find('#create-note-button').trigger('click')
    })
})