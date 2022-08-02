import styles from "./css/Card.module.css";

interface PropsType {
  children: React.ReactNode;
  className?: string;
}

function Card(props: PropsType) {
  return (
    <div className={`${styles["card"]} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
