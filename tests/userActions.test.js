import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Login from '../src/components/User/Login.vue'
import Signup from '../src/components/User/Signup.vue'
import Forgot from '../src/components/User/Forgot.vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Router from 'vue-router'
Vue.use(Router)

describe('User action testing', () => {
    let actions
    let store
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                user: {}
            },
            actions: {
                //swallow response
                'user/userLogin': () => { return },
                'user/userSignup': () => { return },
                'user/userForgot': () => { return }
            }
        })
    })

    it('Login.vue test', () => {
        const wrapper = shallow(Login, { store })

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
        const wrapper = shallow(Signup, { store })

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
        const wrapper = shallow(Forgot, { store })

        expect(wrapper.vm.credentials.email).toBe('')

        wrapper.vm.credentials.email = 'test@email.com'

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.email).toBe('test@email.com')

        expect(wrapper.find('#forgot-submit-button')).toBeTruthy()
    })
})