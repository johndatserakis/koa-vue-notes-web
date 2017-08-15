import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import jwtDecode from 'jwt-decode';
import store from './index'
import router from '@/router'
import { setAuthorizationHeader} from '@/common/utilities'
import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL;

const SET_USER = 'SET_USER'
const STORE_ACCESS_TOKEN = 'STORE_ACCESS_TOKEN'
const STORE_REFRESH_TOKEN = 'STORE_REFRESH_TOKEN'
const LOGOUT_USER = 'LOGOUT_USER'

const user = {
    namespaced: true,
    state: {
        user: null,
        accessToken: null,
        refreshToken: null
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
        STORE_ACCESS_TOKEN(state, accessToken) {
            state.accessToken = accessToken
            localStorage.setItem('accessToken', accessToken)
        },
        STORE_REFRESH_TOKEN(state, refreshToken) {
            state.refreshToken = refreshToken
            localStorage.setItem('refreshToken', refreshToken)
        },
        LOGOUT_USER(state) {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    },
    getters: {
        user (state) {
            return state.user
        },
        accessToken (state) {
            return state.accessToken
        },
        refreshToken (state) {
            return state.refreshToken
        }
    },
    actions: {
        setUserAndTokens({ dispatch, commit, getters, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                let decoded = jwtDecode(data.accessToken)
                commit(SET_USER, decoded.data[0])
                commit(STORE_ACCESS_TOKEN, data.accessToken)
                commit(STORE_REFRESH_TOKEN, data.refreshToken)
                return resolve(true)
            })
        },
        userLogin({ dispatch, commit, getters, rootGetters }, credentials){
            return new Promise((resolve, reject) => {
                axios.post('/api/v1/user/authenticate', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    dispatch('setUserAndTokens', {accessToken: response.data.accessToken, refreshToken: response.data.refreshToken})
                    return resolve()
                })
                .catch(error => {
                    Vue.toasted.error('Hmm, those details don\'t seem right.')
                    return reject()
                })
            })
        },
        refreshUserTokens({ dispatch, commit, getters, rootGetters }){
            return new Promise((resolve, reject) => {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                axios.post('/api/v1/user/refreshAccessToken', {
                    username: getters.user.username,
                    refreshToken: getters.refreshToken
                })
                .then(response => {
                    return resolve(response)
                })
                .catch(error => {
                    return reject(error)
                })
            })
        },
        userLogout({ dispatch, commit, getters, rootGetters }, router) {
            return new Promise((resolve, reject) => {
                commit(LOGOUT_USER)
                if (router) {
                    router.push({name: 'home'})
                }
                return resolve()
            })
        },
        userSignup({ dispatch, commit, getters, rootGetters }, credentials){
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
        userForgot({ dispatch, commit, getters, rootGetters }, credentials){
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
        userReset({ dispatch, commit, getters, rootGetters }, credentials){
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
    }
}

export default user