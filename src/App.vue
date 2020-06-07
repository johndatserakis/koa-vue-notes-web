<template>
  <div>Wow {{ msg }}</div>
  <!-- <router-view></router-view> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const msg = ref(0);

    return {
      msg
    };
  }
});
</script>

<style lang="scss">
body {
  background: red;
}
</style>
