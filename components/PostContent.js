import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
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
  font-size: 1.55rem;
  margin: 2px 4px;
  cursor: pointer;
`;
const Delete = styled(MdDelete)`
  margin: 2px 4px;
  cursor: pointer;
  color: #ab293b;
`;

const PostContent = ({ post }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [hearted, setHearted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    setHearted(
      isAuthenticated && user.likedPosts.includes(post._id) ? true : false
    );
    setBookmarked(
      isAuthenticated && user.bookmarkedPosts.includes(post._id) ? true : false
    );
    setReported(
      isAuthenticated && user.reportedPosts.includes(post._id) ? true : false
    );
  }, [isAuthenticated]);

  const hearting = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const url = `https://pocket-post-server.herokuapp.com/like/post/${post._id}`;
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
        });
        if (response.status === 200) {
          setHearted(!hearted);
          router.reload();
        } else {
          const responseJSON = await response.json();
          throw new Error(responseJSON.error);
        }
      } else {
        alert("You should login first");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const bookmarking = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const url = `https://pocket-post-server.herokuapp.com/bookmark/post/${post._id}`;
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
        });
        if (response.status === 200) {
          setBookmarked(!bookmarked);
          router.reload();
        }
      } else {
        alert("You should login first");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const reporting = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const url = `https://pocket-post-server.herokuapp.com/report/post/`;
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportedPostId: post._id,
            issue: "Something",
            issueDetails: "reported",
          }),
        });
        if (response.status === 200) {
          setReported(!reported);
          router.reload();
        } else {
          const responseJSON = await response.json();
          throw new Error(responseJSON.error);
        }
      } else {
        alert("You should login first");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const deleting = async (e) => {
    e.preventDefault();
    try {
      const url = `https://pocket-post-server.herokuapp.com/posts/${post._id}`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status === 200) {
        alert("post deleted successfully!");
        router.push("/");
      } else {
        alert("deleting post failed, try again!");
      }
    } catch (error) {
      console.log(error.message);
    }
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
          {post.likesCount}
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
      <Delete onClick={deleting} />
      <Edit onClick={() => router.push(`/posts/edit?id=${post._id}`)} />
      <Badge
        className="bg-white text-secondary"
        variant="light"
        style={{ margin: "2px 8px", padding: 0 }}
      >
        <FullHeart hearted={"true"} style={{ cursor: "default" }} />
        <span
          className=""
          style={{ fontSize: "19px", margin: "0px 0px 0px 2px" }}
        >
          {post.likesCount}
        </span>
      </Badge>
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
          src={post.owner.avatar}
          rounded
        />
        <Link href="/profile/[id]" as={`/profile/${post.owner._id}`}>
          <Figure.Caption
            style={{ color: "#17a2b8", cursor: "pointer" }}
            className="ml-3 mb-2"
          >
            {`${post.owner.firstName} ${post.owner.lastName}`}
          </Figure.Caption>
        </Link>
      </Figure>

      <hr />

      <p>Posted on {post.updatedAt.slice(0, 10)}</p>
      <hr />
      {/* Post Cover Image */}
      <img
        className="img-fluid rounded"
        src={`data:image/png;base64,${post.coverImage}`}
        alt=""
        style={{
          height: /*'25rem'*/ "400px",
          width: /*'50rem'*/ /*"800px"*/ /*"45.5rem"*/ "728px",
        }}
      />

      <hr />
      {/* Post Controlers */}
      <div
        className=" d-flex justify-content-end align-items-end text-secondary"
        style={{ fontSize: "26px" }}
      >
        {post.owner._id === user._id ? ownerControls : readerControls}
      </div>
      {/* Outputting the content of a post */}
      <Output data={post.content} />
      {/* Post tags */}
      <div className="badges-div">
        <br />
        <hr />
        {post.tags.map((tag, index) => {
          const tagVariant = index % 2 == 0 ? "warning" : "info";
          return (
            <span key={index}>
              <Badge variant={tagVariant}>{tag}</Badge>{" "}
            </span>
          );
        })}
      </div>
    </Container>
  );
};

export default PostContent;
