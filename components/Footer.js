import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";

const Footer = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const authenticatedFooter = (
    <footer>
      <Container className="text-right">
        <Link href="/">
          <a className="footer-link">Home</a>
        </Link>
        <Link href="/">
          <a className="footer-link">Profile</a>
        </Link>
        <Link href="/profile/settings">
          <a className="footer-link">Settings</a>
        </Link>
        <p className=" copyRight text-right text-secondary">
          Copyright &copy; Pocket-Post 2020
        </p>
      </Container>

      <style jsx>{`
        footer {
          margin-top: 10rem;
        }
        .copyRight {
          display: inline-block;
          margin-left: 5rem;
          font-size: 12px;
        }
        .footer-link {
          text-decoration: none;
          color: rgb(0, 149, 246);
          font-size: 13.3333px;
          margin: auto 1rem;
        }
        .footer-link:hover,
        .footer-link:active,
        .footer-link:select {
          color: rgb(0, 149, 246);
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
  const nonAuthenticatedFooter = (
    <footer>
      <Container className="text-right">
        <Link href="/">
          <a className="footer-link">Home</a>
        </Link>
        <p className=" copyRight text-right text-secondary">
          Copyright &copy; Pocket-Post 2020
        </p>
      </Container>

      <style jsx>{`
        footer {
          margin-top: 10rem;
        }
        .copyRight {
          display: inline-block;
          margin-left: 5rem;
          font-size: 12px;
        }
        .footer-link {
          text-decoration: none;
          color: rgb(0, 149, 246);
          font-size: 13.3333px;
          margin: auto 1rem;
        }
        .footer-link:hover,
        .footer-link:active,
        .footer-link:select {
          color: rgb(0, 149, 246);
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
  return isAuthenticated ? authenticatedFooter : nonAuthenticatedFooter;
};

export default Footer;
