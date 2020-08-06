import { Spinner, Container } from "react-bootstrap";

export default () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center p-2 bg-white">
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
};
