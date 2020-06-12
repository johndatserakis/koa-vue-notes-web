// https://www.reddit.com/r/vuejs/comments/ese6cv/release_v300alpha3_vuejsvuenext_github/ffg0dwz

declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
