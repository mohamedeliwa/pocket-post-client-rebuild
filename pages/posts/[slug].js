import Head from "next/head";
import SidebarWidgets from "../../components/SidebarWidgets";
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
          <Col md={12} lg={8}>
            <PostContent post={props.post}/>
          </Col>

          <Col md={12} lg={4}>
            <SidebarWidgets authorImage={props.post.author.picture}/>
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
    date: "2020-05-03",
    slug: "welcome",
    author: /*params.slug*/{name: "Jhon Deo", picture: "/blog/authors/jj.jpeg"},
    coverImage: "/blog/hello-world/cover.jpg",
    excerpt: "lorem ispum asd asdkjaljkdcnl ljknsda",
    contnt : "<h1>Hello</h1>"
  }
  const content = {
    time: 1564767102436,
    blocks: [
      {
        type: "header",
        data: {
          level: 4,
          text: "Editor.js React Renderer",
        },
      },
      {
        type: "image",
        data: {
          file: {
            url:
              "https://cdn3.bbcode0.com/uploads/2020/6/5/d39631e45eeb95b3c3f54bf18b07478d-full.jpg",
          },
          caption: "Test Caption",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        type: "embed",
        data: {
          service: "coub",
          source: "https://coub.com/view/1czcdf",
          embed: "https://coub.com/embed/1czcdf",
          width: 580,
          height: 320,
          caption: "My Life",
        },
      },
      {
        type: "paragraph",
        data: {
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum.",
        },
      },
      {
        type: "quote",
        data: {
          text:
            '&nbsp;<b>Lorem</b>&nbsp; ipsum dolor sit amet <mark class="cdx-marker">consectetur</mark> adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum.',
          caption: "Anonymous",
          alignment: "left",
        },
      },
      {
        type: "table",
        data: {
          content: [
            ["Name", "Age", "Position", "SSN"],
            [
              "Jack&nbsp;",
              "<strong>51</strong>",
              "All trades",
              "654654414131333",
            ],
            [
              "John Doe",
              "<strong>32</strong>",
              "Senior Consultant",
              "0002145465145641",
            ],
          ],
        },
      },
      {
        type: "warning",
        data: {
          message: "This is a warning!",
        },
      },
      {
        type: "list",
        data: {
          items: ["<i>Item one</i>", "Another item", "<strong>Item 3</strong>"],
          style: "ordered",
        },
      },
      {
        type: "checklist",
        data: {
          items: [
            {
              text: "Gather requirements",
              checked: true,
            },
            {
              text: "Develop API",
              checked: true,
            },
            {
              text: "Notify stakeholders",
              checked: false,
            },
          ],
        },
      },
      {
        type: "delimiter",
        data: {},
      },
    ],
    version: "2.14.0",
  };

  // const content = `
  // <h1>Hello</h1>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // <p>You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</p>
  // `
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
