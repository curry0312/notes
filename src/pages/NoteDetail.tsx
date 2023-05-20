import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteDetailProps = {
  onDeleteNote: (id: string) => void;
};

export default function NoteDetail({ onDeleteNote }: NoteDetailProps) {
  const note = useNote();
  const navigate = useNavigate()
  return (
    <div>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {note.tags.map((tag) => {
                return (
                  <Badge key={tag.id} className="text-truncate">
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            {/*Edit Button*/}
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            {/*Delete current note Button*/}
            <Button
              variant="outline-danger"
              onClick={() => {
                onDeleteNote(note.id)
                navigate("/")
            }}
            >
              Delete
            </Button>
            {/*Back to previous page Button*/}
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
}
