import styles from "./css/Post.module.css";
import Card from "../UI/Card";
import { PostType, CommentType } from "../types";
import Button from "../UI/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentList from "../Comment/CommentList";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useHttp } from "../../hooks/use-http";
import { comments } from "../../apis/api/comment";
interface PropsType {
  post: PostType;
  onClose: () => void;
}
type reqFunction = <T>(data?: T) => Promise<T>;
function Post(props: PropsType) {
  // const [comments, setComments] = useState<CommentType[]>([]);
  const [currentPost, setCurrentPost] = useState(props.post);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const { filteredPosts: posts } = useAppSelector((state) => state.post);

  const {
    sendRequest: getComments,
    data: commentsOfPost,
    error,
    status,
  } = useHttp(comments.getCommentsOfPost);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/posts/${currentPost.id}/comments`
  //     )
  //     .then((res) => {
  //       setComments(res.data);
  //       setIsLoading(false);
  //     });
  // }, [currentPost.id]);

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
        {/* {isLoading && <LoadingSpinner />}
        {!isLoading && <CommentList comments={comments} />}
        {!isLoading && comments.length !== 0 && (
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
        )} */}
      </Card>
    </>
  );
}

export default Post;
