import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const PostCard = (props) => {
  const {
    title,
    createdAt: date,
    owner: author,
    _id: id,
    excerpt,
    coverImage,
  } = props.postDetails;
  return (
    <Card className="card mb-4">
      <Card.Img
        variant="top"
        // src= {coverImage}
        src={`data:image/png;base64,${coverImage}`}
        // src="/blog/dynamic-routing/cover.jpg"
        alt="Card image cap"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{excerpt}</Card.Text>
        <Link href="/posts/[id]" as={`/posts/${id}`}>
          <Button variant="primary">Read More &rarr;</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">
        {date.slice(0,10)} By_{" "}
        <Link href="/profile/[id]" as={`/profile/${author._id}`}>
          <span style={{ color: "#17a2b8", cursor: "pointer" }}>
            {" "}
            {author.firstName + " " + author.lastName}
          </span>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
