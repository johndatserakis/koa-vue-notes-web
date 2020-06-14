export type Note = {
  id: number;
  userId: number;
  title: string;
  content: string;
  ipAddress?: string;
  updatedAt?: string;
  createdAt: string;
};

export type NotesQuery = {
  sort: string;
  order: "desc" | "asc";
  page: number;
  limit: number;
};

export type NoteState = {
  notes: Note[];
  okToLoadMore: boolean;
  query: NotesQuery;
};
