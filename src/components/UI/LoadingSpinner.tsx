import styles from "./css/LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <>
      <div className={"centered " + styles["spinner"]}></div>
      <p className={styles["loading"]}>Loading...</p>
    </>
  );
};

export default LoadingSpinner;
