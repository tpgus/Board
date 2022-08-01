import Button from "../UI/Button";
import styles from "./Pagination.module.css";
interface PropsType {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
}

function Pagination(props: PropsType) {
  const totalPages = Math.ceil(props.totalPosts / props.postsPerPage);
  let totalButtons = new Array(totalPages).fill(null);
  totalButtons = totalButtons.map((_, index) => index + 1);
  return (
    <div className={styles["buttons"]}>
      {totalButtons.map((pageNumber) => (
        <Button className={styles["pageBtn"]} type="button">
          {pageNumber}
        </Button>
      ))}
    </div>
  );
}

export default Pagination;
