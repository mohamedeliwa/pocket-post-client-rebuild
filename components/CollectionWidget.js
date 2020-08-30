import Link from "next/link";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../components/Spinner";
import ErrorMsg from "../components/ErrorMsg";

const CollectionWidget = (props) => {
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: post, error: postError } = useSWR(
    `http://localhost:5000/posts/${props.postId}/public`,
    fetcher
  );

  const collectionFetcher = (url) => fetch(url).then((r) => r.json());
  const { data: collectionPosts, error: postsError } = useSWR(
    () => `http://localhost:5000/series/${post.series}`,
    // When passing a function, SWR will use the return
    // value as `key`. If the function throws or returns
    // falsy, SWR will know that some dependencies are not
    // ready. In this case `user.id` throws when `user`
    // isn't loaded.
    collectionFetcher
  );
  console.log(collectionPosts);

  const posts = postsError ? (
    <ErrorMsg msg="Failed to load! , please try again later." />
  ) : !collectionPosts ? (
    <Spinner />
  ) : (
    collectionPosts.map((post) => {
      return (
        <Link href="/posts/[id]" as={`/posts/${post._id}`} key={post._id}>
          <a
            className={`list-group-item list-group-item-action ${
              router.query.id === post._id ? "active" : null
            }`}
          >
            {post.title}
          </a>
        </Link>
      );
    })
  );

  return (
    <Card className=" my-4">
      <Card.Header>All collection's posts</Card.Header>
      <Card.Body className="p-0">
        <div className="list-group-flush">{posts}</div>
      </Card.Body>
    </Card>
  );
};

export default CollectionWidget;
