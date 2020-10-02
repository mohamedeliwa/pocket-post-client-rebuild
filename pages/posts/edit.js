import { useState, useEffect } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import EditorJS from "../../components/editorjsWrapper";
import EditingPostOptions from "../../components/EditingPostOptions";
import WithAuth from "../../components/WithAuth";
import useSWR from "swr";
import ErrorMsg from "../../components/ErrorMsg";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";

const Edit = () => {
  const router = useRouter();
  const [view, setView] = useState("options");
  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((r) => r.json());
  const { data, error } = useSWR(
    `https://pocket-post-server.herokuapp.com/posts/${router.query.id}`,
    fetcher
  );
  const [post, setPost] = useState(data);
  useEffect(() => {
    setPost(data);
  }, [data]);
  const changeView = (value) => {
    if (value === "options" || value === "editor") {
      setView(value);
    }
  };

  return error ? (
    <ErrorMsg msg="Loading Post Info Failed!" />
  ) : !data ? (
    <Spinner />
  ) :  (
    <Container
      className="p-4 rounded-lg"
      style={{ backgroundColor: "#eef5fa" }}
    >
      <Head>
        <title>Pocket-Post</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
        {/* <script src="https://cdn.jsdelivr.net/npm/@editorjs/image@latest"></script> */}
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/marker@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/code@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/inline-code@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/underline@latest"></script>
      </Head>
      {view === "options" ? (
        <EditingPostOptions
          post={data}
          showEditor={changeView}
          setPost={setPost}
        />
      )  : (
        <>
          <h5 className="text-center">Create new Post</h5>

          <EditorJS
            data={JSON.parse(post.content)}
            exitEditor={changeView}
            post={post}
            setPost={setPost}
            mode={"editing"}
          />
        </>
      )}
    </Container>
  );
};

export default WithAuth(Edit);
