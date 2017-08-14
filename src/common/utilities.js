import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'

function setAuthorizationHeader(accessToken) {
    return axios.defaults.headers.common['Authorization'] = "Bearer " +  accessToken
}

function checkRefreshTokensAndResend(error) {
    if (!error.response) {
        return false
    }

    if (error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED') {
        return new Promise((resolve, reject) => {
            store.dispatch('user/refreshUserTokens')
            .then((response) => {

                store.dispatch('user/setUserAndTokens', {accessToken: response.data.accessToken, refreshToken: response.data.refreshToken})
                .then((response) => {
                    return resolve(true)
                })

            })
            .catch((error) => {
                store.dispatch('user/userLogout')
                router.replace({name: 'login'})
                Vue.toasted.error('To verify your session, please login.')
            })
        })
    }
}

export { setAuthorizationHeader, checkRefreshTokensAndResend };