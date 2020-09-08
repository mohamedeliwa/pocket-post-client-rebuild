import { useContext } from "react";
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

const CollectionCard = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const deleting = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/series/${props.collection._id}`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if(response.status === 200){
        alert("series deleted successfully!");
        router.push("/");
      }else{
        alert("deleting series failed, try again!");
      }
    } catch (error) {
      console.log(error.message);
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
      <span style={{ margin: "0px 0px 0px 15px", cursor: "pointer" }}>
        report <TiFlag />
      </span>
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
// collection =   {
//   likesCount: 0,
//   _id: '5f4034298fbe501e540f3a80',
//   name: '1sasdast series',
//   description: 'Hello world',
//   owner: '5f3bf5f54ceb7008a4684ce8',
//   coverImage: 'QXNkYXM=',
//   createdAt: '2020-08-21T20:52:57.501Z',
//   updatedAt: '2020-08-21T20:52:57.501Z',
//   __v: 0
// }
