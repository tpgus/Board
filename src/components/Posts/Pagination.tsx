import styles from "./css/Pagination.module.css";
import Button from "../UI/Button";

interface PropsType {
  postsLength: number;
  postsPerPage: number;
  currentPage: number;
  onClickPage: (page: number) => void;
}

function Pagination(props: PropsType) {
  let totalPages = Math.ceil(props.postsLength / props.postsPerPage);
  let numOfPages = new Array(totalPages).fill(null);
  numOfPages = numOfPages.map((_, index) => index + 1);

  const prevButton = (
    <Button
      type="button"
      className={`${styles["btn"]} ${styles["prev"]}`}
      onClick={props.onClickPage.bind(null, props.currentPage - 1)}
    >
      &lt;
    </Button>
  );

  const nextButton = (
    <Button
      type="button"
      className={`${styles["btn"]} ${styles["next"]}`}
      onClick={props.onClickPage.bind(null, props.currentPage + 1)}
    >
      &gt;
    </Button>
  );

  const buttons = numOfPages.map((pageNumber) => (
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
  ));

  return (
    <nav className={styles["buttons"]}>
      {prevButton}
      {buttons}
      {nextButton}
    </nav>
  );
}

export default Pagination;
