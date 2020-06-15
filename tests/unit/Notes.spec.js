import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";

import CreateNoteForm from "@/components/partials/forms/components/CreateNoteForm.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe("Note Testing", () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    state = {
      note: {}
    };

    actions = {
      ["note/create"]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        note: {
          state,
          actions
        }
      }
    });
  });

  it("CreateNoteForm.vue test", () => {
    const wrapper = shallowMount(CreateNoteForm, {
      store,
      localVue,
      propsData: {},
      stubs: ["b-button"]
    });

    //Check that the proper object is preset
    expect(wrapper.vm.noteCreatePost.title).toBe("");
    expect(wrapper.vm.noteCreatePost.content).toBe("");

    //Make sure we can load some values into the credentials array
    wrapper.vm.noteCreatePost.title = "testTitle";
    wrapper.vm.noteCreatePost.content = "testContent";

    //Check em
    expect(wrapper).toBeTruthy();
    expect(wrapper.vm.noteCreatePost.title).toBe("testTitle");
    expect(wrapper.vm.noteCreatePost.content).toBe("testContent");
  });
});
