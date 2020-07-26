import { useEffect } from "react";
import { Container, Figure, Badge } from "react-bootstrap";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TiFlag } from "react-icons/ti";

const PostContent = ({ post }) => {
  // let dateArray = post.date.split("");
  // const tIndex = dateArray.indexOf("T");
  // dateArray = dateArray.slice(0, tIndex);
  // const  date = dateArray.join("");

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
          <IoMdHeartEmpty
            style={{
              cursor: "pointer",
              fontSize: "26px",
            }}
          ></IoMdHeartEmpty>
          <span
            className=""
            style={{ fontSize: "19px", margin: "0px 0px 0px 2px" }}
          >
            55
          </span>
        </Badge>
        <MdBookmarkBorder style={{ margin: "2px 8px", cursor: "pointer" }} />
        <TiFlag style={{ margin: "2px 0px", cursor: "pointer" }} />
      </div>
      <div
        className="div-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </Container>
  );
};

export default PostContent;
