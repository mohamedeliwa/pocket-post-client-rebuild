import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewPostOptions = (props) => {
  const [state, setState] = useState({
    title: "",
    coverImage: "",
    series: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "title-post":
        setState({
          ...state,
          title: e.target.value,
        });
        break;
      case "post-cover-image":
        setState({
          ...state,
          coverImage: e.target.value,
        });
        break;
      case "post-series":
        setState({
          ...state,
          series: e.target.value,
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.showEditor("editor");
    props.setPost({
      ...props.post,
      ...state
    });
  };

  return (
    <Container>
      <hr />
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Post Title*</label>
          <input
            type="text"
            className="form-control"
            id="title-post"
            placeholder="Enter post title..."
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-cover-image">Post Cover Image*</label>
          <input
            type="file"
            className="form-control-file"
            id="post-cover-image"
            onChange={handleChange}
          />
        </div>
        <Form.Group controlId="post-series">
          <Form.Label>Select Collection</Form.Label>
          <Form.Control as="select" defaultValue="None" onChange={handleChange}>
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
