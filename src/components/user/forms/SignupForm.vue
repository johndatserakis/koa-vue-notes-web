<template>
  <div>
    <b-container class="py-4">
      <form-container>
        <b-row class="justify-content-center">
          <b-col lg="6">
            <h1>
              <strong>Signup</strong>
            </h1>
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userSignupPost.firstName.$error"
              error-message="Please enter a first name."
              label="First Name"
              name="firstName"
              type="text"
              v-model="userSignupPost.firstName"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userSignupPost.lastName.$error"
              error-message="Please enter a last name."
              label="Last Name"
              name="lastName"
              type="text"
              v-model="userSignupPost.lastName"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userSignupPost.username.$error"
              error-message="Please enter a username."
              label="Username"
              name="username"
              type="text"
              v-model="userSignupPost.username"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userSignupPost.email.$error"
              error-message="Please enter a email."
              label="Email"
              name="email"
              type="text"
              v-model="userSignupPost.email"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userSignupPost.password.$error"
              error-message="Please enter a valid password that is at least 8 characters."
              label="Password (minimum 8 characters)"
              name="password"
              type="password"
              v-model="userSignupPost.password"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userSignupPost.passwordConfirm.$error"
              error-message="Please make sure your passwords match."
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
              v-model="userSignupPost.passwordConfirm"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <submit-button
              name="signup-submit-button"
              text="Signup"
              :isLoading="isLoading"
              loadingText="Signing up..."
              @submit-clicked="handleSubmit"
            />
          </b-col>
        </b-row>
      </form-container>
    </b-container>
    <b-container class="py-4">
      <b-row class="justify-content-center">
        <b-col lg="6">
          <b-link to="/user/forgot">Forgot Password</b-link>
          |
          <b-link to="/user/login">Login</b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol, BLink } from "bootstrap-vue";
import { validationMixin } from "vuelidate";
import { email, minLength, required, sameAs } from "vuelidate/lib/validators";
import {
  UserSignupPost,
  UserSignupPostWithPasswordConfirm,
} from "@/store/user/api-types";
import { ServerError } from "@/common/api";
import FormContainer from "@/components/partials/forms/inputs/FormContainer.vue";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";
import SubmitButton from "@/components/partials/forms/inputs/SubmitButton.vue";

type BaseData = {
  userSignupPost: UserSignupPostWithPasswordConfirm;
  isLoading: boolean;
};

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    FormContainer,
    TextInput,
    SubmitButton,
    BLink,
  },
  data(): BaseData {
    return {
      userSignupPost: {
        firstName: "John",
        lastName: "Dats",
        username: "demousername",
        email: "johndatserakis@gmail.com",
        password: "demopassword",
        passwordConfirm: "demopassword",
      },
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.isLoading = true;

      try {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          passwordConfirm,
          ...valuesNoPasswordConfirm
        } = this.userSignupPost;
        const convertedValues: UserSignupPost = { ...valuesNoPasswordConfirm };
        await this.$store.dispatch("user/signup", convertedValues);

        this.userSignupPost = {
          firstName: "John",
          lastName: "Dats",
          username: "demousername",
          email: "johndatserakis@gmail.com",
          password: "demopassword",
          passwordConfirm: "demopassword",
        };

        this.$router.push({ name: "home" });

        // Note, we use $root here because we're changing screens...
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3934#issuecomment-524374321
        this.$root.$bvToast.toast("Account created. Please login.", {
          title: "Success",
          variant: "success",
        });
      } catch (error) {
        const e = error as ServerError;
        if (e && (e.error || e.errors)) {
          if (e.error.message === "DUPLICATE_USERNAME") {
            this.$bvToast.toast("That username is taken. Please try again.", {
              title: "Server Error",
              variant: "danger",
            });
          }
          if (e.error.message === "DUPLICATE_EMAIL") {
            this.$bvToast.toast("That email is taken. Please try again.", {
              title: "Server Error",
              variant: "danger",
            });
          }
        } else {
          this.$bvToast.toast(
            "Hmm, there was an error creating your account. Please try again.",
            { title: "Server Error", variant: "danger" },
          );
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [validationMixin],
  validations: {
    userSignupPost: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      username: {
        required,
      },
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      passwordConfirm: {
        sameAs: sameAs("password"),
      },
    },
  },
});
</script>

<style lang="scss"></style>
