import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Vuelidate from 'vuelidate'

import LoginForm from "@/components/user/forms/LoginForm.vue";
import SignupForm from "@/components/user/forms/SignupForm.vue";
import ForgotForm from "@/components/user/forms/ForgotForm.vue";
import ResetForm from "@/components/user/forms/ResetForm.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(Vuelidate);

const localVueForReset = createLocalVue();
localVueForReset.use(Vuex);
localVueForReset.use(Vuelidate);

describe("User Action Testing", () => {
  let actions;
  let state;
  let store;


  const firstName = "testFirstName";
  const lastName = "testLastName";
  const email = "testEmail";
  const username = "testUsername";
  const password = "testPassword";
  const passwordConfirm = "passwordConfirm";
  const passwordResetToken = "12323423r4wzadfwer";

  beforeEach(() => {
    state = {
      user: {}
    };

    actions = {
      ["user/login"]: () => {
        return;
      },
      ["user/signup"]: () => {
        return;
      },
      ["user/forgot"]: () => {
        return;
      },
      ["user/reset"]: () => {
        return;
      }
    };

    store = new Vuex.Store({
      modules: {
        user: {
          state,
          actions
        }
      }
    });
  });

  it("LoginForm.vue test", () => {
    const wrapper = shallowMount(LoginForm, {
      store,
      localVue,
      propsData: {},
      stubs: ["b-link"]
    });

    wrapper.vm.userLoginPost.username = username;
    wrapper.vm.userLoginPost.password = password;

    expect(wrapper.vm.userLoginPost.username).toBe(username);
    expect(wrapper.vm.userLoginPost.password).toBe(password);

    expect(wrapper.find("#login-submit-button1")).toBeTruthy();
  });

  it("SignupForm.vue test", () => {
    const wrapper = shallowMount(SignupForm, {
      store,
      localVue,
      propsData: {},
      stubs: ["b-link"]
    });

    wrapper.vm.userSignupPost.firstName = firstName;
    wrapper.vm.userSignupPost.lastName = lastName;
    wrapper.vm.userSignupPost.username = email;
    wrapper.vm.userSignupPost.email = username;
    wrapper.vm.userSignupPost.password = password;
    wrapper.vm.userSignupPost.passwordConfirm = passwordConfirm;

    expect(wrapper.vm.userSignupPost.firstName).toBe(firstName);
    expect(wrapper.vm.userSignupPost.lastName).toBe(lastName);
    expect(wrapper.vm.userSignupPost.username).toBe(email);
    expect(wrapper.vm.userSignupPost.email).toBe(username);
    expect(wrapper.vm.userSignupPost.password).toBe(password);
    expect(wrapper.vm.userSignupPost.passwordConfirm).toBe(passwordConfirm);

    expect(wrapper.find("#signup-submit-button")).toBeTruthy();
  });

  it("Forgot.vue test", () => {
    const wrapper = shallowMount(ForgotForm, {
      store,
      localVue,
      propsData: {},
      stubs: ["b-link"]
    });

    wrapper.vm.userForgotPost.email = email;

    expect(wrapper.vm.userForgotPost.email).toBe(email);

    expect(wrapper.find("#forgot-submit-button")).toBeTruthy();
  });

  it("ResetForm.vue test", () => {
    const wrapper = shallowMount(ResetForm, {
      store,
      localVueForReset,
      propsData: {},
      stubs: ["b-link"],
      mocks: {
        $route: {
          name: "reset",
          query: {
            passwordResetToken: passwordResetToken,
            email: email
          }
        }
      }
    });

    wrapper.vm.userResetPost.password = password;
    wrapper.vm.userResetPost.passwordConfirm = passwordConfirm;
    wrapper.vm.userResetPost.passwordResetToken = passwordResetToken;
    wrapper.vm.userResetPost.email = email;

    expect(wrapper).toBeTruthy();
    expect(wrapper.vm.userResetPost.password).toBe(password);
    expect(wrapper.vm.userResetPost.passwordConfirm).toBe(passwordConfirm);
    expect(wrapper.vm.userResetPost.passwordResetToken).toBe(
      passwordResetToken
    );
    expect(wrapper.vm.userResetPost.email).toBe(email);

    expect(wrapper.find("#reset-submit-button")).toBeTruthy();
  });
});
