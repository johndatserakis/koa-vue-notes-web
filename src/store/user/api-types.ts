export type UserLoginPost = {
  username: string;
  password: string;
};

export type UserSignupPost = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type UserSignupPostWithPasswordConfirm = UserSignupPost & {
  passwordConfirm: string;
};

export type UserForgotPost = {
  email: string;
  url: string;
  type: "web";
};

export type UserResetPost = {
  passwordResetToken: string;
  email: string;
  password: string;
};

export type UserResetPostWithPasswordConfirm = UserResetPost & {
  passwordConfirm: string;
};
