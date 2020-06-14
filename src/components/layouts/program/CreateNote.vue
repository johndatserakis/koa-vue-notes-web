<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <create-note-form />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";
import CreateNoteForm from "@/components/partials/forms/components/CreateNoteForm.vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    CreateNoteForm,
  },
});
</script>

<style lang="scss"></style>
