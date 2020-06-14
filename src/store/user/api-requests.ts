import axios from "@/common/axios";
import { AxiosResponse } from "axios";
import {
  UserLoginPost,
  UserSignupPost,
  UserForgotPost,
  UserResetPost,
} from "./api-types";
import { UserTokens } from "./types";

const routeLogin = "user/authenticate";
const routeSignup = "user/signup";
const routeForgot = "user/forgot";
const routerReset = "user/reset";

export const login = async (data: UserLoginPost): Promise<UserTokens> => {
  const result: AxiosResponse<{
    data: {
      accessToken: UserTokens["accessToken"];
      refreshToken: UserTokens["refreshToken"];
    };
  }> = await axios.post(routeLogin, data);

  return result.data.data;
};

export const signup = async (data: UserSignupPost): Promise<number> => {
  const result: AxiosResponse<{
    data: { id: number };
  }> = await axios.post(routeSignup, data);
  return result.data.data.id;
};

export const forgot = async (data: UserForgotPost): Promise<string> => {
  const result: AxiosResponse<{
    data: { passwordResetToken: string };
  }> = await axios.post(routeForgot, data);
  return result.data.data.passwordResetToken;
};

export const reset = async (data: UserResetPost): Promise<void> => {
  await axios.post(routerReset, data);
  return Promise.resolve();
};
