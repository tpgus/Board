import styles from "./css/Search.module.css";
import React, { useState, useRef } from "react";
import { PostType, ModalMessageType } from "../DataType";
import AlertModal from "../UI/AlertModal";
import Button from "../UI/Button";
import Card from "../UI/Card";
import SearchInfo from "./SearchInfo";
import Options from "./Options";

interface PropsType {
  onSearch: (posts: PostType[]) => void;
  posts: PostType[];
}

function Search(props: PropsType) {
  const [modalMessage, setModalMessage] = useState<ModalMessageType | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("제목");

  function selectOptionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchOption(event.target.value);
    setSearchValue("");
  }

  function getResultOfSearch(option: string, value: string) {
    let result = props.posts;
    //정규식 사용하기
    const searchValue = new RegExp(`${value}`, "i");
    switch (option) {
      case "제목":
        result = props.posts.filter((post) => searchValue.test(post.title));
        break;

      case "내용":
        result = props.posts.filter((post) => searchValue.test(post.body));
        break;

      case "작성자":
        result = props.posts.filter((post) =>
          searchValue.test("작성자 " + post.userId)
        );
        break;

      default:
        break;
    }
    return result;
  }

  function searchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputRef.current!.value.trim().length < 1) {
      setModalMessage({
        title: "올바른 값을 입력해 주세요",
        message: "검색어를 한 글자 이상 입력해야 합니다.",
      });
      return;
    }
    setSearchValue(inputRef.current!.value);
    const resultOfSearch = getResultOfSearch(
      searchOption,
      inputRef.current!.value
    );
    props.onSearch(resultOfSearch);
    inputRef.current!.value = "";
  }

  function resetHandler() {
    setSearchValue("");
    props.onSearch(props.posts.slice());
  }

  function closeModal() {
    setModalMessage(null);
  }

  return (
    <>
      {modalMessage && <AlertModal onClose={closeModal} {...modalMessage} />}
      <Card className={styles["search"]}>
        <Options onSelect={selectOptionHandler} />
        <form onSubmit={searchHandler}>
          <input ref={inputRef} type="text" placeholder="검색어를 입력하세요" />
          <Button className={styles["btn-search"]} type="submit">
            검색
          </Button>
        </form>
        <SearchInfo
          option={searchOption}
          value={searchValue}
          onReset={resetHandler}
        />
      </Card>
    </>
  );
}
export default Search;
