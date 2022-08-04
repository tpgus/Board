import { useState, useEffect } from "react";
import PostList from "./components/Board/Posts/PostList";
import Search from "./components/Board/Search/Search";
import { PostType } from "./components/Board/DataType";
import "./App.css";
import axios from "axios";

function App() {
  const [initialPosts, setInitialPosts] = useState<PostType[]>([]); // 초기 데이터 목록이자, 검색을 위한 기준 데이터
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]); // 검색 후 필터링된 데이터
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res.data);
      setInitialPosts(res.data);
      setFilteredPosts(res.data);
      setIsLoading(false);
    });
  }, []);

  function setPosts(posts: PostType[]) {
    setFilteredPosts(posts);
  }

  return (
    <main className="board">
      <Search posts={initialPosts} onSearch={setPosts} />
      {!isLoading && <PostList posts={filteredPosts} />}
      {isLoading && <p className="message">로딩 중...</p>}
    </main>
  );
}

export default App;
