import { Note, NotesQuery } from "@/store/note/types";
import axios, { setAuthorizationHeader } from "@/common/axios";
import { AxiosResponse } from "axios";
import { NoteCreatePost, NotePutRequest } from "./api-types";

const routeMain = "notes";

export const all = async (data: NotesQuery): Promise<Note[]> => {
  setAuthorizationHeader(axios);
  const result: AxiosResponse<{
    data: { notes: Note[] };
  }> = await axios.get(routeMain, { params: data });

  return result.data.data.notes;
};

export const find = async (data: number): Promise<Note> => {
  setAuthorizationHeader(axios);
  const result: AxiosResponse<{
    data: { note: Note };
  }> = await axios.get(`${routeMain}/${data}`);

  return result.data.data.note;
};

export const create = async (data: NoteCreatePost): Promise<Note> => {
  setAuthorizationHeader(axios);
  const result: AxiosResponse<{
    data: { note: Note };
  }> = await axios.post(routeMain, data);

  return result.data.data.note;
};

export const update = async (data: Note): Promise<Note> => {
  const putRequest: NotePutRequest = {
    title: data.title,
    content: data.content,
  };

  setAuthorizationHeader(axios);
  const result: AxiosResponse<{
    data: { note: Note };
  }> = await axios.put(`${routeMain}/${data.id}`, putRequest);

  return result.data.data.note;
};

export const del = async (data: Note): Promise<Note> => {
  setAuthorizationHeader(axios);
  await axios.delete(`${routeMain}/${data.id}`);
  return data;
};
