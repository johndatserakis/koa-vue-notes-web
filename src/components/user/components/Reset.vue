<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <reset-form />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";
import ResetForm from "@/components/user/forms/ResetForm.vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    ResetForm,
  },
});
</script>

<style lang="scss"></style>
