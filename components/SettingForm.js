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
    defaultValue: props.value ? props.value : "",
    value: props.value ? props.value : "",
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
    const url = "https://pocket-post-server.glitch.me/users/profile";
    try {
      let user;
      switch (props.label) {
        case "First Name":
          user = await props.updater(url, "firstName", state.value);
          break;
        case "Last Name":
          user = await props.updater(url, "lastName", state.value);
          break;
        case "Caption":
          user = await props.updater(url, "caption", state.value);
          break;
        case "Public Email":
          user = await props.updater(url, "publicEmail", state.value);
          break;
        case "Twitter":
          user = await props.updater(url, "twitter", state.value);
          break;
        case "Facebook":
          user = await props.updater(url, "facebook", state.value);
          break;
        case "LinkedIn":
          user = await props.updater(url, "linkedin", state.value);
          break;
        case "GitHub":
          user = await props.updater(url, "github", state.value);
          break;
        case "Email Address":
          user = await props.updater(
            "https://pocket-post-server.glitch.me/email/update",
            "newEmail",
            state.value
          );
          break;
        case "Paybal Email":
          user = await props.updater(
            "https://pocket-post-server.glitch.me/paybal/update",
            "paybalEmail",
            state.value
          );
          break;
        case "Password":
          user = await props.updater(
            "https://pocket-post-server.glitch.me/password/update",
            "newPassword",
            state.value
          );
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
            placeholder={props.placeholder || `Enter your ${props.label}..`}
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
