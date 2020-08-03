import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewCollectionOptions = () => {
  return (
    <Container>
      <Form>
        <div className="form-group">
          <label htmlFor="collection-name">Collection Name*</label>
          <input
            type="text"
            className="form-control"
            id="collection-name"
            placeholder="Enter collection name..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="collection-cover-image">Collection Cover Image*</label>
          <input
            type="file"
            className="form-control-file"
            id="collection-cover-image"
          />
        </div>
        <Button variant="primary" type="submit">
          Create Collection
        </Button>
      </Form>
    </Container>
  );
};

export default NewCollectionOptions;
