<template>
  <transition name="back-to-top-fade">
    <div
      class="vue-back-to-top"
      :style="`bottom:${this.bottom}px;right:${this.right}px;`"
      v-show="visible"
      @click="backToTop"
    >
      <slot>
        <div class="default">
          <span>&#x2191;</span>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "back-to-top",
  props: {
    text: {
      type: String,
      default: "Back To Top",
    },
    visibleOffset: {
      type: [String, Number],
      default: 600,
    },
    right: {
      type: Number,
      default: 30,
    },
    bottom: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  /**
   * Catch window scroll event
   * @return {void}
   */
  created() {
    const catchScroll = () => {
      this.visible = window.pageYOffset > parseInt(this.visibleOffset);
    };

    window.smoothscroll = () => {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll);
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
      }
    };

    window.onscroll = catchScroll;
  },
  methods: {
    /**
     * The function who make the magics
     * @return {void}
     */
    backToTop() {
      window.smoothscroll();
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "~@/assets/css/components/_variables.scss";

// .back-to-top-fade-enter-active,
// .back-to-top-fade-leave-active {
//   transition: opacity 0.7s;
// }
// .back-to-top-fade-enter,
// .back-to-top-fade-leave-to {
//   opacity: 0;
// }

// .vue-back-to-top {
//   position: fixed;
//   z-index: 1000;
//   cursor: pointer;
// }

// .vue-back-to-top .default {
//   width: 50px;
//   color: #ffffff;
//   text-align: center;
//   line-height: 40px;
//   background-color: $green;
//   border-radius: 6px;
//   opacity: 0.7;
//   font-size: 1.4rem;
//   transition: $transition;

//   &:hover {
//     background-color: darken($green, 5%);
//   }
// }
</style>
