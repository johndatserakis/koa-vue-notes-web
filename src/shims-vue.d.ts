// declare module "*.vue" {
//   import Vue from "vue";
//   export default Vue;
// }

// from here: https://github.com/tonytomk/vue3-typescript-sample/blob/master/src/shims-vue.d.ts
// https://www.reddit.com/r/vuejs/comments/ese6cv/release_v300alpha3_vuejsvuenext_github/ffg0dwz?utm_source=share&utm_medium=web2x

declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
