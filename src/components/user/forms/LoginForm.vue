<template>
  <div>
    <b-container class="py-4">
      <form-container>
        <b-row class="justify-content-center">
          <b-col lg="6">
            <h1>
              <strong>Login</strong>
            </h1>
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userLoginPost.username.$error"
              error-message="Please enter a username."
              label="Username"
              name="username"
              type="text"
              v-model="userLoginPost.username"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userLoginPost.password.$error"
              error-message="Please enter a password."
              label="Password"
              name="password"
              type="text"
              v-model="userLoginPost.password"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <submit-button
              name="login-submit-button"
              text="Login"
              :isLoading="isLoading"
              loadingText="Logging in ..."
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
          <b-link to="/user/signup">Signup</b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol, BLink } from "bootstrap-vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { UserLoginPost } from "@/store/user/api-types";
import { ServerError } from "@/common/api";
import FormContainer from "@/components/partials/forms/inputs/FormContainer.vue";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";
import SubmitButton from "@/components/partials/forms/inputs/SubmitButton.vue";

type BaseData = {
  userLoginPost: UserLoginPost;
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
      userLoginPost: {
        username: "demousername",
        password: "demopassword",
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
        await this.$store.dispatch("user/login", this.userLoginPost);

        // Get user's notes
        // await dispatch(all({ sort: "", order: "desc", page: 0, limit: 1000 }));
        // await this.$store.dispatch("note/all", { sort: "", order: "desc", page: 0, limit: 1000 })

        // Clear inputs
        this.userLoginPost = {
          username: "demousername",
          password: "demopassword",
        };

        // Push to dashboard
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        const e = error as ServerError;
        if (e && (e.error || e.errors)) {
          //
        }

        this.$bvToast.toast(
          "Hmm, those details don't seem right. Please try again.",
          { title: "Input Error", variant: "danger" },
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [validationMixin],
  validations: {
    userLoginPost: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
});
</script>

<style lang="scss"></style>
