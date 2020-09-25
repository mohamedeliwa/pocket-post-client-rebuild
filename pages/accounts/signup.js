import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import Head from "next/head";

const SignUp = styled(Container)`
  //background-color: #eee;
  min-height: 70vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
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
    width: 300px;
  }
  button {
    width: 300px;
  }
`;

const FormHeader = styled.h1`
  margin: 22px auto 50px;
`;

const signup = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    firstName: "test",
    lastName: "test",
    password: "Test@0123456789",
    email: "test@test.com",
  });
  const { isAuthenticated, signup } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "firstName":
        setUserInfo({
          ...userInfo,
          firstName: e.target.value,
        });
        break;
      case "lastName":
        setUserInfo({
          ...userInfo,
          lastName: e.target.value,
        });
        break;
      case "email":
        setUserInfo({
          ...userInfo,
          email: e.target.value,
        });
        break;
      case "password":
        setUserInfo({
          ...userInfo,
          password: e.target.value,
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userInfo);
  };

  return (
    <SignUp>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledForm className="bg-light" onSubmit={handleSubmit}>
        <FormHeader>Pocket-Post</FormHeader>

        {/* for first name */}
        <Form.Group controlId="firstName">
          <Form.Control
            type="text"
            placeholder="First name"
            onChange={handleChange}
            value={userInfo.firstName}
          />
        </Form.Group>

        {/* for last name */}
        <Form.Group controlId="lastName">
          <Form.Control
            type="text"
            placeholder="Last name"
            onChange={handleChange}
            value={userInfo.lastName}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={userInfo.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={userInfo.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Sign up
        </Button>
      </StyledForm>
    </SignUp>
  );
};

export default signup;
