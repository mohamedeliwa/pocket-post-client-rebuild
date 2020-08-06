import Head from "next/head";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import SidebarWidgets from "../components/SidebarWidgets";
import styled from "styled-components";
import useSWR from "swr";
import LoadingFailed from "../components/LoadingFailed";

const StyledHome = styled(Container)``;

const Home = (props) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: allPosts, error } = useSWR("/api/postList", fetcher);

  const PostsCards = error ? (
    <LoadingFailed />
  ) : !allPosts ? (
    <Spinner />
  ) : (
    allPosts.map((post) => <PostCard postDetails={post} key={post.slug} />)
  );

  return (
    <StyledHome>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <Col md={12} lg={8}>
          <h1 className="my-4">
            Pocket-Post{" "}
            <small className="text-secondary" style={{ fontSize: "1rem" }}>
              _wherever you go!
            </small>
          </h1>
          {PostsCards}
          <Pagination />
        </Col>
        <Col md={12} lg={4}>
          <SidebarWidgets />
        </Col>
      </Row>
    </StyledHome>
  );
};

export default Home;
