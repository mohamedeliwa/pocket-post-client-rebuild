import Head from "next/head";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import SidebarWidgets from "../components/SidebarWidgets";
import styled from "styled-components";
import useSWR from "swr";
import ErrorMsg from "../components/ErrorMsg";
import EmptySection from "../components/EmptySection";

const StyledHome = styled(Container)``;

const Home = (props) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: allPosts, error } = useSWR(
    "http://localhost:5000/posts?limit=4&skip=0&sortBy=createdAt:desc",
    fetcher
  );
  const PostsCards = error ? (
    <ErrorMsg msg="Failed to load! , please try again later." />
  ) : !allPosts ? (
    <Spinner />
  ) : (
    allPosts.map((post) => <PostCard postDetails={post} key={post._id} />)
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
          {PostsCards.length == 0 ? <EmptySection /> : PostsCards}
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
