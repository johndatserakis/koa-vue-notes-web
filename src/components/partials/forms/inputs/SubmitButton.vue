<template>
  <b-button
    :disabled="isLoading"
    :id="`${name}-${id}`"
    block
    class="btn"
    type="submit"
    variant="green"
    @click.prevent="$emit('submit-clicked')"
  >
    <span>
      <b-spinner v-if="isLoading" small></b-spinner>
      {{ isLoading ? loadingText : text }}
    </span>
  </b-button>
</template>

<script lang="ts">
import Vue from "vue";
import { BButton, BSpinner } from "bootstrap-vue";
import { v4 as uuidv4 } from "uuid";

type BaseData = {
  id: string;
};

export default Vue.extend({
  components: {
    BButton,
    BSpinner,
  },
  data(): BaseData {
    return {
      id: uuidv4(),
    };
  },
  methods: {
    update(event: Event) {
      const target = event.target as HTMLTextAreaElement;
      this.$emit("input", target.value);
    },
  },
  props: {
    isLoading: {
      required: true,
      type: Boolean,
    },
    loadingText: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
  },
});
</script>

<style lang="scss"></style>
