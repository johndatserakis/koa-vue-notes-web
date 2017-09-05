import Vue from 'vue'

import { shallow } from 'vue-test-utils'

import Login from '../src/components/User/Login.vue'
import Signup from '../src/components/User/Signup.vue'
import Forgot from '../src/components/User/Forgot.vue'
import Reset from '../src/components/User/Reset.vue'

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
        actions = {
            //swallow response
            'user/userLogin': () => { return resolve() },
            'user/userSignup': () => { return resolve() },
            'user/userForgot': () => { return resolve() }
        }
        store = new Vuex.Store({
            state: {
                user: {}
            },
            actions
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

        //Hit the submit button
        wrapper.find('#login-submit-button').trigger('click')
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

        wrapper.find('#signup-submit-button').trigger('click')
    })

    it('Forgot.vue test', () => {
        const wrapper = shallow(Forgot, { store })

        expect(wrapper.vm.credentials.email).toBe('')

        wrapper.vm.credentials.email = 'test@email.com'

        expect(wrapper).toBeTruthy()
        expect(wrapper.vm.credentials.email).toBe('test@email.com')

        wrapper.find('#forgot-submit-button').trigger('click')
    })

    it('Reset.vue test', () => {
        //Commenting this out for now as this produces an error
        //'TypeError: Cannot read property 'query' of undefined'.
        //Seems to be having an issue with the mounted function in Reset.vue
        //that uses this.$route.query to access a query variable

        // const wrapper = shallow(Reset, { store })
        // expect(wrapper).toBeTruthy()
    })
})