import styles from "./css/Search.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState, useRef } from "react";
import { TbRefresh } from "react-icons/tb";

interface ModalMessageType {
  title: string;
  message: string;
}

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("제목");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modalMessage, setModalMessage] = useState<ModalMessageType | null>(
    null
  );

  function searchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputRef.current!.value.trim().length < 1) {
      //에러
      setModalMessage({
        title: "올바른 값을 입력해 주세요",
        message: "검색어를 한 글자 이상 입력해야 합니다.",
      });
      return;
    }
    setModalMessage(null);
    setSearchValue(inputRef.current!.value);
    inputRef.current!.value = "";
  }

  function modalHandler() {
    inputRef.current!.focus();
    setModalMessage(null);
  }

  function searchOptionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchValue("");
    setSearchOption(event.target.value);
  }

  return (
    <>
      {modalMessage && <Modal {...modalMessage} onCloseModal={modalHandler} />}
      <Card className={styles["search"]}>
        <select onChange={searchOptionHandler} value={searchOption}>
          <option value="제목">제목</option>
          <option value="내용">내용</option>
          <option value="작성자">작성자</option>
        </select>
        <form onSubmit={searchHandler}>
          <input ref={inputRef} type="text" placeholder="검색어를 입력하세요" />
          <Button type="submit">검색</Button>
        </form>
        {searchValue && (
          <div>
            <span>{`${searchOption}`}</span>에서
            <span>{`'${searchValue}'`}</span>를 검색한 결과입니다.
            <TbRefresh className={styles["refresh-icon"]} />
          </div>
        )}
      </Card>
    </>
  );
}

export default Search;
