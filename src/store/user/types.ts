export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserShort = {
  id: number;
  token: string;
  username: string;
  email: string;
};

export type UserState = {
  user: UserShort;
};

export type JwtDecodeData = {
  data: UserShort;
  iat: number;
  exp: number;
};
