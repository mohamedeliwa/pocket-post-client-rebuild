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
            <SidebarWidgets /*authorImage={props.post.owner.avatar}*/ />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  // getting post's id from routing params
  const id = context.params.id;
  const res = await fetch(`http://localhost:5000/posts/${id}/public`);
  // temporary fetching test post info till end-point for post feching updated on the server
  // const res2 = await fetch(`http://localhost:3000/api/post`);
  const post = await res.json();
  // const post2 = await res2.json();
  // Pass data to the page via props
  return { props: { post: {
    ...post,
    owner: {
      ...post.owner,
      avatar: `http://localhost:5000/users/${post.owner._id}/avatar`
    },
    // coverImage: post2.coverImage,
    coverImage: post.coverImage,
    content: JSON.parse(post.content)
    // content: post.content
  } } };
}

export default Post;
