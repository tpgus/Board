import styles from "./css/Button.module.css";

interface PropsType {
  children: React.ReactNode;
  className?: string;
  type: "button" | "submit";
  onClick?: () => void;
}

function Button(props: PropsType) {
  return (
    <button
      type={props.type}
      className={`${styles["button"]} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
