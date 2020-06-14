// import { ThunkDispatch, ThunkAction } from "redux-thunk";
// import { RootState } from "@/store";

export type UserTokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type UserShort = {
  readonly id: number;
  readonly token: string;
  readonly username: string;
  readonly email: string;
};

export type UserState = {
  readonly user: UserShort;
};

// export const SET_USER = "SET_USER";
// export const CLEAR_USER = "CLEAR_USER";

// type SetUserAction = {
//   readonly type: typeof SET_USER;
//   readonly payload: UserShort;
// };

// type ClearUser = {
//   readonly type: typeof CLEAR_USER;
// };

// export type UserActionTypes = SetUserAction | ClearUser;

export type JwtDecodeData = {
  readonly data: UserShort;
  readonly iat: number;
  readonly exp: number;
};

// export type UserThunkDispatch = ThunkDispatch<
//   RootState,
//   undefined,
//   UserActionTypes
// >;

// export type UserThunkResult<Result> = ThunkAction<
//   Result,
//   RootState,
//   undefined,
//   UserActionTypes
// >;
