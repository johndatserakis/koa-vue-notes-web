import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

//Axios gets imported here as all api calls come from the store
import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL;

import { addAuthorizationHeader, cleanAuthorizationResponse } from '@/common/utilities'

//Mutations
const LOGOUT_USER = 'LOGOUT_USER'
const STORE_ACCESS_TOKEN = 'STORE_ACCESS_TOKEN'
const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER'

const store = new Vuex.Store({
    state: {
        authenticated: false,
        user: false,
    },
    mutations: {
        LOGOUT_USER(state, token) {
            localStorage.removeItem('accessToken')
            state.user = false
            state.authenticated = false
        },
        STORE_ACCESS_TOKEN(state, token) {
            localStorage.setItem('accessToken', cleanAuthorizationResponse(token))
        },
        SET_AUTHENTICATED_USER(state, user) {
            state.user = user
        },
        SET_AUTHENTICATED(state, boolean) {
            state.authenticated = true
        },
    },
    getters: {
        authenticated (state) {
            return state.authenticated
        },
        user (state) {
            return state.user
        },
    },
    actions: {
        getAuthenticatedUser({commit}){
            return new Promise((resolve, reject) => {
                console.log(localStorage.getItem("accessToken"))
                if (localStorage.getItem("accessToken") === null) {
                    return reject('Error')
                }

                addAuthorizationHeader(localStorage.getItem("accessToken"))
                axios.post('/api/v1/user/getAuthenticatedUser', null)
                .then(response => {
                    commit(STORE_ACCESS_TOKEN, response.headers.authorization)
                    commit(SET_AUTHENTICATED_USER, response.data.user)
                    commit(SET_AUTHENTICATED, true)
                    return resolve()
                })
                .catch(error => {
                    return reject('Error')
                })
            })
        },

        userSignup({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/signup', {
                    first_name: credentials.first_name,
                    last_name: credentials.last_name,
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
                .then(response => {
                    Vue.toasted.success('Successfully signed up. Please login.')
                    resolve(response)
                })
                .catch(error => {
                    for (var key in error.response.data.messages) {
                        Vue.toasted.error(error.response.data.messages[key]);
                    }
                    return reject(error)
                })
            })
        },
        userLogin({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/authenticate', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    commit(STORE_ACCESS_TOKEN, response.data.data.token)
                    Vue.toasted.success('Successfully logged in.')
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    for (var key in error.response.data.messages) {
                        Vue.toasted.error(error.response.data.messages[key]);
                    }
                    return reject(error)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit(LOGOUT_USER)
                resolve()
            })
        },
        userForgot({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/forgot', {
                    email: credentials.email,
                })
                .then(response => {
                    credentials.token = response.data.data.token
                    store.dispatch('sendForgotEmail', credentials)
                    resolve()
                })
                .catch(error => {
                    resolve()
                })
            })
        },
        sendForgotEmail({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/sendForgotEmail', {
                    email: credentials.email,
                    token: credentials.token
                })
                .then(response => {
                    Vue.toasted.success('Please check your email address.')
                    resolve()
                })
                .catch(error => {
                    Vue.toasted.success('Please check your email address.')
                    resolve()
                })
            })
        },
        checkResetToken({commit}, token) {
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/checkResetToken', {
                    token: token
                })
                .then(response => {
                    resolve(response.data.data.email)
                })
                .catch(error => {
                    Vue.toasted.error('Your link has expired or is invalid. Please reset your password again.');
                    return reject(error)
                })
            })
        },
        userReset({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/reset', {
                    password: credentials.password,
                    token: credentials.token,
                    email: credentials.email,
                })
                .then(response => {
                    Vue.toasted.success('Successfully reset password. Please login.')
                    resolve(response)
                })
                .catch(error => {
                    Vue.toasted.error('Your reset link has expired or in incorrect. Please reset your password again.');
                    return reject()
                })
            })
        },

        getUsersNotes({commit}){
            return new Promise((resolve, reject) => {
                addAuthorizationHeader(localStorage.getItem("accessToken"))
                axios.post('/api/v1/notes', null)
                .then(response => {
                    commit(STORE_ACCESS_TOKEN, response.headers.authorization)
                    resolve(response.data)
                })
                .catch(error => {})
            })
        },
    }
})

export default store