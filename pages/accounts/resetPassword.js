import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const Login = styled(Container)`
  //background-color: #eee;
  min-height: 70vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  // background-color: white;
  // background-color: #eee;
  width: 350px;
  padding: 1rem;
  padding-bottom: 2rem;
  margin-bottom: 10px;
  border-radius: 5px;
  // border: 1px solid lightgrey;
  border: 1px solid #cfcfcf;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    width: 250px;
  }
  button {
    width: 250px;
  }
`;

const FormHeader = styled.h1`
  margin: 22px auto 50px;
`;

const login = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "random@random.com",
  });

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(state));

    const response = await fetch("http://localhost:5000/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
  };

  return (
    <Login>
      <StyledForm className="bg-light" onSubmit={handleSubmit}>
        <FormHeader>Pocket-Post</FormHeader>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Reset Password</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            value={state.email}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Send Request
        </Button>
      </StyledForm>
    </Login>
  );
};

export default login;
