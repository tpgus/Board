import styles from "./css/Button.module.css";

interface PropsType {
  children: React.ReactNode;
  className?: string;
  type: "button" | "submit";
  onClick?: () => void; //type이 submit일 경우 없어도 됨
}

function Button(props: PropsType) {
  return (
    <button
      className={`${styles["button"]} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
