import styles from "./css/Modal.module.css";
import Card from "./Card";
import Button from "./Button";
import ReactDOM from "react-dom";

interface PropsType {
  title: string;
  message: string;
  onCloseModal: () => void;
}

function Modal(props: PropsType) {
  const portalElement = document.getElementById("overlay-root");

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles["backdrop"]} onClick={props.onCloseModal}></div>,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <Card className={styles["modal"]}>
          <header className={styles["header"]}>
            <h2>{props.title}</h2>
          </header>
          <div className={styles["content"]}>
            <p>{props.message}</p>
          </div>
          <footer className={styles["action"]}>
            <Button type="button" onClick={props.onCloseModal}>
              닫기
            </Button>
          </footer>
        </Card>,
        portalElement!
      )}
    </>
  );
}

export default Modal;
