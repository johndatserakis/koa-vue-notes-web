<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <signup-form />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";
import SignupForm from "@/components/user/forms/SignupForm.vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    SignupForm,
  },
});
</script>

<style lang="scss"></style>
