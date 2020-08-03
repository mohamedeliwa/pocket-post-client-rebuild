import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPostOptions = () => {
  return (
    <Container>
      <hr />
      <Form>
        <div className="form-group">
          <label htmlFor="post-title">Post Title*</label>
          <input
            type="text"
            className="form-control"
            id="title-post"
            placeholder="Enter post title..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-cover-image">Post Cover Image*</label>
          <input
            type="file"
            className="form-control-file"
            id="post-cover-image"
          />
        </div>
        <Form.Group  controlId="collection-select">
          <Form.Label>Select Collection</Form.Label>
          <Form.Control as="select" defaultValue="None">
            <option>None</option>
            <option>Collection1</option>
            <option>Collection2</option>
            <option>Collection3</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostOptions;
