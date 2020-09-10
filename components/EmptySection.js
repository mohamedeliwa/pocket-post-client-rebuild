import { Container, Alert } from "react-bootstrap";

const EmptySection = () => {
  return (
    <Container>
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Unfortionately this section is Empty for now, you can help contributing to Pocket-Post
        </p>
        <hr />
        <p className="mb-0">
          
        </p>
      </Alert>
    </Container>
  );
};

export default EmptySection;
