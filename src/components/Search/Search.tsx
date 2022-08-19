import styles from "./css/Search.module.css";
import React, { useState, useRef } from "react";
import { ModalMessageType } from "../DataType";
import AlertModal from "../UI/AlertModal";
import Button from "../UI/Button";
import Card from "../UI/Card";
import SearchInfo from "./SearchInfo";
import Options from "./Options";
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks";
import { postActions } from "../../store/post-slice";

type OptionType = "제목" | "내용" | "작성자";

function Search() {
  const [modalMessage, setModalMessage] = useState<ModalMessageType | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState<OptionType>("제목");
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.post);

  function selectOptionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    if (
      event.target.value === "제목" ||
      event.target.value === "내용" ||
      event.target.value === "작성자"
    ) {
      setSearchOption(event.target.value);
      setSearchValue("");
    }
  }

  function getResultOfSearch(option: OptionType, value: string) {
    let result = post.initialPosts;
    //정규식 사용하기
    const searchValue = new RegExp(`${value}`, "i");
    switch (option) {
      case "제목":
        result = post.initialPosts.filter((post) =>
          searchValue.test(post.title)
        );
        break;

      case "내용":
        result = post.initialPosts.filter((post) =>
          searchValue.test(post.body)
        );
        break;

      case "작성자":
        result = post.initialPosts.filter((post) =>
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
    dispatch(postActions.search(resultOfSearch));
    inputRef.current!.value = "";
  }

  function resetHandler() {
    setSearchValue("");
    dispatch(postActions.search(post.initialPosts));
  }

  function closeModal() {
    setModalMessage(null);
    inputRef.current!.focus();
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
