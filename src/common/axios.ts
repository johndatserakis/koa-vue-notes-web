// Because we want to customize the baseURL for axios, we export an instance
// here and use *it* as axios throughout our app.

import axios, { AxiosInstance } from "axios";

// If using the local external option when serving the frontend,
// you need to provide the base url the external serving provides.
const defaultOptions = {
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
};

// Create instance
const instance = axios.create(defaultOptions);

// eslint-disable-next-line import/no-default-export
export default instance;

// Here's our authorization header helper. It'll read the localStorage and
// use a potentially available accessToken to refresh our user
export const setAuthorizationHeader = (a: AxiosInstance) => {
  // functional/immutable-data
  // eslint-disable-next-line
  a.defaults.headers.common.Authorization = `Bearer ${
    localStorage.getItem("accessToken") || ""
  }`;
};
