<template>
  <section>
    <b-container class="py-4">
      <b-row>
        <b-col>
          <img
            src="@/assets/images/utilities/maintenance.png"
            alt="Maintenance Mode"
            class="img-fluid d-block mx-auto image-callout"
          />
          <h2>Maintenance</h2>
          <p>We're currently doing some house-cleaning.</p>
          <p>Please check back later. Thank you!</p>
        </b-col>
      </b-row>
    </b-container>
  </section>
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
