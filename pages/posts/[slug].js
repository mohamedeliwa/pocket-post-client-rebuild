import Head from "next/head";
// import SidebarWidgets from "../../components/SidebarWidgets";
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
          <Col /*md={8}*/ md={12}>
            <PostContent post={props.post}/>
          </Col>

          <Col /*md={4}*/>
            {/* <SidebarWidgets authorImage={props.post.author.picture}/> */}
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
    date: "yyyy-mm-dd",
    slug: "welcome",
    author: params.slug,
    coverImage: "",
    excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda",
    contnt : "<h1>Hello</h1>"
  }
  const content = "<h1>Hello</h1>"
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
