import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const PostCard = (props) => {
  const {title, date, author, slug, excerpt, coverImage} = props.postDetails;
  return (
    <Card className="card mb-4">
      <Card.Img
        variant="top"
        // src= {coverImage}
        src='/blog/dynamic-routing/cover.jpg'
        alt="Card image cap"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {excerpt}
        </Card.Text>
        <Link href="/posts/[id]" as={`/posts/${slug}`}>
            <Button variant="primary" >Read More &rarr;</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">
        {date} By_  <Link href="/profile/[id]" as={`/profile/hello`}><span style={{color: "#17a2b8", cursor: "pointer"}}> {author.name}</span></Link>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
