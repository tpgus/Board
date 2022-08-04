import styles from "./css/Button.module.css";

interface PropsType {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type: "button" | "submit";
  onClick?: () => void; //submit일 경우 없어도 됨.
}

function Button(props: PropsType) {
  return (
    <button
      className={`${styles["button"]} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
