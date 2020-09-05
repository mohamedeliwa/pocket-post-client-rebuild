import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";

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
  const { isAuthenticated, login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "random@random.com",
    password: "Random12345",
  });

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.type) {
      case "email":
        setCredentials({
          ...credentials,
          email: e.target.value,
        });
        break;
      case "password":
        setCredentials({
          ...credentials,
          password: e.target.value,
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <Login>
      <StyledForm className="bg-light" onSubmit={handleSubmit}>
        <FormHeader>Pocket-Post</FormHeader>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={credentials.email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={credentials.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Log In
        </Button>
      </StyledForm>
      
      <Form.Group
        className="bg-light text-dark p-2"
        style={{ border: "1px solid #eee" }}
        controlId="formBasicCheckbox"
      >
        <Form.Check type="checkbox" label="remember me" />
      </Form.Group>
      <Link href="/accounts/resetPassword">
        <a>Reset Password</a>
      </Link>
    </Login>
  );
};

export default login;
