import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import SettingForm from "./SettingForm";
import { Container, Modal, Button, Form } from "react-bootstrap";

const AccountSettings = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [state, setState] = useState({
    url: "",
    key: "",
    value: "",
    email: user.email,
    password: "",
  });
  const [modalState, setModalState] = useState({
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setState({
      url: "",
      key: "",
      value: "",
      email: user.email,
      password: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      password: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendUpdateRequest(state.url, state.key, state.value);
    handleClose();
  };
  const updater = (url, key, value) => {
    setState({
      ...state,
      url,
      key,
      value,
    });
    handleShow();
  };
  const sendUpdateRequest = async (url, key, value) => {
    try {
      const body = {};
      body[key] = value;
      body.email = state.email;
      body.password = state.password;
      const res = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        console.log(res);
        alert("A confirmation Email sent to your email address");
        router.reload();

        // const user = await res.json();
        // return user;
      }else {
        throw new Error("Updating Email Failed!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      {/*Relogin Modal*/}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title>Enter your password, please!</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Enter your password, please!</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password..."
                onChange={handleChange}
                value={state.password}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <SettingForm
        label="Email Address"
        inputType="email"
        value={user.email}
        updater={updater}
      />
      <SettingForm
        label="Paybal Email"
        inputType="email"
        value={user.paybalEmail}
        updater={updater}
      />
      <SettingForm
        label="Password"
        inputType="password"
        placeholder="Enter your new Password!"
        updater={updater}
      />
    </Container>
  );
};

export default AccountSettings;
