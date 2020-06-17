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
} from "bootstrap-vue";
import { mapGetters } from "vuex";
import { truncate } from "@/common/truncate";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    BListGroup,
    BListGroupItem,
    BButton,
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
    truncate,
    async loadProgramData() {
      try {
        const result = await this.$store.dispatch("note/all", this.query);

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
      this.loadProgramData();
    },
  },
  created() {
    if (this.notes.length === 0) {
      this.loadProgramData();
    }
  },
});
</script>

<style lang="scss"></style>
