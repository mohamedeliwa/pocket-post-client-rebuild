import { useState } from "react";
import fetch from "isomorphic-unfetch";
import { Container, Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';

const NewCollectionOptions = () => {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    coverImage: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "collection-name":
        setState({
          ...state,
          name: e.target.value,
        });
        break;

      case "collection-cover-image":
        // console.log(e.target.files[0]);
        setState({
          ...state,
          coverImage: e.target.files[0],
        });
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/series";
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("coverImage", state.coverImage);
      formData.append("description", "hello description");
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.status === 201) {
        console.log("collection created successfully!");
        const collection = await response.json();
        alert("Collection created successfully")
        router.reload();
        console.log(collection);
      } else {
        throw new Error("collection creation failed!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <hr />
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="collection-name">Collection Name*</label>
          <input
            type="text"
            className="form-control"
            id="collection-name"
            placeholder="Enter collection name..."
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="collection-cover-image">
            Collection Cover Image*
          </label>
          <input
            type="file"
            className="form-control-file"
            id="collection-cover-image"
            onChange={handleChange}
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
