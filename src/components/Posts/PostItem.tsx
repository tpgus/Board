import styles from "./css/PostItem.module.css";
import { PostType } from "./DataType";

function PostItem(props: PostType) {
  return (
    <li className={styles["post"]}>
      <div>{props.id}</div>
      <div className={styles["title"]}>{props.title}</div>
      <div>작성자 {props.userId}</div>
    </li>
  );
}

export default PostItem;
