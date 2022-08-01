import styles from "./css/PostItem.module.css";

interface PropsType {
  id: string;
  title: string;
  body: string;
  userId: string;
}

function PostItem(props: PropsType) {
  return (
    <li className={styles["post"]}>
      <div>{props.id}</div>
      <div className={styles["title"]}>{props.title}</div>
      <div>작성자 {props.userId}</div>
    </li>
  );
}

export default PostItem;
