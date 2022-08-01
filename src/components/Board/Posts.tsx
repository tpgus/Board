import { useState } from "react";
import styles from "./css/Posts.module.css";
import PostItem from "./PostItem";
import Card from "../UI/Card";
import Pagination from "./Pagination";
import Modal from "../UI/Modal";

interface PostType {
  id: string;
  title: string;
  userId: string;
  body: string;
}

interface PropsType {
  postList: PostType[];
}

interface ModalMessageType {
  title: string;
  message: string;
}

function Posts(props: PropsType) {
  const [modalMessage, setModalMessage] = useState<ModalMessageType | null>(
    null
  );
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * postsPerPage;

  const totalPosts = props.postList
    .slice(offset, offset + postsPerPage)
    .map((post) => <PostItem key={post.id} {...post} />);

  function setPage(page: number) {
    if (page === 0) {
      setModalMessage({
        title: "페이지를 이동할 수 없습니다.",
        message: "첫 페이지 입니다.",
      });
      return;
    } else if (page === Math.ceil(props.postList.length / postsPerPage) + 1) {
      setModalMessage({
        title: "페이지를 이동할 수 없습니다.",
        message: "마지막 페이지 입니다.",
      });
      return;
    }
    setCurrentPage(page);
  }

  function closeModal() {
    setModalMessage(null);
  }

  return (
    <>
      {modalMessage && <Modal {...modalMessage} onCloseModal={closeModal} />}
      <Card className={styles["posts"]}>
        <div className={styles["label"]}>
          <span>번호</span>
          <span>제목</span>
          <span>글쓴이</span>
        </div>

        {totalPosts.length > 0 ? (
          <>
            <ul>{totalPosts}</ul>
            <Pagination
              totalPosts={props.postList.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              onClickPage={setPage}
            />
          </>
        ) : (
          <p>글이 존재하지 않습니다.</p>
        )}
      </Card>
    </>
  );
}

export default Posts;
