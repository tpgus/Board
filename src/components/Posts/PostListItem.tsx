import styles from "./css/PostListItem.module.css";
import React from "react";
/*
아래와 같이 PropsType에서 바로 PostType으로 인터페이스를 확장하려고 하면
interface PropsType extends PostType {
  ...
}
id, userId, title, body가 따로 들어와 상위 컴포넌트에서 prop으로 {...post}를 해주던지 각각 풀어서 전달해야 한다.

하지만 post라는 이름 하나로 받고 싶었다. (=따로 받아도 상관은 없지만, 결국 이렇게 해야 코드가 조금 더 깔끔해 진다.)
그래서 interface PropsType extend PostType {
  onClick:()=>void
  post:PostType
}
위처럼 해줬는데 이럴 경우 Props에는 아래처럼 6가지가 담겨야 한다.
1.onClick,
2.post:{id,userId,title,body}
3.id
4.userId
5.title
6.body 
따라서 지금의 코드와 같이 따로 타입을 선언해주고, 그것을 확장하는 것이 맞다.
*/
interface Post {
  post: PostType;
}

interface PropsType extends Post {
  onClick: (post: PostType) => void;
}

function PostListItem(props: PropsType) {
  const { id, userId, title } = props.post;
  return (
    <ul>
      <li
        className={styles["post"]}
        onClick={props.onClick.bind(null, props.post)}
      >
        <div>{id}</div>
        <div className={styles["title"]}>{title}</div>
        <div>작성자 {userId}</div>
      </li>
    </ul>
  );
}

export default React.memo(PostListItem);
