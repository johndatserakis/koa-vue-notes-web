import { UserState } from "@/store/user/types";
import { NoteState } from "@/store/note/types";

export interface RootState {
  user: UserState;
  note: NoteState;
}
