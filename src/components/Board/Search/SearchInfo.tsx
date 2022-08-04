import { TbRefresh } from "react-icons/tb";
import styles from "./css/SearchInfo.module.css";

interface PropsType {
  option: string;
  value: string;
  onReset: () => void;
}

function SearchInfo(props: PropsType) {
  return (
    <>
      {props.value && (
        <div className={styles["search-info"]}>
          <span>{`${props.option} `}</span>
          에서
          <span>{` '${props.value}'`}</span>
          을(를) 검색한 결과입니다.
          <TbRefresh
            className={styles["refresh-icon"]}
            onClick={props.onReset}
            size={20}
          />
        </div>
      )}
    </>
  );
}

export default SearchInfo;
