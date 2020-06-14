/* eslint-disable @typescript-eslint/no-unused-vars */

import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import {
  SET_NOTES,
  ADD_NOTES,
  ADD_NOTE_TO_STACK,
  DELETE_NOTE_FROM_STACK,
  EDIT_NOTE_IN_STACK,
  CLEAR_NOTES,
  SET_OK_TO_LOAD_MORE,
  SET_QUERY,
} from "@/store/note/mutations";
import { RootState } from "@/store/state";
import { Note, NotesQuery, NoteState } from "@/store/note/types";
import { NoteCreatePost, NoteEditPut } from "./api-types";
import {
  all as noteAll,
  find as noteFind,
  create as noteCreate,
  update as noteUpdate,
  del as noteDel,
} from "@/store/note/api-requests";
import { parseAxiosError } from "@/common/api";

type NoteContext = ActionContext<NoteState, RootState>;

const initialState: NoteState = {
  notes: [],
  okToLoadMore: false,
  query: {
    sort: "",
    order: "desc" as const,
    page: 0,
    limit: 20,
  },
};

const getters: GetterTree<NoteState, RootState> = {
  notes(state: NoteState): Note[] {
    return state.notes;
  },
  okToLoadMore(state: NoteState): boolean {
    return state.okToLoadMore;
  },
  query(state: NoteState): NotesQuery {
    return state.query;
  },
};

const mutations: MutationTree<NoteState> = {
  [SET_NOTES](state: NoteState, notes: Note[]) {
    state.notes = notes;
  },
  [ADD_NOTES](state: NoteState, notes: Note[]) {
    state.notes = [...state.notes, ...notes];
  },
  [ADD_NOTE_TO_STACK](state: NoteState, note: Note) {
    state.notes = [note, ...state.notes];
  },
  [DELETE_NOTE_FROM_STACK](state: NoteState, note: Note) {
    const index = state.notes.map(note => note.id).indexOf(note.id);
    state.notes = [
      ...state.notes.slice(0, index),
      ...state.notes.slice(index + 1),
    ];
  },
  [EDIT_NOTE_IN_STACK](state: NoteState, note: Note) {
    const index = state.notes.map(note => note.id).indexOf(note.id);
    if (index === -1) return;
    state.notes = [
      ...state.notes.slice(0, index),
      note,
      ...state.notes.slice(index + 1),
    ];
  },
  [CLEAR_NOTES](state: NoteState) {
    state.notes = [];
  },
  [SET_OK_TO_LOAD_MORE](state: NoteState, okToLoadMore: boolean) {
    state.okToLoadMore = okToLoadMore;
  },
  [SET_QUERY](state: NoteState, query: NotesQuery) {
    state.query = query;
  },
};

const actions: ActionTree<NoteState, RootState> = {
  async all(
    { commit, dispatch, state }: NoteContext,
    data: NotesQuery,
  ): Promise<Note[]> {
    try {
      const result = await noteAll(data);
      commit(ADD_NOTES, result);
      return result;
    } catch (error) {
      return Promise.reject(parseAxiosError(error));
    }
  },
  async create(
    { commit, dispatch, state }: NoteContext,
    data: NoteCreatePost,
  ): Promise<Note> {
    try {
      const result = await noteCreate(data);
      commit(ADD_NOTE_TO_STACK, result);
      return result;
    } catch (error) {
      return Promise.reject(parseAxiosError(error));
    }
  },
  async find(
    { commit, dispatch, state }: NoteContext,
    data: number,
  ): Promise<Note> {
    try {
      const result = await noteFind(data);
      return result;
    } catch (error) {
      return Promise.reject(parseAxiosError(error));
    }
  },
  async update(
    { commit, dispatch, state }: NoteContext,
    data: Note,
  ): Promise<Note> {
    try {
      const result = await noteUpdate(data);
      commit(EDIT_NOTE_IN_STACK, result);
      return result;
    } catch (error) {
      return Promise.reject(parseAxiosError(error));
    }
  },
  async del(
    { commit, dispatch, state }: NoteContext,
    data: Note,
  ): Promise<Note> {
    try {
      const result = await noteDel(data);
      commit(DELETE_NOTE_FROM_STACK, result);
      return result;
    } catch (error) {
      return Promise.reject(parseAxiosError(error));
    }
  },
};

export const note = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
