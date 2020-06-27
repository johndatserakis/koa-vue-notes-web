<template>
  <div>
    <b-container class="py-4">
      <form-container>
        <b-row class="justify-content-center">
          <b-col lg="6">
            <b-button
              variant="blue"
              size="sm"
              :to="{ name: 'dashboard' }"
              class="mb-4"
            >
              <b-icon-arrow-left></b-icon-arrow-left>
              Dashboard</b-button
            >
            <h1>
              <strong>Create Note</strong>
            </h1>
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.noteCreatePost.title.$error"
              error-message="Please enter a title."
              label="Title"
              name="title"
              type="text"
              v-model="noteCreatePost.title"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-area
              :has-error="$v.noteCreatePost.content.$error"
              error-message="Please enter some content."
              label="Content"
              name="content"
              type="text"
              v-model="noteCreatePost.content"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <submit-button
              name="create-note-submit-button"
              text="Create"
              :isLoading="isLoading"
              loadingText="Creating..."
              @submit-clicked="handleSubmit"
            />
          </b-col>
        </b-row>
      </form-container>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol, BButton, BIconArrowLeft } from "bootstrap-vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { ServerError } from "@/common/api";
import FormContainer from "@/components/partials/forms/inputs/FormContainer.vue";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";
import TextArea from "@/components/partials/forms/inputs/TextArea.vue";
import SubmitButton from "@/components/partials/forms/inputs/SubmitButton.vue";
import { NoteCreatePost } from "@/store/note/api-types";
import { mapActions } from "vuex";

type BaseData = {
  noteCreatePost: NoteCreatePost;
  isLoading: boolean;
};

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    FormContainer,
    TextInput,
    TextArea,
    SubmitButton,
    BButton,
    BIconArrowLeft,
  },
  data(): BaseData {
    return {
      noteCreatePost: {
        title: "",
        content: "",
      },
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("note", { noteCreate: "create" }),
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.isLoading = true;

      try {
        await this.noteCreate(this.noteCreatePost);

        this.noteCreatePost = {
          title: "",
          content: "",
        };

        this.$router.push({ name: "dashboard" });
      } catch (error) {
        const e = error as ServerError;
        if (e && (e.error || e.errors)) {
          //
        }

        this.$bvToast.toast(
          "Hmm, there was an error creating your account. Please try again.",
          { title: "Server Error", variant: "danger" },
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [validationMixin],
  validations: {
    noteCreatePost: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
});
</script>

<style lang="scss"></style>
