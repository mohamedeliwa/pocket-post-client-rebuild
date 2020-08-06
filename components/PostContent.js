import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Figure, Badge } from "react-bootstrap";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdThumbUp,
  MdThumbDown,
  MdDelete,
} from "react-icons/md";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TiFlag } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";
import Output from "editorjs-react-renderer";

const EmptyHeart = styled(IoMdHeartEmpty)`
  cursor: pointer;
  font-size: 26px;
  display: ${(props) => (props.hearted === "true" ? "none" : "inline")};
  &:hover {
    color: #d93025;
  }
`;
const FullHeart = styled(IoMdHeart)`
  cursor: pointer;
  font-size: 26px;
  color: #d93025;
  display: ${(props) => (props.hearted === "true" ? "inline" : "none")};
`;

const EmptyBookmark = styled(MdBookmarkBorder)`
  margin: 2px 8px;
  cursor: pointer;
  display: ${(props) => (props.bookmarked === "true" ? "none" : "inline")};
  &:hover {
    color: #23cd72;
    // color : #28764c;
  }
`;
const FullBookmark = styled(MdBookmark)`
  margin: 2px 8px;
  cursor: pointer;
  color: #23cd72;
  display: ${(props) => (props.bookmarked === "true" ? "inline" : "none")};
`;

const Report = styled(TiFlag)`
  margin: 2px 0px;
  cursor: pointer;
  color: ${(props) => (props.reported === "true" ? "#AB293B" : "#6c757d")};
`;

const Edit = styled(FiEdit)`
  margin: 2px 4px;
  cursor: pointer;
`;
const Delete = styled(MdDelete)`
  margin: 2px 4px;
  cursor: pointer;
  color: #AB293B;
`;

const PostContent = ({ post }) => {
  const [hearted, setHearted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reported, setReported] = useState(false);
  const hearting = (e) => {
    e.preventDefault();
    setHearted(!hearted);
  };

  const bookmarking = (e) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  const reporting = (e) => {
    e.preventDefault();
    setReported(!reported);
  };

  const readerControls = (
    <>
      <Badge
        className="bg-white text-secondary"
        variant="light"
        style={{ margin: "2px 8px", padding: 0 }}
      >
        <EmptyHeart hearted={hearted ? "true" : "false"} onClick={hearting} />
        <FullHeart hearted={hearted ? "true" : "false"} onClick={hearting} />
        <span
          className=""
          style={{ fontSize: "19px", margin: "0px 0px 0px 2px" }}
        >
          55
        </span>
      </Badge>
      <EmptyBookmark
        bookmarked={bookmarked ? "true" : "false"}
        onClick={bookmarking}
      />
      <FullBookmark
        bookmarked={bookmarked ? "true" : "false"}
        onClick={bookmarking}
      />
      <Report onClick={reporting} reported={reported ? "true" : "false"} />
    </>
  );

  const ownerControls = (
    <>
      <Edit />
      <Delete />
    </>
  );

  return (
    <Container>
      <h1 className="mt-4">{post.title}</h1>
      <Figure className="d-flex align-items-center">
        <Figure.Image
          width={56}
          height={56}
          alt="56x56"
          src={post.author.picture}
          rounded
        />
        <Link href="/profile/[id]" as={`/profile/hello`}>
          <Figure.Caption
            style={{ color: "#17a2b8", cursor: "pointer" }}
            className="ml-3 mb-2"
          >
            {post.author.name}
          </Figure.Caption>
        </Link>
      </Figure>

      <hr />

      <p>Posted on {post.date}</p>
      <hr />
      {/* Post Cover Image */}
      <img className="img-fluid rounded" src={post.coverImage} alt="" />

      <hr />
      {/* Post Controlers */}
      <div
        className=" d-flex justify-content-end align-items-end text-secondary"
        style={{ fontSize: "26px" }}
      >
        {readerControls}
        {/* {ownerControls} */}
      </div>
      {/* Outputting the content of a post */}
      <Output data={post.content} />
      {/* Post tags */}
      <div className="badges-div">
        <br />
        <hr />
        <Badge variant="warning">Javascript</Badge>{" "}
        <Badge variant="info">HTML</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="info">Nodjs</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="info">Nodjs</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="info">Nodjs</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="warning">Javascript</Badge>{" "}
        <Badge variant="info">HTML</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="info">Nodjs</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="info">Nodjs</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
        <Badge variant="info">Nodjs</Badge>{" "}
        <Badge variant="warning">ReactJS</Badge>{" "}
      </div>
    </Container>
  );
};

export default PostContent;
