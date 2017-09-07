import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL
import { setAuthorizationHeader } from '@/common/utilities'

const ADD_NOTES = 'ADD_NOTES'
const ADD_NOTE_TO_STACK = 'ADD_NOTE_TO_STACK'
const DELETE_NOTE_FROM_STACK = 'DELETE_NOTE_FROM_STACK'
const LOGOUT_USER = 'LOGOUT_USER'

const note = {
    namespaced: true,
    state: {
        notes: []
    },
    mutations: {
        ADD_NOTES (state, data) {
            state.notes = state.notes.concat(data)
        },
        ADD_NOTE_TO_STACK (state, note) {
            state.notes.unshift(note)
        },
        DELETE_NOTE_FROM_STACK (state, note) {
            if (state.notes.length) {
                let i = state.notes.map(note => note.id).indexOf(note.id)
                state.notes.splice(i, 1)
            }
        },
        LOGOUT_USER (state) {
            state.notes = []
        }
    },
    getters: {
        notes (state) {
            return state.notes
        }
    },
    actions: {
        // API Calls
        getUsersNotes ({ dispatch, commit, getters, rootGetters }, data) {
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
        getNote ({ dispatch, commit, getters, rootGetters }, data) {
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
        createNote ({ dispatch, commit, getters, rootGetters }, data) {
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
        saveNote ({ dispatch, commit, getters, rootGetters }, data) {
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
        deleteNote ({ dispatch, commit, getters, rootGetters }, data) {
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

        // Only Mutations
        userLogout ({ dispatch, commit, getters, rootGetters }) {
            return new Promise((resolve, reject) => {
                commit(LOGOUT_USER)
                return resolve()
            })
        },
        addNoteToStack ({ dispatch, commit, getters, rootGetters }, note) {
            return new Promise((resolve, reject) => {
                commit(ADD_NOTE_TO_STACK, note)
                return resolve()
            })
        },
        deleteNoteFromStack ({ dispatch, commit, getters, rootGetters }, note) {
            return new Promise((resolve, reject) => {
                commit(DELETE_NOTE_FROM_STACK, note)
                return resolve()
            })
        }
    }
}

export default note
