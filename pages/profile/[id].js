import Head from "next/head";
import { useState } from "react";
import UserCard from "../../components/UserCard";
import PostCard from "../../components/PostCard";
import { Container, Tabs, Tab } from "react-bootstrap";
import Collections from "../../components/Collections";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import Spinner from "../../components/Spinner";
import ErrorMsg from "../../components/ErrorMsg";

const Author = (props) => {
  const [key, setKey] = useState("allPosts");

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: allPosts, error } = useSWR("/api/postList", fetcher);
  const PostsCards = error ? (
    <ErrorMsg msg="Failed to load! , please try again later." />
  ) : !allPosts ? (
    <Spinner />
  ) : (
    allPosts.map((post) => <PostCard postDetails={post} key={post.slug} />)
  );

  return (
    <Container /*className="bg-light"*/>
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserCard user={props.user} />

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="allPosts" title="All Posts">
          <br />
          {PostsCards}
        </Tab>
        <Tab eventKey="collections" title="Collections">
          <br />
          <Collections collectionsList={props.collections} />
        </Tab>
      </Tabs>
    </Container>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/authorInfo`);
  const user = await res.json();
  const res2 = await fetch(`http://localhost:3000/api/collectionList`);
  const collections = await res2.json();

  // Pass data to the page via props
  return { props: { user, collections } };
}

export default Author;
