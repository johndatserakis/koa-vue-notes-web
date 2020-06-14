<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <forgot-form />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";
import ForgotForm from "@/components/user/forms/ForgotForm.vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    ForgotForm,
  },
});
</script>

<style lang="scss"></style>
