import { useEffect, useState } from "react";
import { Container, Figure, Badge } from "react-bootstrap";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TiFlag } from "react-icons/ti";
import styled from "styled-components";

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

const PostContent = ({ post }) => {
  // let dateArray = post.date.split("");
  // const tIndex = dateArray.indexOf("T");
  // dateArray = dateArray.slice(0, tIndex);
  // const  date = dateArray.join("");
  const [hearted, setHearted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    const ps = document.querySelectorAll(".div-content p");
    ps.forEach((p) => p.classList.add("lead"));

    const blockquotes = document.querySelectorAll(".div-content blockquote");
    blockquotes.forEach((blockquote) => blockquote.classList.add("blockquote"));

    const blockquotesFooter = document.querySelectorAll(
      ".div-content blockquote footer"
    );
    blockquotesFooter.forEach((blockquoteFooter) =>
      blockquoteFooter.classList.add("blockquote")
    );

    const uls = document.querySelectorAll(".div-content ul");
    uls.forEach((ul) => ul.classList.add("list-group"));

    const ulsLis = document.querySelectorAll(".div-content ul li");
    ulsLis.forEach((li) => li.classList.add("list-group-item"));
  });

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
        <Figure.Caption style={{ color: "#17a2b8" }} className="ml-3 mb-2">
          {post.author.name}
        </Figure.Caption>
      </Figure>

      <hr />

      <p>Posted on {post.date}</p>
      <hr />

      <img className="img-fluid rounded" src={post.coverImage} alt="" />

      <hr />
      <div
        className=" d-flex justify-content-end align-items-end text-secondary"
        style={{ fontSize: "26px" }}
      >
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
      </div>
      <div
        className="div-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </Container>
  );
};

export default PostContent;
