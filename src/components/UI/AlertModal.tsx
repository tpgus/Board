import styles from "./css/AlertModal.module.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";

interface PropsType {
  title: string;
  message: string;
  onClose: () => void;
}

function AlertModal(props: PropsType) {
  const portalElement = document.getElementById("overlay-root");
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles["backdrop"]} onClick={props.onClose}></div>,
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
            <Button
              className={styles["close-btn"]}
              type="button"
              onClick={props.onClose}
            >
              닫기
            </Button>
          </footer>
        </Card>,
        portalElement!
      )}
    </>
  );
}

export default AlertModal;
