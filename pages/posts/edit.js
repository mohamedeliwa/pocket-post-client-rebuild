import { useState } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import EditorJS from "../../components/editorjsWrapper";
import NewPageOptions from "../../components/NewPageOptions";
import WithAuth from "../../components/WithAuth";

const Edit = () => {
  const [view, setView] = useState("options");

  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    series: "",
    tags: [],
    content: "hello world",
  });
  console.log("New: ", post);
  const changeView = (value) => {
    if (value === "options" || value === "editor") {
      setView(value);
    }
  };

  return (
    <Container
      className="p-4 rounded-lg"
      style={{ backgroundColor: "#eef5fa" }}
    >
      <Head>
        <title>Pocket-Posta</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/image@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/marker@latest"></script>
      </Head>
      {view === "options" ? (
        <NewPageOptions showEditor={changeView} post={post} setPost={setPost} />
      ) : (
        <>
          <h5 className="text-center">Create new Post</h5>

          <EditorJS
            data={x}
            exitEditor={changeView}
            post={post}
            setPost={setPost}
          />
        </>
      )}
    </Container>
  );
};

export default WithAuth(Edit);
