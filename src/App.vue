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

        <footer-main></footer-main>
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
import Vue from "vue";
import Navbar from "@/components/partials/main/Navbar.vue";
import NavbarAccount from "@/components/partials/main/NavbarAccount.vue";
import FooterMain from "@/components/partials/main/FooterMain.vue";
import BackToTop from "@/components/partials/components/BackToTop.vue";

export default Vue.extend({
  name: "app",
  computed: {
    routePartialType(): string {
      console.log(this.$route);
      return this.$route.meta.partialType;
    },
  },
  methods: {},
  components: {
    Navbar,
    NavbarAccount,
    FooterMain,
    BackToTop,
  },
});
</script>

<style lang="scss">
@import "~@/assets/css/components/_variables.scss";

body {
  background: red;
}
</style>
