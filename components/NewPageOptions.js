import { useState } from "react";
import { Container, Form } from "react-bootstrap";

const NewPostOptions = () => {
  const [view, setView] = useState("");
  const handleCheck = (e) => {
    console.log(e.target.value);
    if (e.target.value === "post") setView("post");
    if (e.target.value === "collection") setView("collection");
  };
  return (
    <Container>
      <h1>New Post Options</h1>
      <Form>
        <Form.Group controlId="formBasicRadios">
          <Form.Check
            inline
            label="New Post"
            type="radio"
            id="inline-radio-1"
            name="formHorizontalRadios"
            value="post"
            onChange={handleCheck}
          />
          <Form.Check
            inline
            label="New Collection"
            type="radio"
            id="inline-radio-2"
            name="formHorizontalRadios"
            value="collection"
            onChange={handleCheck}
          />
        </Form.Group>
      </Form>
      {!view ? null : view === "post" ? <h1>Post</h1> : <h1>Collection</h1>}
    </Container>
  );
};

export default NewPostOptions;
