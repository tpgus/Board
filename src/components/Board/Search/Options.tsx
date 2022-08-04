import styles from "./css/Options.module.css";

interface PropsType {
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Options(props: PropsType) {
  return (
    <select className={styles["options"]} onChange={props.onSelect}>
      <option value="제목">제목</option>
      <option value="내용">내용</option>
      <option value="작성자">작성자</option>
    </select>
  );
}

export default Options;
