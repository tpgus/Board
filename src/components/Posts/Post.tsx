import styles from "./css/Post.module.css";
import Card from "../UI/Card";
import { PostType, CommentType } from "../DataType";
import Button from "../UI/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import CommentList from "../Comment/CommentList";

interface PropsType {
  post: PostType;
  posts: PostType[];
  onClose: () => void;
}

function Post(props: PropsType) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentPost, setCurrentPost] = useState(props.post);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${currentPost.id}/comments`
      )
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
      });
  }, [currentPost.id]);

  function prevButtonHandler() {
    if (currentPostIndex === 0) {
      setPrevButtonDisabled(true);
      return;
    }

    let newCurrentPost = props.posts[currentPostIndex - 1];
    setCurrentPost(newCurrentPost);
    setCurrentPostIndex((currentIndex) => currentIndex - 1);
    setNextButtonDisabled(false);
  }

  function nextButtonHandler() {
    if (currentPostIndex === props.posts.length - 1) {
      setNextButtonDisabled(true);
      return;
    }
    let newCurrentPost = props.posts[currentPostIndex + 1];
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
        {!isLoading && <CommentList comments={comments} />}
        {isLoading && <p>댓글을 불러오는 중입니다...</p>}
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
      </Card>
    </>
  );
}

export default Post;