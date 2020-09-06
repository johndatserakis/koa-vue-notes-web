<template>
  <b-container class="py-4">
    <b-row class="justify-content-center mb-3">
      <b-col lg="6">
        <b-button variant="blue" block to="/create-note" class="mb-4"
          >Create Note</b-button
        >
        <b-list-group v-if="notes.length > 0">
          <b-list-group-item
            v-for="note in notes"
            :key="note.id"
            :to="{ name: 'edit-note', params: { id: note.id } }"
            action
          >
            <h6>{{ note.title }}</h6>
            <small>{{ truncate(note.content, 20) }}</small>
          </b-list-group-item>
        </b-list-group>
        <div v-else class="mt-2 text-center">
          <b-spinner label="Spinning" />
        </div>
      </b-col>
    </b-row>
    <b-row v-if="okToLoadMore" class="justify-content-center">
      <b-col lg="6">
        <b-button class="mb-4" variant="orange" block @click="loadMore">
          Load more...
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  BContainer,
  BRow,
  BCol,
  BListGroup,
  BListGroupItem,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";
import { truncate } from "@/common/truncate";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    BListGroup,
    BListGroupItem,
    BButton,
    BSpinner,
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      notes: "note/notes",
      okToLoadMore: "note/okToLoadMore",
      query: "note/query",
    }),
  },
  methods: {
    ...mapActions("note", { noteAll: "all" }),
    truncate,
    async loadProgramData(incrementPage: boolean) {
      try {
        if (!incrementPage) {
          this.$store.commit("note/CLEAR_NOTES");
          this.$store.commit("note/SET_QUERY", {
            ...this.query,
            page: 0,
          });
        }

        const result = await this.noteAll(this.query);

        // Sort out the new query data now...
        if (result.length === this.query.limit) {
          this.$store.commit("note/SET_OK_TO_LOAD_MORE", true);
          this.$store.commit("note/SET_QUERY", {
            ...this.query,
            page: this.query.page + 1,
          });
        } else {
          this.$store.commit("note/SET_OK_TO_LOAD_MORE", false);
        }
      } catch (error) {
        this.$bvToast.toast(
          "Hmm, there was an error creating your account. Please try again.",
          { title: "Server Error", variant: "danger" },
        );
      }
    },
    loadMore() {
      // Increment request paging only if load more button was clicked
      this.loadProgramData(true);
    },
  },
  mounted() {
    this.loadProgramData(false);
  },
});
</script>

<style lang="scss"></style>
