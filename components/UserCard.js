import { useState } from "react";
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

const Report = styled.span`
   margin: 0px 0px 0px 15px;
   cursor: pointer;
  color: ${(props) => (props.reported === "true" ? "#AB293B" : "#212529")};
`;

const UserCard = (props) => {
  const [reported, setReported] = useState(false);
  const [user, setUser] = useState(props.user);
  const reporting = (e) => {
    e.preventDefault();
    setReported(!reported);
  };

  return (
    <Jumbotron fluid className="bg-white">
      <StyledUserCard>
        <div className="user-info">
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <p>
            {user.caption}
          </p>
          <div>
            <span style={{ margin: "0px 4px" }}>
              <Badge className="text-success" variant="light">{user.postsCount}</Badge>Posts
            </span>
            <span style={{ margin: "0px 4px" }}>
              <Badge className="text-primary" variant="light">{user.likesCount}</Badge>likes
            </span>
            <Report reported={reported ? "true" : "false"} onClick={reporting} >
              {reported ? "Reported" : "report"} <TiFlag />
            </Report>
          </div>
        </div>

        <div className="user-img">
          <Image src={user.avatar} rounded />
        </div>
      </StyledUserCard>
    </Jumbotron>
  );
};

export default UserCard;
// user = {
//   _id: '5f3bf5f54ceb7008a4684ce8',
//   firstName: 'random',
//   lastName: 'random',
//   followersCount: 0,
//   likesCount: 0,
//   postsCount: 2,
//   seriesesCount: 0,
//   otherSocial: [],
//   createdAt: '2020-08-18T15:38:29.343Z'
// }