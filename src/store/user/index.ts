/* eslint-disable @typescript-eslint/no-unused-vars */

import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { SET_USER, CLEAR_USER } from "@/store/user/mutations";
import { RootState } from "@/store/state";
import {
  UserState,
  UserShort,
  UserTokens,
  JwtDecodeData,
} from "@/store/user/types";
import { UserLoginPost } from "./api-types";
import { login as userLogin } from "@/store/user/api-requests";
import { parseAxiosError } from "@/common/api";
import jwtDecode from "jwt-decode";

type UserContext = ActionContext<UserState, RootState>;

const initialState: UserState = {
  user: {
    id: 0,
    token: "",
    username: "",
    email: "",
  },
};

const getters: GetterTree<UserState, RootState> = {
  user(state: UserState): UserShort {
    return state.user;
  },
};

const mutations: MutationTree<UserState> = {
  [SET_USER](state: UserState, user: UserShort) {
    state.user = user;
  },
  [CLEAR_USER](state: UserState) {
    state.user = initialState.user;
  },
};

const actions: ActionTree<UserState, RootState> = {
  async login(
    { commit, dispatch, state }: UserContext,
    data: UserLoginPost,
  ): Promise<UserTokens> {
    try {
      // Authenticate user using creds
      const result = await userLogin(data);

      // Take the accessToken and decode it, giving the user
      const decoded: JwtDecodeData = jwtDecode(result.accessToken);
      commit(SET_USER, decoded.data);

      // Store the accessTokena and refreshToken in localStorage
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      return result;
    } catch (error) {
      return Promise.reject(parseAxiosError(error));
    }
  },
};

export const user = {
  namespaced: true,
  initialState,
  getters,
  mutations,
  actions,
};
