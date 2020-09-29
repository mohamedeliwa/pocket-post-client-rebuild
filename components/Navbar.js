import Link from "next/link";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import useSWR from "swr";

const StyledNav = styled(Nav)`
  // background-color: #eee;
  flex-basis: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  // span{
  //   border: 1px solid black;

  // }
  @media screen and (max-width: 768px) {
    & span {
      margin: 5px;
    }
  }
`;

const StyledToggle = styled(Dropdown.Toggle)`
  outline: none;
  border: none;
  background-color: white;
  &:focus,
  &:active,
  &:hover,
  &:disabled {
    border: none !important;
    background-color: white !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

export default (props) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const fetcher = (url) => fetch(url).then((r) => r);
  const { data, error } = useSWR(() => isAuthenticated ? `https://pocket-post-server.glitch.me/users/${user._id}/avatar` : null, fetcher);

  const avatar =  (error || !data || data.status !== 200) ? (
    <img  src={"/profile.png"} className="rounded" style={{ width: "30px" }} />
  ) : (
    <img  src={`https://pocket-post-server.glitch.me/users/${user._id}/avatar`} className="rounded" style={{ width: "30px" }} />
  )
  
  /**
   * if the user not authenticated
   **/

  const nonAuthenticatedNav = (
    //     <Container>
    <Navbar
      collapseOnSelect
      bg="white"
      expand="md"
      className="d-flex justify-content-between"
    >
      <Navbar.Brand className="flex-fill">
        <Link href="/">
          <div className="text-secondary" style={{ cursor: "pointer" }}>
            Pocket-Post
          </div>
        </Link>
      </Navbar.Brand>

      <StyledNav /*bg="light"*/ /*className="flex-fill bg-light  justify-content-end"*/
      >
        <Nav.Link as="span">
          <Link href="/accounts/login">
            <div className="text-primary" style={{ cursor: "pointer" }}>
              Log In
            </div>
          </Link>
        </Nav.Link>
        <Nav.Link as="span">
          <Link href="/accounts/signup">
            <div className="text-primary" style={{ cursor: "pointer" }}>
              Sign up
            </div>
          </Link>
        </Nav.Link>
      </StyledNav>
    </Navbar>
    //     </Container>
  );
  /**
   * when the user logged in
   */
  const authenticatedNav = (
    // <Container>
    <Navbar
      collapseOnSelect
      bg="white"
      expand="md"
      className="d-flex justify-content-between"
    >
      <Navbar.Brand className="flex-fill">
        <Link href="/">
          <div className="text-secondary" style={{ cursor: "pointer" }}>
            Pocket-Post
          </div>
        </Link>
      </Navbar.Brand>
      <StyledNav /*bg="light" className="flex-fill flex-nowrap justify-content-end"*/
      >
        <Nav.Link as="span">
          <Link href="/posts/new">
            <div className="text-primary" style={{ cursor: "pointer" }}>
              New
            </div>
          </Link>
        </Nav.Link>

        <Dropdown>
          {/* <Dropdown.Toggle  className="border-0 rounded bg-white">
              <img src="/profile.png"  style={{width: "30px"}} />
            </Dropdown.Toggle> */}
          <StyledToggle /*className="border-0 rounded bg-white"*/>
            {avatar}
          </StyledToggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/profile/[id]" as={`/profile/${user._id}`}>
                <div>Profile</div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/profile/settings">
                <div>Settings</div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link href="/accounts/login">
                <div onClick={logout}>Logout</div>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledNav>
    </Navbar>
    // </Container>
  );
  return (
    <Container>
      {isAuthenticated === null
        ? null
        : isAuthenticated
        ? authenticatedNav
        : nonAuthenticatedNav}
    </Container>
  );
};
