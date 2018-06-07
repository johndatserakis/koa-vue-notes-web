import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

import Login from '@/components/User/Login.vue'
import Signup from '@/components/User/Signup.vue'
import Forgot from '@/components/User/Forgot.vue'
import Reset from '@/components/User/Reset.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(Vuelidate)

describe('User Action Testing', () => {
    let actions
    let state
    let store

    beforeEach(() => {
        state = {
            user: {}
        }

        actions = {
            ['user/userLogin']: () => { return },
            ['user/userSignup']: () => { return },
            ['user/userForgot']: () => { return }
        }

        store = new Vuex.Store({
            modules: {
                user: {
                    state,
                    actions
                }
            }
        })
    })

    it('Login.vue test', () => {
        const wrapper = shallowMount(Login, {
            store,
            localVue,
            propsData: {},
            stubs: ['router-link']
        })

        //Check that the proper object is preset
        expect(wrapper.vm.credentials.username).toBe('')
        expect(wrapper.vm.credentials.password).toBe('')

        //Make sure we can load some values into the credentials array
        wrapper.vm.credentials.username = 'testUsername'
        wrapper.vm.credentials.password = 'testPassword'

        //Check em
        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.username).toBe('testUsername')
        expect(wrapper.vm.credentials.password).toBe('testPassword')

        //Find the submit button
        expect(wrapper.find('#login-submit-button')).toBeTruthy()
    })

    it('Signup.vue test', () => {
        const wrapper = shallowMount(Signup, {
            store,
            localVue,
            propsData: {},
            stubs: ['router-link']
        })

        expect(wrapper.vm.credentials.firstName).toBe('')
        expect(wrapper.vm.credentials.lastName).toBe('')
        expect(wrapper.vm.credentials.username).toBe('')
        expect(wrapper.vm.credentials.email).toBe('')
        expect(wrapper.vm.credentials.password).toBe('')
        expect(wrapper.vm.credentials.passwordConfirm).toBe('')

        wrapper.vm.credentials.firstName = 'testFirstName'
        wrapper.vm.credentials.lastName = 'testLastName'
        wrapper.vm.credentials.username = 'testUsername'
        wrapper.vm.credentials.email = 'test@email.com'
        wrapper.vm.credentials.password = 'testPassword'
        wrapper.vm.credentials.passwordConfirm = 'testPassword'

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.firstName).toBe('testFirstName')
        expect(wrapper.vm.credentials.lastName).toBe('testLastName')
        expect(wrapper.vm.credentials.username).toBe('testUsername')
        expect(wrapper.vm.credentials.email).toBe('test@email.com')
        expect(wrapper.vm.credentials.password).toBe('testPassword')
        expect(wrapper.vm.credentials.passwordConfirm).toBe('testPassword')

        expect(wrapper.find('#signup-submit-button')).toBeTruthy()
    })

    it('Forgot.vue test', () => {
        const wrapper = shallowMount(Forgot, {
            store,
            localVue,
            propsData: {},
            stubs: ['router-link']
        })

        expect(wrapper.vm.credentials.email).toBe('')

        wrapper.vm.credentials.email = 'test@email.com'

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.email).toBe('test@email.com')

        expect(wrapper.find('#forgot-submit-button')).toBeTruthy()
    })
})

// We need to skip reset for now - see
// https://github.com/vuejs/vue-test-utils/issues/323
