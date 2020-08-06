import Link from "next/link";
import { Container, ListGroup, Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import styled from "styled-components";


const PostName = styled.span`
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;
const Controls = styled.span`
  font-size: 23px;
  & > * {
    cursor: pointer;
    margin: auto 5px;
  }
`;

const CollectionContent = (props) => {
  return (
    <Container>
      <Button variant="outline-primary" onClick={props.fn}>
        <IoMdArrowRoundBack /> Back
      </Button>
      <br />
      <br />
      <ListGroup variant="flush">
        {/* One List Item */}
        <ListGroup.Item className="d-flex justify-content-around">
          <Link href="/posts/[id]" as="/posts/hello">
            <PostName>1st post in the collection</PostName>
          </Link>
          <Controls>
            <MdKeyboardArrowDown style={{color: "#007bff"}} />
            <MdKeyboardArrowUp style={{color: "#007bff"}} />
            <TiDeleteOutline style={{color: "#d93025"}} />
          </Controls>
        </ListGroup.Item>

         {/* One List Item */}
         <ListGroup.Item className="d-flex justify-content-around">
          <Link href="/posts/[id]" as="/posts/hello">
            <PostName>2nd post in the collection</PostName>
          </Link>
          <Controls>
            <MdKeyboardArrowDown style={{color: "#007bff"}} />
            <MdKeyboardArrowUp style={{color: "#007bff"}} />
            <TiDeleteOutline style={{color: "#d93025"}} />
          </Controls>
        </ListGroup.Item>


         {/* One List Item */}
         <ListGroup.Item className="d-flex justify-content-around">
          <Link href="/posts/[id]" as="/posts/hello">
            <PostName>3rd post in the collection</PostName>
          </Link>
          <Controls>
            <MdKeyboardArrowDown style={{color: "#007bff"}} />
            <MdKeyboardArrowUp style={{color: "#007bff"}} />
            <TiDeleteOutline style={{color: "#d93025"}} />
          </Controls>
        </ListGroup.Item>
       
        <hr />
      </ListGroup>
    </Container>
  );
};

export default CollectionContent;
