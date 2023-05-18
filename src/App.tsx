import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorge";
import NewNote from "./pages/NewNote";
import { v4 as uuidV4 } from "uuid";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { id: uuidV4(), ...data, tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  function onAddTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }
  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<h1>Hi</h1>} />
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} />} />
          <Route path="/:id">
            <Route index element={<h1>Show</h1>} />
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
