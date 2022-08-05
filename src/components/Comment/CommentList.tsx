import { CommentType } from "../DataType";
import styles from "./css/CommentList.module.css";
import { FaRegCommentDots } from "react-icons/fa";
interface PropsType {
  comments: CommentType[];
}

function Comments(props: PropsType) {
  return (
    <ul className={styles["comment-list"]}>
      <p>
        <FaRegCommentDots className={styles["comment-icon"]} />

        <span
          className={styles["comment-count"]}
        >{` Comments (${props.comments.length})`}</span>
      </p>
      {props.comments.map((comment) => (
        <li key={comment.id} className={styles["comment"]}>
          <img
            className={styles["comment-profile"]}
            src="https://static.nid.naver.com/images/web/user/default.png?type=s40"
            alt="profile"
          />
          <div className={styles["comment-content"]}>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
            <div>
              <span>{comment.email}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Comments;
