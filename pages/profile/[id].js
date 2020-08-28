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
  const { data: allPosts, error } = useSWR(`http://localhost:5000/posts?user_id=${props.user._id}`, fetcher);
  const PostsCards = error ? (
    <ErrorMsg msg="Failed to load! , please try again later." />
  ) : !allPosts ? (
    <Spinner />
  ) : (
    allPosts.reverse().map((post) => <PostCard postDetails={post} key={post._id} />)
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
  // getting user's id from routing params
  const id = context.params.id;
  // fetching user's public information
  const res = await fetch(`http://localhost:5000/users/profile/${id}`);
  const user = await res.json();
  // fechting user's post collections
  const res2 = await fetch(`http://localhost:5000/series?user_id=${id}`);
  const collections = await res2.json();
  console.log(await collections);
  // Pass data to the page via props
  return { props: { user, collections } };
}

export default Author;
