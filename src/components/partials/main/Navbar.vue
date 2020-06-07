<template>
  <div>
    <!-- <headroom :upTolerance="10" :downTolerance="10"> -->
    <div class="navbar-section">
      <vue-navigation-bar
        :options="navbarOptions"
        class="container navbar-main"
      />
    </div>
    <!-- </headroom> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueNavigationBar from "vue-navigation-bar";

/* eslint-disable-next-line no-unused-vars  */
// import { headroom } from "vue-headroom";
// headroom.computed.style = () => ''

export default {
  name: "navbar",
  data() {
    return {
      // Decide to show based on the window's initial width
      showUndernav: window.innerWidth > 992,
    };
  },
  methods: {
    async logout() {
      // As you can see, with Vuex we we need to fire logout methods
      // for each of our modules.
      await this.$store.dispatch("user/userLogout");
      this.$router.push({ name: "home" });

      // After logging the user out we need to refresh the page
      // this is because some of our components initialize on their
      // created methods - and when a user logs out they need to be
      // fully cleared.
      // location.reload()
      document.location.href = "/";
    },
  },
  computed: {
    ...mapGetters({
      user: "user/user",
    }),
    routePartialType() {
      return this.$route.meta.partialType;
    },

    navbarOptions() {
      const navbarOptions = {
        elementId: "navbar-main",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "/",
        // brandImage: require("@/assets/images/main/lockup-color.png"),
        brandImageAltText: "RSVP Keeper",
        collapseButtonImageOpen: null,
        collapseButtonImageClose: null,
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Why RSVP Keeper?",
            path: "/about",
          },
          {
            type: "link",
            text: "Pricing",
            path: "/pricing",
          },
          {
            type: "link",
            text: "Features",
            path: "/features",
          },
          {
            type: "link",
            text: "Help",
            path: "/help",
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

      if (this.user) {
        navbarOptions.menuOptionsRight = [
          {
            type: "link",
            text: "Dashboard",
            path: "/dashboard",
            iconRight:
              '<svg class="i-arrow-right" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M22 6 L30 16 22 26 M30 16 L2 16"></path></svg>',
          },
        ];
      }

      return navbarOptions;
    },
  },
  components: {
    headroom,
    VueNavigationBar,
  },
};
</script>

<style lang="scss" scoped>
// @import "~@/assets/css/components/_variables.scss";

// .navbar-section {
//   background: $white;
// }

// .vnb {
//   background: $white;
// }
</style>

<style lang="scss">
// @import "~@/assets/css/components/_variables.scss";

// .navbar-main {
//   .vnb {
//     background: transparent;
//     box-shadow: none;

//     &__brand-image-wrapper {
//       padding-left: 0;
//       &__link {
//         &__image {
//           margin-top: -4px;
//           max-height: 22px;
//         }
//       }
//     }

//     &__collapse-button {
//       margin-right: 0;
//       box-shadow: none;

//       &:hover {
//         box-shadow: none;
//       }
//     }

//     &__popup {
//       &__top {
//         &__close-button {
//           box-shadow: none;

//           &:hover {
//             box-shadow: none;
//           }
//         }
//       }
//     }

//     &__menu-options {
//       &__option {
//         &__button {
//           padding-top: 8px;
//           padding-bottom: 11px;
//           text-transform: none;
//           font-weight: 500;
//           box-shadow: $box-shadow;
//           border-radius: $border-radius;

//           &:hover {
//             cursor: pointer;
//             box-shadow: $heavy-box-shadow;
//           }

//           &:active,
//           &:focus {
//             box-shadow: $heavy-box-shadow;
//           }
//         }

//         &__link {
//           color: $muted;

//           &__icon {
//             svg {
//               max-height: 15px;
//               margin-top: -4px;
//             }
//           }
//         }
//       }
//     }
//   }
// }

// // Have to do the button color separate
// .vnb {
//   .button-blue {
//     background: $blue;

//     &:hover {
//       background: $dark-blue;
//     }
//   }
// }

// // If headroom is active, show the border, if we're
// // at the top, turn off the border.
// .headroom--pinned {
//   box-shadow: none;
//   border-bottom: $border;
// }
// .headroom--top {
//   box-shadow: none;
//   border-bottom: 0;
// }
</style>
