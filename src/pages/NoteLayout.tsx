import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
  notes: Note[];
};

export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const TargetNote = notes.find((note) => note.id === id);
  if (TargetNote == null) return <Navigate to={"/"} replace />; //If note doesn't exist, navigate to the home page, and couldn't back to this page
  return <Outlet context={TargetNote} />;
}

//A nifty function which is similar to useContext that help us to pass data through its children without props drilling
export function useNote() {
  return useOutletContext<Note>();
}
