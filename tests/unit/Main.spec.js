import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Home from "@/components/layouts/pages/Home.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("Home.vue", () => {
  let actions;
  let state;
  let getters;
  let store;

  beforeEach(() => {
    state = {
      user: {}
    };

    actions = {};

    getters = {
      ["user/user"]: () => {
        return {};
      }
    };

    store = new Vuex.Store({
      modules: {
        user: {
          state,
          actions,
          getters
        }
      }
    });
  });

  it("Loads correctly", () => {
    const wrapper = shallowMount(Home, {
      store,
      localVue,
      propsData: {},
      stubs: []
    });

    expect(wrapper).toBeTruthy();
  });
});
