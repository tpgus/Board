import { useState } from "react";
import styles from "./css/Posts.module.css";
import PostItem from "./PostItem";
import Card from "../UI/Card";
import Pagination from "./Pagination";

interface PostType {
  id: string;
  title: string;
  userId: string;
  body: string;
}

interface PropsType {
  postList: PostType[];
}

function Posts(props: PropsType) {
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const offset = (pageNumber - 1) * postsPerPage;

  const postList = props.postList
    .slice(offset, offset + postsPerPage)
    .map((post) => <PostItem key={post.id} {...post} />);

  return (
    <Card className={styles["Posts"]}>
      <div className={styles["label"]}>
        <span>번호</span>
        <span>제목</span>
        <span>글쓴이</span>
      </div>
      {postList.length > 0 ? (
        <ul>{postList}</ul>
      ) : (
        <p>글이 존재하지 않습니다.</p>
      )}
      <Pagination
        totalPosts={props.postList.length}
        postsPerPage={postsPerPage}
        currentPage={pageNumber}
      />
    </Card>
  );
}

export default Posts;
