import { useEffect } from "react";
import PostList from "./components/Posts/PostList";
import Search from "./components/Search/Search";
import { PostType } from "./components/DataType";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { getPost, postActions } from "./store/post-slice";
import "./App.css";

function App() {
  const post = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <main className="board">
      <Search />
      {post.status === "complete" && <PostList />}
      {post.status === "loading" && <p className="message">로딩 중...</p>}
      {post.status === "fail" && <p>데이터를 불러오지 못했습니다.</p>}
    </main>
  );
}

export default App;
