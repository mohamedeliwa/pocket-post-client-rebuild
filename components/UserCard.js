import {
  Container,
  Jumbotron,
  Image,
  Badge,
} from "react-bootstrap";
import { TiFlag } from "react-icons/ti";
import styled from "styled-components";

const StyledUserCard = styled(Container)`
  // /background-color: lightyellow;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
`;

const UserCard = () => {
  return (
    <Jumbotron fluid className="bg-white">
      <StyledUserCard>
        <div className="user-info">
          <h1>Jhon Deo</h1>
          <p>
            Love to write and code, yet need to learn more. Feedback always
            welcome.
          </p>
          <div>
            <span style={{ margin: "0px 4px" }}>
              <Badge variant="light">250</Badge>Posts
            </span>
            <span style={{ margin: "0px 4px" }}>
              <Badge variant="light">250</Badge>likes
            </span>
            <span style={{ margin: "0px 0px 0px 15px", cursor: "pointer" }}>
              report <TiFlag />
            </span>
          </div>
        </div>

        <div className="user-img">
          <Image src="/blog/authors/jj.jpeg" rounded />
        </div>
      </StyledUserCard>
    </Jumbotron>
  );
};

export default UserCard;
