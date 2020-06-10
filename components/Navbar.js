
import Link from "next/link";
import {Navbar, Container} from "react-bootstrap";

export default () => {
  return (
   
    <Navbar expand="lg" bg="white" variant="dark">
    <Container >
        <Navbar.Brand><Link href="/"><div className="text-secondary" style={{cursor: "pointer"}}>Pocket-Post</div></Link></Navbar.Brand>
    </Container>
  </Navbar>

  );
};