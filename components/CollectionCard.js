import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import { Container, Badge, Image, Jumbotron, Button } from "react-bootstrap";
import { TiFlag } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";

const StyledCollectionCard = styled(Container)`
  //background-color: lightyellow;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap-reverse;
`;

const Report = styled.span`
  margin: 0px 0px 0px 15px;
  cursor: pointer;
  color: ${(props) => (props.reported === "true" ? "#AB293B" : "#212529")};
`;

const CollectionCard = (props) => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    setReported(
      isAuthenticated && user.reportedSerieses.includes(props.collection._id)
        ? true
        : false
    );
  }, [isAuthenticated]);

  const deleting = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/series/${props.collection._id}`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status === 200) {
        alert("series deleted successfully!");
        router.push("/");
      } else {
        alert("deleting series failed, try again!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const reporting = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const url = `http://localhost:5000/report/series/`;
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportedSeriestId: props.collection._id,
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

  const readerControls = (
    <>
      <span style={{ margin: "0px 4px" }}>
        <Badge variant="light">{props.collection.postCount}</Badge>Posts
      </span>
      <span style={{ margin: "0px 4px" }}>
        <Badge variant="light">{props.collection.likesCount}</Badge>likes
      </span>
      <Report reported={reported ? "true" : "false"} onClick={reporting}>
        {reported ? "Reported" : "report"} <TiFlag />
      </Report>
    </>
  );
  const ownerControls = (
    <>
      <MdDelete
        style={{
          color: "red",
          margin: "auto auto auto 20px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={deleting}
      />
    </>
  );
  return (
    <Jumbotron fluid className="bg-white">
      <StyledCollectionCard>
        <div className="user-img">
          <Image
            src={`data:image/png;base64,${props.collection.coverImage}`}
            rounded
          />
        </div>

        <div className="collection-info">
          <h1>{props.collection.name}</h1>
          <p>{props.collection.description}</p>
          <div>
            {props.collection.owner === user._id
              ? ownerControls
              : readerControls}
          </div>
          <br />
          <Button onClick={props.fn} id={props.collection._id}>
            View Collection
          </Button>
        </div>
      </StyledCollectionCard>
    </Jumbotron>
  );
};

export default CollectionCard;
