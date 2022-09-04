import { useEffect } from "react";
import PostList from "./components/Posts/PostList";
import Search from "./components/Search/Search";
import { useAppDispatch } from "./hooks/redux-hooks";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { getStorage } from "./utils/storageUtil";
import { postActions } from "./store/post-slice";
import { useHttp } from "./hooks/use-http";
import { postAPI } from "./apis/api/post";
import "./App.css";
import { PostType } from "./components/types";

function App() {
  const dispatch = useAppDispatch();
  const {
    sendRequest: getAllPosts,
    data,
    isLoading,
    error,
  } = useHttp<PostType>(postAPI.getAllPosts);

  useEffect(() => {
    const posts = getStorage("post");
    if (!posts) {
      getAllPosts();
    } else {
      dispatch(postActions.setPost(posts));
    }
  }, [dispatch, getAllPosts]);

  if (data && !isLoading) {
    dispatch(
      postActions.setPost({
        filteredPosts: data,
        initialPosts: data,
      })
    );
  }

  return (
    <main className="board">
      <Search />
      {!isLoading && error && <p>데이터를 불러오지 못했습니다.</p>}
      {!isLoading && !error && <PostList />}
      {isLoading && <LoadingSpinner />}
    </main>
  );
}

export default App;
