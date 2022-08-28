import { useEffect, useState } from "react";
import PostList from "./components/Posts/PostList";
import Search from "./components/Search/Search";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getPost } from "./store/post-slice";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { getStorage } from "./utils/storageUtil";
import { postActions } from "./store/post-slice";
import "./App.css";

function App() {
  const post = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const posts = getStorage("post");
    if (Object.keys(posts).length === 0) {
      dispatch(getPost());
    } else {
      dispatch(postActions.setPost(posts));
    }
  }, [dispatch]);

  return (
    <main className="board">
      <Search />
      {post.status === "complete" && <PostList />}
      {post.status === "loading" && <LoadingSpinner />}
      {post.status === "fail" && <p>데이터를 불러오지 못했습니다.</p>}
    </main>
  );
}

export default App;
