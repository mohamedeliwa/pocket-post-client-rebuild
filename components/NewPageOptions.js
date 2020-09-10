import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import NewPostOptions from "./NewPostOptions";
import NewCollectionOptions from "./NewCollectionOptions";

const NewPageOptions = (props) => {
  const [view, setView] = useState("");
  const handleChange = (e) => {
    if (e.target.value === "post") setView("post");
    if (e.target.value === "collection") setView("collection");
  };
  return (
    <Container>
      <h1>Create</h1>
      <Form>
        <Form.Group controlId="post-collection-radio-form">
          <Form.Check
            inline
            label="New Post"
            type="radio"
            id="post-radio"
            name="post-collection-radio"
            value="post"
            onChange={handleChange}
          />
          <Form.Check
            inline
            label="New Collection"
            type="radio"
            id="collection-radio"
            name="post-collection-radio"
            value="collection"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      {!view ? null : view === "post" ? (
        <NewPostOptions
          showEditor={props.showEditor}
          post={props.post}
          setPost={props.setPost}
        />
      ) : (
        <NewCollectionOptions />
      )}
    </Container>
  );
};

export default NewPageOptions;
