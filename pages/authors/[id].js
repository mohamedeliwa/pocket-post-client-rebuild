import Head from "next/head";
import { useState } from "react";
import PostCard from "../../components/PostCard";
import {
  Container,
  Jumbotron,
  Image,
  Row,
  Col,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { TiFlag } from "react-icons/ti";
import styled from "styled-components";

const StyledUserCard = styled(Container)`
  // /background-color: lightyellow;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
`;

const Author = (props) => {
  const [key, setKey] = useState("allPosts");
  const PostsCards = props.allPosts.map((post) => (
    <PostCard postDetails={post} key={post.slug} />
  ));

  return (
    <Container /*className="bg-light"*/>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Jumbotron fluid className="bg-white">
        <StyledUserCard>
          <div className="user-info">
            <h1>Jhon Deo</h1>
            <p>
              Love to write and code, yet need to learn more. Feedback always
              welcome.
            </p>
            <div>
              <span style={{ margin: "0px 4px" }}>
                <Badge variant="light">250</Badge>Posts
              </span>
              <span style={{ margin: "0px 4px" }}>
                <Badge variant="light">250</Badge>likes
              </span>
              <span style={{ margin: "0px 0px 0px 15px", cursor: "pointer" }}>
                report <TiFlag />
              </span>
            </div>
          </div>

          <div className="user-img">
            <Image src="/blog/authors/jj.jpeg" rounded />
          </div>
        </StyledUserCard>
      </Jumbotron>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="allPosts" title="All Posts">
          <br />
          {PostsCards}
        </Tab>
        <Tab eventKey="Serieses" title="Series Posts">
          <br />
          {PostsCards}
        </Tab>
      </Tabs>
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

export const getStaticPaths = async () => {
  const posts = [{ id: "hello" }, { id: "random" }, { id: "welcome" }]; //getAllPosts(["slug"]);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          id: posts.id,
        },
      };
    }),
    fallback: true,
  };
};

function getAllPosts() {
  return [
    {
      title: "Hello world",
      date: "2020-05-03",
      slug: "hello",
      author: /*params.slug*/ {
        name: "Jhon Deo",
        picture: "/blog/authors/jj.jpeg",
      },
      coverImage: "/blog/hello-world/cover.jpg",
      excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda",
    },
    {
      title: "Hello world",
      date: "2020-05-03",
      slug: "random",
      author: /*params.slug*/ {
        name: "Jhon Deo",
        picture: "/blog/authors/jj.jpeg",
      },
      coverImage: "/blog/hello-world/cover.jpg",
      excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda",
    },
    {
      title: "Hello world",
      date: "2020-05-03",
      slug: "welcome",
      author: /*params.slug*/ {
        name: "Jhon Deo",
        picture: "/blog/authors/jj.jpeg",
      },
      coverImage: "/blog/hello-world/cover.jpg",
      excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda",
    },
  ];
}

/**
 * reconsider making this page a SSR page
 * SEO maybe not important here.
 * This page may be a static html page iwth client side rendering
 *
 */
// This gets called on every request
// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   console.log(context.query);
//   console.log(context.params);
//   const data = "asd";

//   // Pass data to the page via props
//   return { props: { data } };
// }

export default Author;
