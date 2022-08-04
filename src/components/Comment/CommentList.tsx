import { CommentType } from "../DataType";
import styles from "./css/CommentList.module.css";
import { BsArrowReturnRight } from "react-icons/bs";

interface PropsType {
  comments: CommentType[];
}

function Comments(props: PropsType) {
  return (
    <ul className={styles["comment-list"]}>
      <p className={styles["comment-count"]}>
        <BsArrowReturnRight />
        {` ${props.comments.length}개`}의 댓글
      </p>
      {props.comments.map((comment) => (
        <li key={comment.id} className={styles["comment"]}>
          <img
            className={styles["comment-profile"]}
            src="https://static.nid.naver.com/images/web/user/default.png?type=s40"
            alt="profile"
          />
          <div className={styles["comment-body"]}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
