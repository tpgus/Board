import { useState, useEffect } from "react";
import PostList from "./components/Posts/PostList";
import Search from "./components/Search/Search";
import { PostType } from "./components/Posts/DataType";
import "./App.css";
import axios from "axios";

function App() {
  const [initialPosts, setInitialPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
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
      {isLoading && <p>로딩 중...</p>}
    </main>
  );
}

export default App;
