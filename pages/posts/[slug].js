import Head from "next/head";
import SidebarWidgets from "../../components/SidebarWidgets";
import PostContent from "../../components/PostContent";
import { Container, Row, Col } from "react-bootstrap";
// import { getPostBySlug, getAllPosts } from "../../utils/api";
// import markdownToHtml from "../../utils/markdownToHtml";

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
            <PostContent post={props.post}/>
          </Col>

          <Col md={12} lg={4}>
            <SidebarWidgets authorImage={props.post.author.picture}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  // const post = getPostBySlug(params.slug, [
  //   "title",
  //   "date",
  //   "slug",
  //   "author",
  //   "content",
  //   "ogImage",
  //   "coverImage",
  // ]);
  const post = {
    title: "Hello world",
    date: "2020-05-03",
    slug: "welcome",
    author: /*params.slug*/{name: "Jhon Deo", picture: "/blog/authors/jj.jpeg"},
    coverImage: "/blog/hello-world/cover.jpg",
    excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda",
    contnt : "<h1>Hello</h1>"
  }

  const content = `
  <h1>Hello</h1>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  `
  // const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = [{slug: "hello"},{ slug: "random"},{slug: "welcome"}]//getAllPosts(["slug"]);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Post;
