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
    `https://pocket-post-server.herokuapp.com/posts/${props.postId}/public`,
    fetcher
  );

  const collectionFetcher = (url) => fetch(url).then((r) => r.json());
  const { data: collection, error: collectionError } = useSWR(
    () => post.series ? `https://pocket-post-server.herokuapp.com/series/${post.series}` : null,
    // When passing a function, SWR will use the return
    // value as `key`. If the function throws or returns
    // falsy, SWR will know that some dependencies are not
    // ready. In this case `user.id` throws when `user`
    // isn't loaded.
    collectionFetcher
  );
  
  const posts = collectionError ? (
    <ErrorMsg msg="Failed to load! , please try again later." />
  ) : !collection ? (
    <Spinner />
  ) : (
    collection.posts.map((post) => {
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

  return collection ? (
    <Card className=" my-4">
      <Card.Header>{collection.name} Collection</Card.Header>
      <Card.Body className="p-0">
        <div className="list-group-flush">{posts}</div>
      </Card.Body>
    </Card>
  ) : null;
};

export default CollectionWidget;
