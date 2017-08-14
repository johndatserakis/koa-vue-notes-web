import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL;

import store from '@/store'
import router from '@/router'

// Add a response interceptor
// Old don't use
// axios.interceptors.response.use(function (response) {
//     // console.log('here')
//     // console.log(response)
//     // Do something with response data
//     //return response;
// }, function (error) {
//     // console.log('here')
//     // console.log('here')
//     // console.log()
//     // // Do something with response error
//     // //return Promise.reject(error);

//     //We're going to set up shop here. We're going to listen for a 401
//     //response from our api. We'll also check to make sure the error message reads TOKEN_EXPIRED
//     if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED') {
//         console.log(note)
//         let originalRequest = error.config

//         // setAuthorizationHeader(rootGetters['user/accessToken'])
//         // axios.get('/api/v1/notes', {params: {sort: data.sort, order: data.order, page: data.page, limit: data.limit}})
//         // .then(response => {
//         //     commit(ADD_NOTES, response.data)
//         //     resolve(response.data)
//         // })
//         // .catch(error => {
//         //     Vue.toasted.error('Hmm, there was an error conecting to the server.')
//         // })
//     }
// });

import jwtDecode from 'jwt-decode';

import { setAuthorizationHeader, refreshTokensAndResend} from '@/common/utilities'

const ADD_NOTES = 'ADD_NOTES'

const note = {
    namespaced: true,
    state: {
        notes: []
    },
    mutations: {
        ADD_NOTES(state, data) {
            state.notes = state.notes.concat(data)
        },
    },
    getters: {
        notes (state) {
            return state.notes
        },
    },
    actions: {
        getUsersNotes({ dispatch, commit, getters, rootGetters}, data){
            return new Promise((resolve, reject) => {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                axios.get('/api/v1/notes', {params: {sort: data.sort, order: data.order, page: data.page, limit: data.limit}})
                .then(response => {
                    commit(ADD_NOTES, response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getNote({ dispatch, commit, getters, rootGetters}, data){
            return new Promise((resolve, reject) => {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                axios.get('/api/v1/notes/' + data)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        createNote({ dispatch, commit, getters, rootGetters}, data){
            return new Promise((resolve, reject) => {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                axios.post('/api/v1/notes/', {title: data.title, content: data.content})
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        saveNote({ dispatch, commit, getters, rootGetters}, data){
            return new Promise((resolve, reject) => {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                axios.put('/api/v1/notes/' + data.id, {title: data.title, content: data.content})
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        deleteNote({ dispatch, commit, getters, rootGetters}, data){
            return new Promise((resolve, reject) => {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                axios.delete('/api/v1/notes/' + data.id)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default note