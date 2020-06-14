<template>
  <div class="input-wrapper">
    <label :for="`${name}-${id}`" class="input-wrapper__label">
      {{ label }}
    </label>
    <input
      :id="`${name}-${id}`"
      :name="`${name}-${id}`"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="update"
      class="form-control"
    />
    <div class="input-wrapper__error-message" v-if="hasError">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

type BaseData = {
  id: string;
};

export default Vue.extend({
  data(): BaseData {
    return {
      id: uuidv4(),
    };
  },
  props: {
    errorMessage: {
      required: false,
      type: String,
    },
    hasError: {
      required: true,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    value: {
      required: false,
      type: String,
    },
  },
  methods: {
    update(event: Event) {
      const target = event.target as HTMLTextAreaElement;
      this.$emit("input", target.value);
    },
  },
});
</script>

<style lang="scss"></style>
