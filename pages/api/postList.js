const postsList = [
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

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(postsList));
};
