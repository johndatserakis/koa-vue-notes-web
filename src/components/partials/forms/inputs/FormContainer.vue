<template>
  <form @submit.prevent autocomplete="off">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "form-container",
});
</script>

<style lang="scss"></style>
