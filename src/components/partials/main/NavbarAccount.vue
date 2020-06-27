<template>
  <div class="navbar-account">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="imd-navbar">
            <div class="imd-navbar__brand">
              <router-link :to="{ name: 'dashboard' }">
                <img src="@/assets/images/main/lockup.png" alt="RSVP Keeper" />
              </router-link>
            </div>

            <div v-if="user.id" class="imd-navbar__user-account-button">
              <b-dropdown
                id="user-account-dropdown-button"
                right
                variant="custom-navbar-dropdown-black"
              >
                <template slot="button-content">
                  <img
                    src="@/assets/images/utilities/user-account-picture.png"
                    alt="Menu"
                  />
                </template>

                <b-dropdown-item disabled
                  >Signed in as <br />
                  {{ user.email }}</b-dropdown-item
                >

                <b-dropdown-divider></b-dropdown-divider>

                <b-dropdown-item href :to="{ name: 'dashboard' }">
                  Dashboard
                </b-dropdown-item>

                <b-dropdown-item href :to="{ name: 'create-note' }">
                  Create Note
                </b-dropdown-item>

                <b-dropdown-divider></b-dropdown-divider>

                <b-dropdown-item href :to="{ name: 'home' }" exact>
                  App Home Page
                </b-dropdown-item>

                <b-dropdown-item href @click.prevent="logout">
                  Logout
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BDropdown, BDropdownItem, BDropdownDivider } from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";
import VueScreenSize from "vue-screen-size";

export default Vue.extend({
  components: {
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
  },
  mixins: [VueScreenSize.VueScreenSizeMixin],
  data() {
    return {};
  },
  methods: {
    ...mapActions("user", { userLogout: "logout" }),
    async logout() {
      // As you can see, with Vuex we we need to fire logout methods
      // for each of our modules.
      await this.userLogout();
      this.$router.push({ name: "home" });

      // After logging the user out we can optionally reload the page, to make
      // sure everything is reset nicely.
      document.location.href = "/";
    },
  },
  computed: {
    ...mapGetters({
      user: "user/user",
    }),
  },
});
</script>

<style lang="scss">
@import "~@/assets/css/components/_variables.scss";

.imd-navbar {
  height: 56px;
  margin-left: auto;
  margin-right: auto;
  background: var(--white);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &__brand {
    color: var(--white);
    font-size: 1.8rem;
    display: block;
    margin: 0;
    margin-right: auto;

    @media (min-width: 992px) {
      margin-left: 7px;
    }

    img {
      margin-top: -8px;
      max-height: 22px;
    }
  }

  &__user-account-button {
    .dropdown {
      button {
        box-shadow: none;
      }
    }

    img {
      max-height: 35px;
    }
  }
}
</style>
