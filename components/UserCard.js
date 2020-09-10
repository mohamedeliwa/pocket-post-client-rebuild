import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import { Container, Jumbotron, Image, Badge } from "react-bootstrap";
import { TiFlag } from "react-icons/ti";
import styled from "styled-components";
import useSWR from "swr";

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

const UserCard = ({ user }) => {
  const router = useRouter();
  const { user: currentUser, isAuthenticated } = useContext(AuthContext);

  const fetcher = (url) => fetch(url).then((r) => r);
  const { data, error } = useSWR(() => isAuthenticated ? `http://localhost:5000/users/${user._id}/avatar` : null, fetcher);

  const avatar =  (error || !data || data.status !== 200) ? (
    <Image src={"/profile.png"} style={{width: "250px", height: "250px"}} rounded />
  ) : (
    <Image src={user.avatar} rounded />
  )

  const [reported, setReported] = useState(false);
  useEffect(() => {
    setReported(
      isAuthenticated && currentUser.reportedUsers.includes(user._id)
        ? true
        : false
    );
  }, [isAuthenticated]);
  const reporting = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const url = `http://localhost:5000/report/user/`;
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportedUserId: user._id,
            issue: "Something",
            issueDetails: "reported",
          }),
        });
        if (response.status === 200) {
          setReported(!reported);
          router.reload();
        }
      } else {
        alert("You should login first");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Jumbotron fluid className="bg-white">
      <StyledUserCard>
        <div className="user-info">
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <p>{user.caption}</p>
          <div>
            <span style={{ margin: "0px 4px" }}>
              <Badge className="text-success" variant="light">
                {user.postsCount}
              </Badge>
              Posts
            </span>
            <span style={{ margin: "0px 4px" }}>
              <Badge className="text-primary" variant="light">
                {user.likesCount}
              </Badge>
              likes
            </span>
            {user._id === currentUser._id ? null : (
              <Report
                reported={reported ? "true" : "false"}
                onClick={reporting}
              >
                {reported ? "Reported" : "report"} <TiFlag />
              </Report>
            )}
          </div>
        </div>

        <div className="user-img">
          {/* <Image src={user.avatar} rounded /> */}
          {avatar}
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
