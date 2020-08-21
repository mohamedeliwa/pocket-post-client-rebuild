const authorInfo = {
  _id: "5f3bf5f54ceb7008a4684ce8",
  name: "Jhon Deo",
  caption:
    "Love to write and code, yet need to learn more. Feedback always welcome.",
  postsCount: 950,
  likesCount: 500,
};
export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(authorInfo));
};
