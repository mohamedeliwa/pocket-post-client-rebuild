import { Container} from 'react-bootstrap';
import Link from "next/link"
const Footer = () => {
  return (
      <footer>
        <Container className="text-right">
          <Link href="/"><a className="footer-link">Home</a></Link>
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
          }
          .footer-link:hover,
          .footer-link:active,
          .footer-link:select{
            color: rgb(0, 149, 246);
            text-decoration: none;
          }
        `}</style>
      </footer>
  );
};

export default Footer;
