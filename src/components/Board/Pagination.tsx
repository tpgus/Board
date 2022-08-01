import Button from "../UI/Button";
import styles from "./Pagination.module.css";

interface PropsType {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  onClickPage: (page: number) => void;
}

function Pagination(props: PropsType) {
  const numOfPages = Math.ceil(props.totalPosts / props.postsPerPage);
  let totalButtons = new Array(numOfPages).fill(null);
  totalButtons = totalButtons.map((_, index) => index + 1);

  return (
    <nav className={styles["buttons"]}>
      <Button
        type="button"
        className={`${styles["btn"]} ${styles["left"]}`}
        onClick={props.onClickPage.bind(null, props.currentPage - 1)}
        // disabled={props.currentPage === 1}
      >
        &lt;
      </Button>
      {totalButtons.map((pageNumber) => (
        <Button
          key={pageNumber}
          className={`${styles["btn"]} ${
            props.currentPage === pageNumber && styles["focus"]
          }`}
          type="button"
          onClick={props.onClickPage.bind(null, pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        type="button"
        className={`${styles["btn"]} ${styles["right"]}`}
        onClick={props.onClickPage.bind(null, props.currentPage + 1)}
        // disabled={props.currentPage === numOfPages}
      >
        &gt;
      </Button>
    </nav>
  );
}

export default Pagination;
