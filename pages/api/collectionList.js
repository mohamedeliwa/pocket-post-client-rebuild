const collectionList = [
  {
    name: "Collection 1",
    desc:
      "Collection description, yet need to learn more. Feedback always welcome.",
    postCount: 150,
    likesCount: 150,
  },
  {
    name: "Collection 2",
    desc:
      "Collection description, yet need to learn more. Feedback always welcome.",
    postCount: 160,
    likesCount: 150,
  },
  {
    name: "Collection 3",
    desc:
      "Collection description, yet need to learn more. Feedback always welcome.",
    postCount: 170,
    likesCount: 150,
  },
];

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(collectionList));
};
