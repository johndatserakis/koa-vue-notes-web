import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from '@/common/axios'
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
            try {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                const response = await axios.get('notes', {params: {sort: data.sort, order: data.order, page: data.page, limit: data.limit}})
                commit(ADD_NOTES, response.data)
                return response.data
            } catch (error) {
                throw new Error(error)
            }
        },
        async getNote ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                const response = await axios.get('notes/' + data)
                return response.data
            } catch (error) {
                throw new Error(error)
            }
        },
        async createNote ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                return await axios.post('notes', {title: data.title, content: data.content})
            } catch (error) {
                throw new Error(error)
            }
        },
        async saveNote ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                return await axios.put('notes/' + data.id, {title: data.title, content: data.content})
            } catch (error) {
                throw new Error(error)
            }
        },
        async deleteNote ({ dispatch, commit, getters, rootGetters }, data) {
            try {
                setAuthorizationHeader(rootGetters['user/accessToken'])
                return await axios.delete('notes/' + data.id)
            } catch (error) {
                throw new Error(error)
            }
        },

        // Only Mutations
        async userLogout ({ dispatch, commit, getters, rootGetters }) {
            try {
                commit(LOGOUT_USER)
            } catch (error) {
                throw new Error(error)
            }
        },
        async addNoteToStack ({ dispatch, commit, getters, rootGetters }, note) {
            try {
                commit(ADD_NOTE_TO_STACK, note)
            } catch (error) {
                throw new Error(error)
            }
        },
        async deleteNoteFromStack ({ dispatch, commit, getters, rootGetters }, note) {
            try {
                commit(DELETE_NOTE_FROM_STACK, note)
            } catch (error) {
                throw new Error(error)
            }
        },
        async editNoteInStack ({ dispatch, commit, getters, rootGetters }, note) {
            try {
                commit(EDIT_NOTE_IN_STACK, note)
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default note
