// In a `try/catch`` error you'll need to
// `return Promise.reject(error.response)` in the `catch` portion
// to allow the error to show through
// https://github.com/axios/axios/issues/960#issuecomment-320659373

import axios from "axios";

// If using the local external option when serving the frontend,
// you need to provide the base url the external serving provides.
axios.defaults.baseURL = process.env.VUE_APP_API_URL + "/api/v1";
// axios.defaults.baseURL = "http://192.168.1.169:4000" + "/api/v1";

export default axios;
