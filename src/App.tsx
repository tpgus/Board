import { useEffect } from "react";
import PostList from "./components/Posts/PostList";
import Search from "./components/Search/Search";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { getStorage } from "./utils/storageUtil";
import { postActions } from "./store/post-slice";
import { useHttp } from "./hooks/use-http";
import { postAPI } from "./apis/api/post";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const {
    sendRequest: getAllPosts,
    data,
    status,
    error,
  } = useHttp<PostType[]>(postAPI.getAllPosts, []);
  const posts = useAppSelector((state) => state.post);

  useEffect(() => {
    const posts = getStorage("post");
    if (!posts) {
      getAllPosts();
    } else {
      dispatch(postActions.setPost(posts));
    }
  }, [dispatch, getAllPosts]);

  if (data && !error && status === "completed") {
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
      {status === "completed" && error && <p>{error}</p>}
      {/* 로컬 스토리지에 데이터가 없다면, 새로운 요청을 한다. 즉 데이터를 가져올 때 http 요청 또는 로컬 스토리지를 이용한다.
      따라서 status==='completed && !error 조건만으로 <PostList/>를 렌더링할 때에는 로컬스토리지에 이미 데이터가 있을 경우, 
      렌더링 되지 않는다. status와 error 변수는 http 요청과 관련된 상태이기 때문에, 
      따라서 로컬 스토리지에서 받아올 경우 스토어에 데이터를 저장하므로, 이때를 위해
      스토어의 posts를 따로 조건으로 넣어준다 */}
      {((status === "completed" && !error) || posts) && <PostList />}
      {status === "loading" && <LoadingSpinner />}
    </main>
  );
}

export default App;
