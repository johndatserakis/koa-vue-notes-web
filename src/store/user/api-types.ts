import * as Yup from "yup";

export type UserLoginPost = {
  readonly username: string;
  readonly password: string;
};

export type UserSignupPost = {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
};

export type UserSignupPostWithPasswordConfirm = UserSignupPost & {
  readonly passwordConfirm: string;
};

export type UserForgotPost = {
  readonly email: string;
  readonly url: string;
  readonly type: "web";
};

export type UserResetPost = {
  readonly passwordResetToken: string;
  readonly email: string;
  readonly password: string;
};

export type UserResetPostWithPasswordConfirm = UserResetPost & {
  readonly passwordConfirm: string;
};

//

export const UserLoginPostValidation = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
});

export const UserSignupPostWithPasswordConfirmValidation = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .required("Email is required")
    .email(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirm is required"),
});

export const UserForgotPostValidation = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email(),
});

export const UserResetPostWithPasswordConfirmValidation = Yup.object({
  passwordResetToken: Yup.string().required("Required"),
  email: Yup.string()
    .required("Email is required")
    .email(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirm is required"),
});
