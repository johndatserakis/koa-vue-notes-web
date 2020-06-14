<template>
  <b-container class="py-4">
    <b-row class="justify-content-center">
      <b-col cols="6">
        <h1>
          <strong>Login</strong>
        </h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
  },
});
</script>

<style lang="scss"></style>
