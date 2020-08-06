import Head from "next/head";
import SidebarWidgets from "../../components/SidebarWidgets";
import PostContent from "../../components/PostContent";
import { Container, Row, Col } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const Post = (props) => {
  return (
    <div>
      <Head>
        <title>Post page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col md={12} lg={8}>
            <PostContent post={props.post} />
          </Col>

          <Col md={12} lg={4}>
            <SidebarWidgets authorImage={props.post.author.picture} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/post`);
  const post = await res.json();
  // Pass data to the page via props
  return { props: { post } };
}

export default Post;
