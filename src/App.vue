<template>
  <div>
    <div v-if="routePartialType === 'full'">
      <div class="page-wrapper">
        <navbar></navbar>

        <div class="main-content-wrapper" role="main" aria-label="Main">
          <router-view></router-view>
        </div>

        <footer-main></footer-main>
      </div>
    </div>

    <div v-if="routePartialType === 'account'">
      <div class="page-wrapper">
        <navbar-account></navbar-account>

        <div
          class="main-content-wrapper main-content-wrapper--with-padding main-content-wrapper--grey-background"
          role="main"
          aria-label="Main"
        >
          <router-view></router-view>
        </div>

        <footer-account></footer-account>
      </div>
    </div>

    <div v-if="routePartialType === 'meta'" role="main" aria-label="Main">
      <div class="main-content-wrapper">
        <router-view></router-view>
      </div>
    </div>

    <back-to-top></back-to-top>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import { useRouter } from "vue-router";
import Navbar from "@/components/partials/main/Navbar.vue";
import FooterMain from "@/components/partials/main/FooterMain.vue";
import BackToTop from "@/components/partials/components/BackToTop.vue";

export default defineComponent({
  setup() {
    // const msg = ref(0);
    // return {
    //   msg,
    // };

    // const router = useRouter();

    // const routePartialType = computed(() => route.meta.partialType);

    const routePartialType = ref("");

    return {
      routePartialType,
    };
  },
  components: {
    Navbar,
    FooterMain,
    BackToTop,
  },
});
</script>

<style lang="scss">
body {
  background: red;
}
</style>
