<template>
  <div>
    <b-container class="py-4">
      <form-container>
        <b-row class="justify-content-center">
          <b-col lg="6">
            <h1>
              <strong>Forgot</strong>
            </h1>
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.userForgotPost.email.$error"
              error-message="Please enter a email."
              label="Email"
              name="email"
              type="text"
              v-model="userForgotPost.email"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <submit-button
              name="forgot-submit-button"
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
import { required } from "vuelidate/lib/validators";
import { UserForgotPost } from "@/store/user/api-types";
import { ServerError } from "@/common/api";
import FormContainer from "@/components/partials/forms/inputs/FormContainer.vue";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";
import SubmitButton from "@/components/partials/forms/inputs/SubmitButton.vue";

type BaseData = {
  userForgotPost: UserForgotPost;
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
      userForgotPost: {
        email: "",
        url: `${process.env.VUE_APP_URL}/user/reset`,
        type: "web",
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
        await this.$store.dispatch("user/forgot", this.userForgotPost);

        this.userForgotPost = {
          email: "",
          url: `${process.env.VUE_APP_URL}/user/reset`,
          type: "web",
        };

        this.$root.$bvToast.toast("Please check your email.", {
          title: "Success",
          variant: "success",
        });

        // Push to dashboard
        this.$router.push({ name: "home" });
      } catch (error) {
        const e = error as ServerError;
        if (e && (e.error || e.errors)) {
          //
        }

        this.$bvToast.toast(
          "Hmm, those details don't seem right. Please try again.",
          { title: "Server Error", variant: "danger" },
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [validationMixin],
  validations: {
    userForgotPost: {
      email: {
        required,
      },
    },
  },
});
</script>

<style lang="scss"></style>
