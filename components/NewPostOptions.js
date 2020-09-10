import { useState, useContext } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";

const NewPostOptions = (props) => {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    series: "",
    tags: [],
  });

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: allCollections, error } = useSWR(
    `http://localhost:5000/series?user_id=${user._id}`,
    fetcher
  );

  const collectionOptions = error ? (
    <option value="">Error Loading collections!</option>
  ) : !allCollections ? (
    <option value="">Loading...</option>
  ) : (
    allCollections.map((collection, index) => {
      if (index === 0) {
        return (
          <>
            <option value="">None</option>
            <option key={collection._id} value={collection._id}>{collection.name}</option>
          </>
        );
      }
      return <option key={collection._id} value={collection._id}>{collection.name}</option>;
    })
  );

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
          // coverImage: e.target.value,
          coverImage:  e.target.files[0],
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
    if (!tagInput.value.match(/^\s*$/g)) tags.push(tagInput.value.trim());
    setState({
      ...state,
      tags,
    });
    tagInput.value = "";
  };

  const removeTag = (e) => {
    e.preventDefault();
    const tags = state.tags.filter((tag) => tag + " x" !== e.target.innerText);
    setState({
      ...state,
      tags,
    });
  };

  const postTags = state.tags.map((tag, index) => {
    const tagVariant = index % 2 == 0 ? "warning" : "info";
    return (
      <>
        <Badge
          variant={tagVariant}
          key={index}
          onClick={removeTag}
          style={{ cursor: "pointer" }}
        >
          {tag} x
        </Badge>{" "}
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
      <Form onSubmit={(e) => e.preventDefault()}>
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
            {collectionOptions}
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

        <Button variant="primary" onClick={handleSubmit}>
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostOptions;
