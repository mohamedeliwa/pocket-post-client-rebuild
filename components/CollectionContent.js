import Link from "next/link";
import { Container, ListGroup, Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import styled from "styled-components";
import useSWR from "swr";
import Spinner from "../components/Spinner";
import ErrorMsg from "../components/ErrorMsg";
import EmptySection from "./EmptySection";

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
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: collection, error } = useSWR(
    `http://localhost:5000/series/${props.collection.id}`,
    fetcher
  );
  const collectionPosts = error ? (
    <ErrorMsg msg="Failed to load! , please try again later." />
  ) : !collection ? (
    <Spinner />
  ) : (
    collection.posts.map((post) => {
      return (
        <ListGroup.Item className="d-flex justify-content-around" key={post._id}>
          <Link href="/posts/[id]" as={`/posts/${post._id}`}>
            <PostName>{post.title}</PostName>
          </Link>
          {/* <Controls>
            <MdKeyboardArrowDown style={{ color: "#007bff" }} />
            <MdKeyboardArrowUp style={{ color: "#007bff" }} />
            <TiDeleteOutline style={{ color: "#d93025" }} />
          </Controls> */}
        </ListGroup.Item>
      );
    })
  );
  return (
    <Container>
      <Button variant="outline-primary" onClick={props.fn}>
        <IoMdArrowRoundBack /> Back
      </Button>
      <br />
      <br />
      <ListGroup variant="flush">
        {collectionPosts.length === 0 ? <EmptySection /> : collectionPosts }
        <hr />
      </ListGroup>
    </Container>
  );
};

export default CollectionContent;
