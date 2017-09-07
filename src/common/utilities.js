import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'

function setAuthorizationHeader(accessToken) {
    return axios.defaults.headers.common['Authorization'] = "Bearer " +  accessToken
}

export { setAuthorizationHeader };