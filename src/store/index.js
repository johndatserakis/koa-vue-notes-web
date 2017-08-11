import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

//Axios gets imported here as all api calls come from the store
import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL;

// import { addAuthorizationHeader, cleanAuthorizationResponse } from '@/common/utilities'

import jwtDecode from 'jwt-decode';

const SET_USER = 'SET_USER'
const STORE_ACCESS_TOKEN = 'STORE_ACCESS_TOKEN'
const STORE_REFRESH_TOKEN = 'STORE_REFRESH_TOKEN'
const LOGOUT_USER = 'LOGOUT_USER'

const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
        STORE_ACCESS_TOKEN(state, accessToken) {
            localStorage.setItem('accessToken', accessToken)
        },
        STORE_REFRESH_TOKEN(state, refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
        },
        LOGOUT_USER(state) {
            state.user = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    },
    getters: {
        user (state) {
            return state.user
        },
        accessToken (state) {
            if (localStorage.getItem("accessToken") === null) {
                return null
            }
            return localStorage.getItem("accessToken")
        },
        refreshToken (state) {
            if (localStorage.getItem("refreshToken") === null) {
                return null
            }
            return localStorage.getItem("refreshToken")
        }
    },
    actions: {
        setUserAndTokens({commit}, data) {
            let decoded = jwtDecode(data.accessToken)
            commit(SET_USER, decoded.data[0])
            commit(STORE_ACCESS_TOKEN, data.accessToken)
            commit(STORE_REFRESH_TOKEN, data.refreshToken)
        },
        userLogin({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/authenticate', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    store.dispatch('setUserAndTokens', {accessToken: response.data.accessToken, refreshToken: response.data.refreshToken})
                    Vue.toasted.success('Successfully logged in.')
                    return resolve()
                })
                .catch(error => {
                    Vue.toasted.error('Hmm, those details don\'t seem right.')
                    return reject()
                })
            })
        },
        userLogout({commit}, router) {
            commit(LOGOUT_USER)
            router.push({name: 'home'})
        },
        userSignup({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/signup', {
                    firstName: credentials.firstName,
                    lastName: credentials.lastName,
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
                .then(response => {
                    Vue.toasted.success('Successfully signed up. Please login.')
                    return resolve()
                })
                .catch(error => {
                    Vue.toasted.error('Hmm, something you entered doesn\'t seem right.')
                    return reject()
                })
            })
        },
        userForgot({commit}, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/forgot', {
                    email: credentials.email,
                    url: process.env.APP_URL + '/user/reset',
                    type: 'web'
                })
                .then(response => {
                    Vue.toasted.success('Please check your email.')
                    resolve()
                })
                .catch(error => {
                    //We really don't want to let spammers know
                    //they've partially matched a user.
                    Vue.toasted.success('Please check your email.')
                    resolve()
                })
            })
        },
        userReset({commit}, credentials){
            return new Promise((resolve, reject) => {
                console.log('here')
                axios.post('/api/v1/user/resetPassword', {
                    password: credentials.password,
                    passwordResetToken: credentials.passwordResetToken,
                    email: credentials.email,
                })
                .then(response => {
                    Vue.toasted.success('Successfully reset password. Please login.')
                    return resolve()
                })
                .catch(error => {
                    console.log(error)
                    Vue.toasted.error('Your reset link has expired or is incorrect. Please reset your password again.');
                    return reject()
                })
            })
        },

        // getUsersNotes({commit}){
        //     return new Promise((resolve, reject) => {
        //         addAuthorizationHeader(localStorage.getItem("accessToken"))
        //         axios.post('/api/v1/notes', null)
        //         .then(response => {
        //             commit(STORE_ACCESS_TOKEN, response.headers.authorization)
        //             resolve(response.data)
        //         })
        //         .catch(error => {})
        //     })
        // },
    }
})

export default store