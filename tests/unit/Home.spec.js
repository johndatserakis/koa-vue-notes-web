import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from '@/components/Layouts/Home'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('Home.vue', () => {
    let actions
    let state
    let store

    beforeEach(() => {
        state = {
            user: {}
        }

        actions = {}

        store = new Vuex.Store({
            modules: {
                user: {
                    state,
                    actions
                }
            }
        })
    })

    it('Loads correctly', () => {
        const wrapper = shallowMount(Home, {
            store,
            localVue,
            propsData: {},
            stubs: []
        })

        expect(wrapper).toBeTruthy()
    })
})