import { useEffect } from "react";
import PostList from "./components/Posts/PostList";
import Search from "./components/Search/Search";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getPost } from "./store/post-slice";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { getStorage } from "./utils/storageUtil";
import { postActions } from "./store/post-slice";
import { useHttp } from "./hooks/use-http";
import { posts } from "./apis/api/post";
import "./App.css";

function App() {
  const post = useAppSelector((state) => state.post);
  const { sendRequest, data, status } = useHttp(posts.getAllPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const posts = getStorage("post");
    if (!posts) {
      sendRequest();
    } else {
      dispatch(postActions.setPost(posts));
    }
  }, [dispatch, sendRequest]);

  if (status === "completed") {
    dispatch(
      postActions.setPost({
        initialPosts: data,
        filteredPosts: data,
        status: "completed",
      })
    );
  }

  return (
    <main className="board">
      <Search />
      {post.status === "completed" && <PostList />}
      {post.status === "pending" && <LoadingSpinner />}
      {post.status === "fail" && <p>데이터를 불러오지 못했습니다.</p>}
    </main>
  );
}

export default App;
