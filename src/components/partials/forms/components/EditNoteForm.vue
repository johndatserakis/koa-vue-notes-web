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
              <strong>Edit Note</strong>
            </h1>
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-input
              :has-error="$v.noteEditPut.title.$error"
              error-message="Please enter a title."
              label="Title"
              name="title"
              type="text"
              v-model="noteEditPut.title"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <text-area
              :has-error="$v.noteEditPut.content.$error"
              error-message="Please enter some content."
              label="Content"
              name="content"
              type="text"
              v-model="noteEditPut.content"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6" class="mb-4">
            <submit-button
              name="save-note-submit-button"
              text="Update"
              :isLoading="isLoading"
              loadingText="Updating..."
              @submit-clicked="handleSubmit"
            />
          </b-col>

          <div class="w-100" />

          <b-col lg="6">
            <b-button block variant="red" @click="del">
              Delete
            </b-button>
          </b-col>
        </b-row>
      </form-container>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BContainer, BRow, BCol, BButton, BIconArrowLeft } from "bootstrap-vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { ServerError } from "@/common/api";
import FormContainer from "@/components/partials/forms/inputs/FormContainer.vue";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";
import TextArea from "@/components/partials/forms/inputs/TextArea.vue";
import SubmitButton from "@/components/partials/forms/inputs/SubmitButton.vue";
import { Note } from "@/store/note/types";
import { NoteEditPut } from "@/store/note/api-types";
import { mapActions } from "vuex";

type BaseData = {
  noteEditPut: NoteEditPut;
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
      noteEditPut: {
        title: this.note.title,
        content: this.note.content,
      },
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("note", { noteUpdate: "update", noteDel: "del" }),
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.isLoading = true;

      try {
        const editedNote = {
          ...this.note,
          title: this.noteEditPut.title,
          content: this.noteEditPut.content,
        };

        await this.noteUpdate(editedNote);

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
    async del() {
      const result = window.confirm(
        "Are you sure you want to delete this note?",
      );
      if (!result) {
        return;
      }

      try {
        await this.noteDel(this.note);
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        //
      }
    },
  },
  mixins: [validationMixin],
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true,
    },
  },
  validations: {
    noteEditPut: {
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
