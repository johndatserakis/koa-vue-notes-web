import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import jwtDecode from "jwt-decode";
import store from "@/store/index";
import router from "@/router";
import { setAuthorizationHeader } from "@/common/utilities";
import axios from "@/common/axios";

// In the case of multiple api calls needing to be refreshed
// https://github.com/axios/axios/issues/450#issuecomment-247446276
let authTokenRequest;
async function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = store.dispatch("user/refreshUserTokens");
    authTokenRequest
      .then(() => {
        authTokenRequest = null;
      })
      .catch(() => {
        authTokenRequest = null;
      });
  }
  return authTokenRequest;
}

async function logoutOfProgram() {
  // All Vuex modules must logout here
  // Another technique, that we're using here, is to force a reload of
  // the actual page. This ensures everything is cleared. The is the only
  // place I ever refresh the page on purpose.
  await store.dispatch("user/userLogout");

  router.replace({ name: "login" });
}

// Axios interceptor that'll take care of expired tokens
axios.interceptors.response.use(undefined, async error => {
  if (
    error.response.status === 401 &&
    error.response.data.message === "TOKEN_EXPIRED" &&
    !error.config.__isRetryRequest
  ) {
    try {
      let response = await getAuthToken();
      await store.dispatch("user/setUserAndTokens", {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      });
      error.config.headers["Authorization"] =
        "Bearer " + store.getters["user/accessToken"];
      error.config.__isRetryRequest = true;
      // error.config.baseURL needs to be zeroed out to prevent tripping over
      // the baseURL we set in our main axios instance
      error.config.baseURL = "";
      return axios(error.config);
    } catch (error) {
      logoutOfProgram();
      return Promise.reject(error);
    }
  }

  // This is for a user that isn't logged in correctly
  if (
    error.response.status === 401 &&
    error.response.data.message === "AUTHENTICATION_ERROR"
  ) {
    logoutOfProgram();
    return Promise.reject(error);
  }

  // If someone gets here we don't want to log them out, because it's
  // more of a general error
  return Promise.reject(error);
});

const SET_USER = "SET_USER";
const STORE_ACCESS_TOKEN = "STORE_ACCESS_TOKEN";
const STORE_REFRESH_TOKEN = "STORE_REFRESH_TOKEN";
const LOGOUT_USER = "LOGOUT_USER";

const user = {
  namespaced: true,
  state: {
    user: null,
    accessToken: null,
    refreshToken: null
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    STORE_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    STORE_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },
    LOGOUT_USER(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    }
  },
  actions: {
    async setUserAndTokens({ commit }, data) {
      try {
        let decoded = jwtDecode(data.accessToken);
        commit(SET_USER, decoded.data);
        commit(STORE_ACCESS_TOKEN, data.accessToken);
        commit(STORE_REFRESH_TOKEN, data.refreshToken);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async userLogin({ dispatch }, credentials) {
      try {
        const response = await axios.post("user/authenticate", {
          username: credentials.username,
          password: credentials.password
        });
        return await dispatch("setUserAndTokens", {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async refreshUserTokens({ getters, rootGetters }) {
      try {
        setAuthorizationHeader(rootGetters["user/accessToken"]);
        return await axios.post("user/refreshAccessToken", {
          username: getters.user.username,
          refreshToken: getters.refreshToken
        });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async userLogout({ commit }) {
      try {
        commit(LOGOUT_USER);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async userSignup(_, credentials) {
      try {
        return await axios.post("user/signup", {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          username: credentials.username,
          email: credentials.email,
          password: credentials.password
        });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async userForgot(_, credentials) {
      try {
        return await axios.post("user/forgot", {
          email: credentials.email,
          url: process.env.VUE_APP_URL + "/user/reset",
          type: "web"
        });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async userReset(_, credentials) {
      try {
        return await axios.post("user/resetPassword", {
          password: credentials.password,
          passwordResetToken: credentials.passwordResetToken,
          email: credentials.email
        });
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    }
  }
};

export default user;
