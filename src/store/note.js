import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
axios.defaults.baseURL = process.env.API_URL
import { setAuthorizationHeader } from '@/common/utilities'

const ADD_NOTES = 'ADD_NOTES'
const ADD_NOTE_TO_STACK = 'ADD_NOTE_TO_STACK'
const DELETE_NOTE_FROM_STACK = 'DELETE_NOTE_FROM_STACK'
const EDIT_NOTE_IN_STACK = 'EDIT_NOTE_IN_STACK'
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
        EDIT_NOTE_IN_STACK (state, note) {
            if (state.notes.length) {
                let i = state.notes.map(note => note.id).indexOf(note.id)
                Vue.set(state.notes, i, note)
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
        async getUsersNotes ({ dispatch, commit, getters, rootGetters }, data) {
            // Why not create an API module in which you import store + axios and export axios with headers set? No need to set headers then.
            setAuthorizationHeader(rootGetters['user/accessToken'])
            // axios already returns a promise, no need to wrap it
            // Also, I really like async/await
            const { sort, order, page, limit } = data
            const response = await axios.get('/api/v1/notes', {params: { sort, order, page, limit }})
            commit(ADD_NOTES, response.data)
            return response.data
        },
        getNote ({ dispatch, commit, getters, rootGetters }, data) {
            setAuthorizationHeader(rootGetters['user/accessToken'])
            return axios.get('/api/v1/notes/' + data)
            .then(response => {
                resolve(response.data)
            })
        },
        createNote ({ dispatch, commit, getters, rootGetters }, data) {
            setAuthorizationHeader(rootGetters['user/accessToken'])
            return axios.post('/api/v1/notes/', {title: data.title, content: data.content})
            .then(response => {
                resolve(response)
            })
        },
        saveNote ({ dispatch, commit, getters, rootGetters }, data) {
            setAuthorizationHeader(rootGetters['user/accessToken'])
            return axios.put('/api/v1/notes/' + data.id, {title: data.title, content: data.content})
            .then(response => {
                resolve(response)
            })
        },
        deleteNote ({ dispatch, commit, getters, rootGetters }, data) {
            setAuthorizationHeader(rootGetters['user/accessToken'])
            return axios.delete('/api/v1/notes/' + data.id)
            .then(response => {
                resolve(response)
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
        },
        editNoteInStack ({ dispatch, commit, getters, rootGetters }, note) {
            return new Promise((resolve, reject) => {
                commit(EDIT_NOTE_IN_STACK, note)
                return resolve()
            })
        }
    }
}

export default note
