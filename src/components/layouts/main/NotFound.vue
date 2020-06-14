<template>
  <section>
    <b-container class="py-4">
      <b-row>
        <b-col>
          <img
            src="@/assets/images/utilities/404.png"
            alt="404 - Page Not Found"
            class="img-fluid d-block mx-auto image-callout"
          />
          <h2>Not Found</h2>
          <p>Hmm, we couldn't quite find what you were looking for.</p>
          <b-button variant="blue" :to="{ name: 'home' }">Go Home</b-button>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { BContainer, BRow, BCol, BButton } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BContainer,
    BRow,
    BCol,
    BButton,
  },
});
</script>

<style lang="scss">
section {
  padding: 1rem 0;
  text-align: left;

  @media (min-width: 992px) {
    text-align: center;
  }
}

.image-callout {
  max-height: 350px;
}
</style>
