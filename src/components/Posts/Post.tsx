import styles from "./css/Post.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useState, useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentList from "../Comment/CommentList";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useHttp } from "../../hooks/use-http";
import { commentAPI } from "../../apis/api/comment";

interface PropsType {
  post: PostType;
  onClose: () => void;
}
function Post(props: PropsType) {
  const [currentPost, setCurrentPost] = useState(props.post);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const { filteredPosts: posts } = useAppSelector((state) => state.post);

  const {
    sendRequest: getCommentsOfPost,
    data: comments,
    error,
    status,
  } = useHttp<CommentType[]>(commentAPI.getCommentsOfPost, []);

  useEffect(() => {
    getCommentsOfPost(currentPost.id);
  }, [currentPost.id, getCommentsOfPost]);

  useEffect(() => {
    let currentIndex = posts.findIndex((post) => post.id === currentPost.id);
    if (currentIndex === 0) {
      setPrevButtonDisabled(true);
    }
    if (currentIndex === posts.length - 1) {
      setNextButtonDisabled(true);
    }
    setCurrentPostIndex(currentIndex);
  }, [posts, currentPost.id]);

  function prevButtonHandler() {
    if (currentPostIndex === 0) {
      setPrevButtonDisabled(true);
      return;
    }

    let newCurrentPost = posts[currentPostIndex - 1];
    setCurrentPost(newCurrentPost);
    setCurrentPostIndex((currentIndex) => currentIndex - 1);
    setNextButtonDisabled(false);
  }

  function nextButtonHandler() {
    if (currentPostIndex === posts.length - 1) {
      setNextButtonDisabled(true);
      return;
    }
    let newCurrentPost = posts[currentPostIndex + 1];
    setCurrentPost(newCurrentPost);
    setCurrentPostIndex((currentIndex) => currentIndex + 1);
    setPrevButtonDisabled(false);
  }

  return (
    <>
      <div className={styles["backdrop"]} onClick={props.onClose}></div>
      <Card className={styles["post-container"]}>
        <div className={styles["content"]}>
          <header className={styles["content-header"]}>
            <h1>{currentPost.title}</h1>
            <div className={styles["author"]}>
              <span>{`작성자 ${currentPost.userId}`}</span>
            </div>
          </header>
          <p className={styles["content-body"]}>{currentPost.body}</p>
        </div>
        {status === "loading" && <LoadingSpinner />}
        {status === "completed" && error && <p>댓글을 불러오지 못했습니다.</p>}
        {status === "completed" && !error && (
          <CommentList comments={comments} />
        )}
        <footer>
          <span>{`${currentPostIndex + 1} / ${posts.length}개의 글`}</span>
          <div className={styles["actions"]}>
            <Button
              type="button"
              onClick={prevButtonHandler}
              className={prevButtonDisabled ? styles["disabled"] : ""}
            >
              이전 글
            </Button>
            <Button
              type="button"
              onClick={nextButtonHandler}
              className={nextButtonDisabled ? styles["disabled"] : ""}
            >
              다음 글
            </Button>
            <Button type="button" onClick={props.onClose}>
              닫기
            </Button>
          </div>
        </footer>
      </Card>
    </>
  );
}

export default Post;
