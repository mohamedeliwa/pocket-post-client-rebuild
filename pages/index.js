import Head from "next/head";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { Container, Row, Col } from "react-bootstrap";
import SidebarWidgets from "../components/SidebarWidgets";
// import { getAllPosts } from "../utils/api";

const Home = (props) => {
  const PostsCards = props.allPosts.map((post) => (
    <PostCard postDetails={post} key={post.slug} />
  ));

  return (
    <Container>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <Col md={8} >
          <h1 className="my-4">
            Pocket-Post <small className="text-secondary" style={{fontSize: "1rem"}}>_wherever you go!</small>
          </h1>
          {PostsCards}
          <Pagination />
        </Col>
        <Col md={4} >
          <SidebarWidgets />
        </Col>
      </Row>
    </Container>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};

export default Home;

function getAllPosts(){
  return [
    {
      title: "Hello world",
      date: "19yy-mm-dd",
      slug: "hello",
      author: "random",
      coverImage: "",
      excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda"

    },
    {
      title: "Hello world",
      date: "19yy-mm-dd",
      slug: "random",
      author: "random",
      coverImage: "",
      excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda"

    },
    {
      title: "Hello world",
      date: "19yy-mm-dd",
      slug: "welcome",
      author: "random",
      coverImage: "",
      excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda"

    }
  ]
}