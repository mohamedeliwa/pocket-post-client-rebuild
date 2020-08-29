import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";

const EditButton = styled(Button)`
  display: ${(props) => (props.editting ? "none" : "inline-block")};
`;

const CancelButton = styled(Button)`
  display: ${(props) => (props.editting ? "inline-block" : "none")} !important;
`;

const ConfirmButton = styled(Button)`
  display: ${(props) => (props.editting ? "inline-block" : "none")} !important;
`;

const SettingForm = (props) => {
  const [state, setState] = useState({
    editting: false,
    defaultValue: props.value,
    value: props.value,
  });

  const activate = (e) => {
    e.preventDefault();
    setState({
      ...state,
      editting: true,
      value: state.defaultValue,
    });
  };

  const deactivate = (e) => {
    e.preventDefault();
    setState({
      ...state,
      editting: false,
      value: state.defaultValue,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/users/profile";
    try {
      let user;
      switch (props.label) {
        case "First Name":
          user = await props.updater(url, "firstName", state.value);
          break;
        case "Caption":
          user = await props.updater(url, "caption", state.value);

          break;
        case "Email Address":
          user = await props.updater(url, "email", state.value);

          break;
        case "Password":
          user = await props.updater(url, "password", state.value);
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container style={{ padding: "1rem" }}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
            type={props.inputType}
            value={state.value}
            disabled={!state.editting}
            onChange={handleChange}
          />
        </Form.Group>

        <EditButton
          editting={state.editting ? 1 : 0}
          variant="primary"
          onClick={activate}
        >
          Edit
        </EditButton>
        <CancelButton
          editting={state.editting ? 1 : 0}
          variant="danger"
          onClick={deactivate}
          style={{ display: "none" }}
        >
          Cancel
        </CancelButton>
        <ConfirmButton
          editting={state.editting ? 1 : 0}
          variant="success"
          onClick={handleSubmit}
          style={{ display: "none" }}
        >
          Confirm
        </ConfirmButton>
      </Form>
    </Container>
  );
};

export default SettingForm;
