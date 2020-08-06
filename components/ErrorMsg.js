import { Container, Alert } from "react-bootstrap";

// this Component can be used as a general error comonent, displayed wherever needed
// with some modifications as changing its name, making it accept props to change error text based on each error
export default (props) => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center p-2 bg-white"
    >
     <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {props.msg}
        </p>
      </Alert>
    </Container>
  );
};
