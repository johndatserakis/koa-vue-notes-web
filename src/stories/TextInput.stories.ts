import { action } from "@storybook/addon-actions";

import "@/assets/css/app.scss";
import TextInput from "@/components/partials/forms/inputs/TextInput.vue";

export default {
  component: TextInput,
  title: "TextInput",
  parameters: {
    notes: "Lorem...",
  },
};

export const TextInputDefault = () => ({
  components: { TextInput },
  data() {
    return {
      myValue: "my value",
    };
  },
  template: `
    <div class="py-2 px-5">
      <text-input
        :has-error="false"
        error-message="Please enter a username."
        label="Username"
        name="username"
        type="text"
        v-model="myValue"
      />
    </div>
  `,
  methods: {},
  watch: {
    myValue: {
      handler(v: string) {
        action("input")(v);
      },
    },
  },
});

export const TextInputWithError = () => ({
  components: { TextInput },
  data() {
    return {
      myValue: "",
    };
  },
  template: `
    <div class="py-2 px-5">
      <text-input
        :has-error="true"
        error-message="Please enter a username."
        label="Username"
        name="username"
        type="text"
        v-model="myValue"
      />
    </div>
  `,
  methods: {},
  watch: {
    myValue: {
      handler(v: string) {
        action("input")(v);
      },
    },
  },
});
