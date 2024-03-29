import axios, { refreshTokenInstance } from "@/common/axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { UserTokens } from "@/store/user/types";
import { AxiosResponse } from "axios";
import store from "@/store";

const getToken = (type: "accessToken" | "refreshToken") =>
  localStorage.getItem(type);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const username = store.getters["user/user"].username || "";
    const tokens: AxiosResponse<{
      data: {
        accessToken: UserTokens["accessToken"];
        refreshToken: UserTokens["refreshToken"];
      };
    }> = await refreshTokenInstance.post("user/refreshAccessToken", {
      username,
      refreshToken: getToken("refreshToken"),
    });

    localStorage.setItem("accessToken", tokens.data.data.accessToken);
    localStorage.setItem("refreshToken", tokens.data.data.refreshToken);
    // functional/immutable-data
    // eslint-disable-next-line
    failedRequest.response.config.headers.Authorization = `Bearer ${getToken(
      "accessToken",
    )}`;
    return Promise.resolve();
  } catch (error) {
    await store.dispatch("user/logout");
    return Promise.reject(error);
  }
};

export const runAxiosAuthInterceptor = () => {
  createAuthRefreshInterceptor(axios, refreshAuthLogic);
};
