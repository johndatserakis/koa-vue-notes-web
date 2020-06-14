<template>
  <div>
    <div class="navbar-section">
      <vue-navigation-bar
        :options="navbarOptions"
        class="container navbar-main"
        @vnb-item-clicked="vnbItemClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import VueNavigationBar from "vue-navigation-bar";

export default Vue.extend({
  name: "navbar",
  data() {
    return {};
  },
  methods: {
    vnbItemClicked(text: string) {
      if (text === "View on GitHub") {
        window.open(
          "https://github.com/johndatserakis/koa-vue-notes-web",
          "_self",
        );
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "user/user",
    }),
    routePartialType(): string {
      return this.$route.meta.partialType;
    },
    navbarOptions() {
      const navbarOptions = {
        elementId: "navbar-main",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "/",
        brandImage: require("@/assets/images/main/lockup.png"),
        brandImageAltText: "Koa-Vue-Notes",
        collapseButtonImageOpen: null,
        collapseButtonImageClose: null,
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        menuOptionsLeft: [
          {
            isLinkAction: true,
            type: "link",
            text: "View on GitHub",
            path: "",
          },
        ],
        menuOptionsRight: [
          {
            type: "link",
            text: "Login",
            path: "/user/login",
          },
          {
            type: "button",
            text: "Signup",
            path: "/user/signup",
            class: "button-blue",
          },
        ],
      };

      if (this.user.id) {
        navbarOptions.menuOptionsRight = [
          {
            type: "link",
            text: "Dashboard",
            path: "/dashboard",
          },
        ];
      }

      return navbarOptions;
    },
  },
  components: {
    VueNavigationBar,
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

.navbar-section {
  background: $white;
}

.vnb {
  background: $white;
}
</style>

<style lang="scss">
@import "~@/assets/css/components/_variables.scss";

.navbar-main {
  .vnb {
    background: transparent;
    box-shadow: none;

    &__brand-image-wrapper {
      padding-left: 0;
      &__link {
        &__image {
          margin-top: -4px;
          max-height: 22px;
        }
      }
    }

    &__collapse-button {
      margin-right: 0;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    &__popup {
      &__top {
        &__close-button {
          box-shadow: none;

          &:hover {
            box-shadow: none;
          }
        }
      }
    }

    &__menu-options {
      &__option {
        &__button {
          padding-top: 8px;
          padding-bottom: 11px;
          text-transform: none;
          font-weight: 500;
          box-shadow: var(--box-shadow-300);
          border-radius: var(--border-radius);

          &:hover {
            cursor: pointer;
            box-shadow: var(--box-shadow-500);
          }

          &:active,
          &:focus {
            box-shadow: var(--box-shadow-500);
          }
        }

        &__link {
          color: $muted;

          &__icon {
            svg {
              max-height: 15px;
              margin-top: -4px;
            }
          }
        }
      }
    }
  }
}

// Have to do the button color separate
.vnb {
  .button-blue {
    background: var(--blue);

    &:hover {
      background: var(--blue-700);
    }
  }
}
</style>
