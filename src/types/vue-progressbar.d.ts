// https://github.com/hilongjw/vue-progressbar/issues/49#issuecomment-377385833

declare module "vue-progressbar" {
  import { PluginFunction } from "vue";

  export const install: PluginFunction<{}>;

  interface ProgressMethods {
    start(): void;
    finish(): void;
    fail(): void;
  }

  module "vue/types/vue" {
    interface Vue {
      $Progress: ProgressMethods;
    }
  }
}
