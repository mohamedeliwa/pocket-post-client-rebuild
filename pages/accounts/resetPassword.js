import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import Head from "next/head";

const ResetPassword = styled(Container)`
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

const resetPassword = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    newPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.type) {
      case "email":
        setState({
          ...state,
          email: e.target.value,
        });
        break;
      case "password":
        setState({
          ...state,
          newPassword: e.target.value,
        });
        break;
    }
  };

  const handleResetRquestSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
      }),
    });

    if (response.status === 200) {
      alert("Request Sent Successfully, Please check your email!");
      setState({
        ...state,
        email: "",
      });
    } else {
      alert("Something went wrong, Please try again later!");
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/password/reset/${router.query.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: state.newPassword,
        }),
      }
    );
    if (response.status === 200) {
      alert("Password Updated successfully!");
      router.push("/accounts/login");
    } else {
      alert("Something went wrong, Please try again!");
    }
  };

  const requestForm = (
    <StyledForm className="bg-light" onSubmit={handleResetRquestSubmit}>
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
  );

  const newPasswordForm = (
    <StyledForm className="bg-light" onSubmit={handleNewPasswordSubmit}>
      <FormHeader>Pocket-Post</FormHeader>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter Your New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your new passwprd..."
          onChange={handleChange}
          value={state.newPassword}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" block>
        Send Request
      </Button>
    </StyledForm>
  );

  return (
    <ResetPassword>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.query.token ? newPasswordForm : requestForm}
    </ResetPassword>
  );
};

export default resetPassword;
