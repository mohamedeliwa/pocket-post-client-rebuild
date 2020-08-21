import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

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
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if(isAuthenticated) router.push("/")

  }, [isAuthenticated])

  return (
    <SignUp>
      <StyledForm className="bg-light">
        <FormHeader>Pocket-Post</FormHeader>

        {/* for first name */}
        <Form.Group controlId="formBasicFirstName">
          <Form.Control type="text" placeholder="First name" />
        </Form.Group>

        {/* for last name */}
        <Form.Group controlId="formBasicLastName">
          <Form.Control type="text" placeholder="Last name" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Sign up
        </Button>
      </StyledForm>
    </SignUp>
  );
};

export default signup;
