import Link from "next/link";
import { Container, Badge, Image, Jumbotron, Button } from "react-bootstrap";
import { TiFlag } from "react-icons/ti";
import styled from "styled-components";
const StyledCollectionCard = styled(Container)`
  //background-color: lightyellow;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap-reverse;
`;

const CollectionCard = (props) => {
  return (
    <Jumbotron fluid className="bg-white">
      <StyledCollectionCard>
        <div className="user-img">
          <Image src="https://via.placeholder.com/200" rounded />
        </div>

        <div className="collection-info">
          <h1>{props.collection.name}</h1>
          <p>
            {props.collection.desc}
          </p>
          <div>
            <span style={{ margin: "0px 4px" }}>
              <Badge variant="light">{props.collection.postCount}</Badge>Posts
            </span>
            <span style={{ margin: "0px 4px" }}>
              <Badge variant="light">{props.collection.likesCount}</Badge>likes
            </span>
            <span style={{ margin: "0px 0px 0px 15px", cursor: "pointer" }}>
              report <TiFlag />
            </span>
          </div>
          <br />
          <Button onClick={props.fn}>View Collection</Button>
        </div>
      </StyledCollectionCard>
    </Jumbotron>
  );
};

export default CollectionCard;
