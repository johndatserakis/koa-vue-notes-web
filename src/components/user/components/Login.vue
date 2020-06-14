<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <login-form />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";
import LoginForm from "@/components/user/forms/LoginForm.vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    LoginForm,
  },
});
</script>

<style lang="scss"></style>
