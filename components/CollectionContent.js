import Link from "next/link";
import { Container, ListGroup, Button } from "react-bootstrap";
import {IoMdArrowRoundBack} from "react-icons/io";
import styled from 'styled-components';


const StyledListItem= styled(ListGroup.Item)`
  cursor: pointer;
  &:hover {
    color: #007bff;
  }

`;

const CollectionContent = (props) => {
  return (
    <Container>
      <Button variant="outline-primary" onClick={props.fn}><IoMdArrowRoundBack /> Back</Button>
      <br />
      <br />
      <ListGroup variant="flush">
        <Link href="/posts/[id]" as='/posts/hello'><StyledListItem> 1st post in the collection </StyledListItem></Link>
        <Link href="/posts/[id]" as='/posts/hello'><StyledListItem> 2nd post in the collection </StyledListItem></Link>
        <Link href="/posts/[id]" as='/posts/hello'><StyledListItem> 3rd post in the collection </StyledListItem></Link>
        <Link href="/posts/[id]" as='/posts/hello'><StyledListItem> 4th post in the collection </StyledListItem></Link>
        <hr />
      </ListGroup>
    </Container>
  );
};

export default CollectionContent;
