<template>
  <div>
    <b-container class="py-4">
      <form-container>
        <b-row class="justify-content-center">
          <b-col lg="6">
            <h1>
              <strong>Reset</strong>
            </h1>
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userResetPost.password.$error"
              error-message="Please enter a valid password that is at least 8 characters."
              label="Password (minimum 8 characters)"
              name="password"
              type="password"
              v-model="userResetPost.password"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userResetPost.passwordConfirm.$error"
              error-message="Please make sure your passwords match."
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
              v-model="userResetPost.passwordConfirm"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <submit-button
              name="reset-submit-button"
              text="Submit"
              :isLoading="isLoading"
              loadingText="Submitting ..."
              @submit-clicked="handleSubmit"
            />
          </b-col>
        </b-row>
      </form-container>
    </b-container>
    <b-container class="py-4">
      <b-row class="justify-content-center">
        <b-col lg="6">
          <b-link to="/user/login">Login</b-link>
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
import { minLength, sameAs } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
import {
  UserResetPost,
  UserResetPostWithPasswordConfirm,
} from "@/store/user/api-types";
import { ServerError } from "@/common/api";
import FormContainer from "@/components/partials/forms/inputs/FormContainer.vue";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";
import SubmitButton from "@/components/partials/forms/inputs/SubmitButton.vue";

type BaseData = {
  userResetPost: UserResetPostWithPasswordConfirm;
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
      userResetPost: {
        passwordResetToken: "",
        email: "",
        password: "",
        passwordConfirm: "",
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
        } = this.userResetPost;
        const convertedValues: UserResetPost = { ...valuesNoPasswordConfirm };
        await this.$store.dispatch("user/reset", convertedValues);

        this.userResetPost = {
          passwordResetToken: "",
          email: "",
          password: "",
          passwordConfirm: "",
        };

        this.$root.$bvToast.toast(
          "Your password has been reset. Please login.",
          {
            title: "Success",
            variant: "success",
          },
        );

        // Push to dashboard
        this.$router.push({ name: "home" });
      } catch (error) {
        const e = error as ServerError;
        if (e && (e.error || e.errors)) {
          //
        }

        this.$bvToast.toast(
          "Hmm, there was an error connecting to the server. Please try again.",
          { title: "Server Error", variant: "danger" },
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [validationMixin],
  mounted() {
    this.userResetPost.passwordResetToken =
      (this.$route.query.passwordResetToken as string) || "";
    this.userResetPost.email = (this.$route.query.email as string) || "";

    if (!this.userResetPost.passwordResetToken || !this.userResetPost.email) {
      this.$root.$bvToast.toast(
        "Sorry, but there is something wrong with your reset link. Please try again.",
        { title: "Input Error", variant: "danger" },
      );
      this.$router.push({ name: "home" });
    }
  },
  props: ["passwordResetToken"],
  validations: {
    userResetPost: {
      passwordResetToken: {
        required,
      },
      email: {
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
