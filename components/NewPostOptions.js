import { useState } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";

const NewPostOptions = (props) => {
  const [state, setState] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    series: "",
    tags: [],
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
      case "post-excerpt":
        setState({
          ...state,
          excerpt: e.target.value,
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

  const addTag = (e) => {
    e.preventDefault();
    const tags = state.tags;
    const tagInput = document.querySelector("#post-tag");
    tags.push(tagInput.value);
    setState({
      ...state,
      tags,
    });
    tagInput.value = "";
    console.log(state);
  };

  const postTags = state.tags.map((tag, index) => {
    const tagVariant  = index % 2 == 0 ? "warning" : "info"; 
    return (
      <>
        <Badge variant={tagVariant} key={index}>{tag}</Badge>{" "}
      </>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setPost({
      ...props.post,
      ...state,
    });
    props.showEditor("editor");
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
          <label htmlFor="post-excerpt">Post Excerpt*</label>
          <textarea
            className="form-control"
            id="post-excerpt"
            onChange={handleChange}
          ></textarea>
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
            <option value="">None</option>
            <option>Collection1</option>
            <option>Collection2</option>
            <option>Collection3</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="post-tag">
          <Form.Label>Post Tags*</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button variant="outline-secondary" onClick={addTag}>
                Add
              </Button>
            </InputGroup.Prepend>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="post-tags">{postTags}</Form.Group>

        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostOptions;
