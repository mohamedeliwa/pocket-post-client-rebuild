import Link from "next/link";
import { Container, ListGroup, Button } from "react-bootstrap";
import {IoMdArrowRoundBack} from "react-icons/io";

const CollectionContent = (props) => {
  return (
    <Container>
      <Button variant="outline-primary" onClick={props.fn}><IoMdArrowRoundBack /> Back</Button>
      <br />
      <br />
      <ListGroup variant="flush">
        <Link href="/posts/[slug]" as='/posts/hello'><ListGroup.Item style={{cursor: "pointer"}} onMouseEnter={(e) => e.target.style.color = "blue"}  onMouseLeave={(e) => e.target.style.color = "black"}>Click me to go to Home</ListGroup.Item></Link>
        <Link href="/posts/[slug]" as='/posts/hello'><ListGroup.Item style={{cursor: "pointer"}}>go to post reading page</ListGroup.Item></Link>
        <ListGroup.Item style={{cursor: "pointer"}}>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item style={{cursor: "pointer"}}>Porta ac consectetur ac</ListGroup.Item>
        <hr />
      </ListGroup>
    </Container>
  );
};

export default CollectionContent;
