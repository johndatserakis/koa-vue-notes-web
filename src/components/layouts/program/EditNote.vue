<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <edit-note-form v-if="note.id" :note="note" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";
import EditNoteForm from "@/components/partials/forms/components/EditNoteForm.vue";
import { Note } from "@/store/note/types";
import { mapActions } from "vuex";

type BaseData = {
  note: Note;
};

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    EditNoteForm,
  },
  data(): BaseData {
    return {
      note: {
        id: 0,
        userId: 0,
        title: "",
        content: "",
        createdAt: "",
      },
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions("note", { noteFind: "find" }),
    async getNoteForEdit(noteId: number) {
      const n: Note = await this.noteFind(noteId);

      if (!n.id) {
        this.$bvToast.toast("Hmm, that note wasn't found.", {
          title: "Server Error",
          variant: "danger",
        });

        this.$router.push({ name: "create-note" });

        return;
      }

      this.note = n;
    },
  },
  async mounted() {
    if (!this.id) {
      this.$router.push({ name: "dashboard" });
    }

    await this.getNoteForEdit(Number(this.id));
  },
});
</script>

<style lang="scss"></style>
