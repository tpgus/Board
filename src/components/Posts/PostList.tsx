import { useState, useEffect, useCallback } from "react";
import styles from "./css/PostList.module.css";
import { PostType, ModalMessageType } from "../DataType";
import PostListItem from "./PostListItem";
import AlertModal from "../UI/AlertModal";
import Card from "../UI/Card";
import Post from "./Post";
import Pagination from "./Pagination";

interface PropsType {
  posts: PostType[];
}

function PostList(props: PropsType) {
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMessage, setModalMessage] = useState<ModalMessageType | null>(
    null
  );
  const [clickedPost, setClickedPost] = useState<PostType | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.posts]);

  const clickPost = useCallback(function (post: PostType) {
    document.body.style.overflow = "hidden";
    setClickedPost({ ...post });
  }, []);

  const offset = (currentPage - 1) * postsPerPage;

  const posts = props.posts
    .slice(offset, offset + postsPerPage)
    .map((post) => (
      <PostListItem key={post.id} post={post} onClick={clickPost} />
    ));

  const pageChangeHandler = useCallback(
    function (pageNumber: number) {
      if (pageNumber === 0) {
        setModalMessage({
          title: "페이지를 이동할 수 없습니다.",
          message: "첫 페이지 입니다.",
        });
        return;
      }
      if (pageNumber === Math.ceil(props.posts.length / postsPerPage) + 1) {
        setModalMessage({
          title: "페이지를 이동할 수 없습니다.",
          message: "마지막 페이지 입니다.",
        });
        return;
      }
      setCurrentPage(pageNumber);
    },
    [props.posts.length, postsPerPage]
  );

  function closePost() {
    document.body.style.overflow = "auto";
    setClickedPost(null);
    setModalMessage(null);
  }

  return (
    <>
      {modalMessage && <AlertModal onClose={closePost} {...modalMessage} />}
      {clickedPost && (
        <Post onClose={closePost} post={clickedPost} posts={props.posts} />
      )}
      <Card className={styles["posts"]}>
        <span>
          총
          <span
            className={styles["posts-count"]}
          >{` ${props.posts.length}`}</span>
          개의 글이 있습니다.
        </span>
        <div className={styles["label"]}>
          <span>번호</span>
          <span>제목</span>
          <span>글쓴이</span>
        </div>
        {posts.length > 0 && (
          <>
            {posts}
            <Pagination
              postsLength={props.posts.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              onClickPage={pageChangeHandler}
            />
          </>
        )}
        {posts.length === 0 && <p>글이 존재하지 않습니다.</p>}
      </Card>
    </>
  );
}
export default PostList;
