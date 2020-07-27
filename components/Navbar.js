import Link from "next/link";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import styled from "styled-components";

const StyledNav = styled(Nav)`

  // background-color: #eee;
  flex-basis:50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  // span{
  //   border: 1px solid black;
    
  // }
  @media screen and (max-width: 768px){
    & span {
      margin: 5px;
    }
  }
`;


/**
 * if the user not authenticated
 **/

// export default () => {
//   return (
//     <Container>
//       <Navbar  collapseOnSelect  bg="white" expand="md" className="d-flex justify-content-between">

//         <Navbar.Brand className="flex-fill">
//           <Link href="/">
//             <div className="text-secondary" style={{ cursor: "pointer" }}>
//               Pocket-Post
//             </div>
//           </Link>
//         </Navbar.Brand>

//           <StyledNav /*bg="light"*/ /*className="flex-fill bg-light  justify-content-end"*/>
//             <Nav.Link as="span">
//               <Link href="/accounts/login">
//                 <div className="text-primary" style={{ cursor: "pointer" }}>
//                   Log In
//                 </div>
//               </Link>
//             </Nav.Link>
//             <Nav.Link as="span" >
//               <Link href="/accounts/signup">
//                 <div className="text-primary" style={{ cursor: "pointer" }}>
//                   Sign up
//                 </div>
//               </Link>
//             </Nav.Link>
//           </StyledNav>

//       </Navbar>
//     </Container>
//   );
// };

/**
 * when the user logged in
 */

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

export default () => {
  return (
    <Container>
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
        <StyledNav /*bg="light" className="flex-fill flex-nowrap justify-content-end"*/>
          <Nav.Link as="span">
            <Link href="/posts/new">
              <div className="text-primary" style={{ cursor: "pointer" }}>
                New Post
              </div>
            </Link>
          </Nav.Link>

          <Dropdown>
            {/* <Dropdown.Toggle  className="border-0 rounded bg-white">
              <img src="/profile.png"  style={{width: "30px"}} />
            </Dropdown.Toggle> */}
            <StyledToggle /*className="border-0 rounded bg-white"*/>
              <img src="/profile.png" style={{ width: "30px" }} />
            </StyledToggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/authors/[id]" as={`/authors/hello`}>
                  <div>
                    Profile
                  </div>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/accounts/login">
                  <div>
                    Settings
                  </div>
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item >
              <Link href="/accounts/login">
              <div>
                   Logout
              </div>
              </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </StyledNav>
      </Navbar>
    </Container>
  );
};
