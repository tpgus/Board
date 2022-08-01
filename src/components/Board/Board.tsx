import styles from "./css/Board.module.css";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";

interface PostType {
  id: string;
  title: string;
  userId: string;
  body: string;
}
function Board() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data.slice(0, 100)));
  }, []);

  return (
    <main className={styles["board"]}>
      <Search />
      <Posts postList={posts} />
    </main>
  );
}

export default Board;
