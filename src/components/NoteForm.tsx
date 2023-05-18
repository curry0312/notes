import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
};

function NoteForm({ onSubmit, onAddTag }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value, // "!" means that this can never be null
      markdown: markdownRef.current!.value, // "!" means that this can never be null
      tags: [],
    });
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label: label };
                    onAddTag(newTag);
                    setSelectedTags((prevSelectedTags) => [
                      ...prevSelectedTags,
                      newTag,
                    ]);
                  }}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) =>
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    )
                  }
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control ref={markdownRef} required as="textarea" rows={15} />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </div>
  );
}

export default NoteForm;