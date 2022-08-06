<details>
<summary>과제에 대한 소개</summary>
<div markdown="1">

  ---
  
 - 게시물 리스트와 게시물 상세 정보를 확인할 수 있는 게시판 형태의 웹 서비스입니다.<br>
 - 데이터는 무료 목업 API인 JSON Placeholder을 활용했습니다.<br>
 - 많은 기능을 가진 프로젝트 보다는 에러가 없는 프로젝트를 구현하고자 했습니다.<br>
 - TypeScript로 구현하였습니다.<br>
 - 컴포넌트 구조
  ![스크린샷, 2022-08-05 13-03-54](https://user-images.githubusercontent.com/43470398/182999279-af5ac1cc-a592-469b-90bb-43bb41c0fd54.png)
  
</div>
</details>

---

<details>
<summary>구현 화면 GIF 및 배포 링크</summary>
<div markdown="1">

<ul>
<li>

[배포 링크](https://tpgus.github.io/) 
</li>

<details>
<summary>게시판 메인 화면</summary>
<div markdown="1">

![ezgif com-gif-maker](https://user-images.githubusercontent.com/43470398/182990948-07d119da-ccce-463e-8f57-902da7a4d9d7.gif)

</div>
</details>

<details>
<summary>검색 기능</summary>
<div markdown="1">

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/43470398/182903645-86d5c4dc-5ab7-4b5e-b00b-c8d804683b1a.gif)
</div>
</details>


<details>
<summary>게시물 상세 및 댓글 리스트</summary>
<div markdown="1">
  
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/43470398/182991414-3e00a622-4896-43d1-8988-bae2c340dbe0.gif)

</div>
</details>

<details>
<summary>모달</summary>
<div markdown="1">

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/43470398/182912263-15a01a84-c790-4f7a-a650-50f986766d9a.gif)

</div>
</details>

</ul>


</div>
</details>

---

<details>
<summary>프로젝트 실행 방법</summary>
<div markdown="1">

`npm install` → `npm start`
  
</div>
</details>

---

<details>
<summary>사용한 스택 목록</summary>
<div markdown="1">
  
  - React
  - Typecript
  - CSS module
  
  
</div>
</details>

---

<details>
<summary>구현한 기능 목록 (Software Requirement Specification)</summary>
<div markdown="1">

  - 게시물 리스트 
  - 게시물 상세 페이지
  - 댓글 리스트
  
</div>
</details>

---

<details>
<summary>추가 구현 사항 및 구현 방법</summary>
<div markdown="1">
  
  - [페이지네이션 구현에 대한 설명](https://velog.io/@tpgus758/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84)

- [검색 기능 구현에 대한 설명](https://velog.io/@tpgus758/%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
  
 </div>
</details>

---

<details>
<summary>구현 방법 혹은 구현하면서 어려웠던 점</summary>
<div markdown="1">
<br>

- **컴포넌트의 구조를 설계하는 것에 대한 어려움**<br>
간단한 프로젝트임에도 막상 코드를 작성하다 보면 컴포넌트 코드가 길어지고, 하나의 컴포넌트가 다양한 역할을 수행하는 경우가 있었습니다.<br>
각각의 역할이 '분명'하다면, 역할에 따라 컴포넌트를 분리하는 것이 맞겠지만, 각각의 역할을 하나의 역할로 여기고 하나의 컴포넌트로 설계해도 구현하는 데에는 문제는 없었기에 
컴포넌트 구조를 설계하는 것이 더 까다로웠다고 생각합니다.<br>
예를 들면, 검색 기능 구현을 위해서 한 개의 `Search` 컴포넌트로 구성할지
아니면 전체적인 검색 로직을 담당하는 `Search` 컴포넌트와, 옵션 선택을 담당하는 `Options` 컴포넌트, 검색 정보에 대한 `SearchInfo` 컴포넌트로 분리할지에 대한 고민이었습니다.<br>
결과적으로 저는 각각의 역할에 따라 컴포넌트를 분리하는 것이 큰 문제가 없다고 판단했고, 코드를 조금 더 깔끔하게 작성할 수 있다고 생각했기 때문에 검색을 위한 컴포넌트를
`Search`, `Options`, `SearchInfo` 컴포넌트로 분리했습니다.

- **복잡한 상태관리를 위한 `useReducer` 사용에 대한 고민**<br>
`useReducer` 사용을 가장 고민했을 때에는 현재 게시물을 기준으로 앞, 뒤로 이동하는 로직을 작성할 때였습니다.<br>
현재 게시물을 기억하고 위치(인덱스)에 따라서 이전 게시물 또는 다음 게시물을 불러오기, 위치에 따른 버튼 비활성 등 다른 기능들에 비해 조금은 복합적인 상태를 관리해야 했습니다.<br>
처음에 `useState` 훅만으로 상태를 관리했을 때에는 불완전한 상태 변경으로 인해 기능이 완벽히 동작하지 않았습니다.<br>
이때, `useReducer`는 `useState`보다 복잡한 상태를 관리할 수 있다는 장점이 있기 때문에 `useState`의 대안으로 `useReducer`의 사용을 고려해 보았지만,
과연 이 문제가 `useReducer`을 사용해야만 해결되는 문제일까라는 고민을 하게되었습니다.<br>
`useReducer`가 `useState` 훅과 같이 간단히 사용할 수 있다면 언제든 바로 사용했겠지만, 리듀서 함수를 작성하고, 액션을 `dispatch`하는 등의 다소 귀찮은 작업들이 필요했기 때문입니다.<br>
현재의 기능이 다른 기능들을 구현하는 것 보다 조금은 다양한 상태가 필요했지만, 저는 `useState`로도 충분히 상태를 관리할 수 있다고 판단했고
지속적인 디버깅을 통해 처음 코드에서 한 두 줄의 코드를 수정함으로써 결과적으로는 `useState`만으로도 상태를 충분히 관리할 수 있게 되었습니다.

- **전역적으로 상태를 관리하기 위한 `useContext` 훅의 사용에 대한 고민**<br>
프로젝트를 시작할 때 만약, `useContext` 훅을 사용한다면, 컨텍스트는 게시물에 대한 정보일 것이라고 생각했습니다.<br>
하지만, 결과적으로 간단한 프로젝트 였기 때문에, 컴포넌트의 구조가 단순했고, 하위 컴포넌트에게 prop을 전달하는 것만으로도 상태를 관리하는 데에는 문제가 없었습니다.<br>
그럼에도 현재의 프로젝트에서 `useContext`를 사용했다면 조금은 더 편하게 상태를 관리할 수 있지 않았을까라는 아쉬움이 남아 있습니다.
만약, 과제의 요구사항이 더 있었다면 `useContext` 훅을 통해 게시물의 상태를 관리를 했을 것 같습니다.
 </div>
</details>

---

<details>
<summary>와이어프레임</summary>
<div markdown="1">

![스크린샷, 2022-08-05 12-39-11](https://user-images.githubusercontent.com/43470398/182996666-b89f00c1-7930-4a58-80cc-e34c5c528e0a.png)

![스크린샷, 2022-08-05 12-39-41](https://user-images.githubusercontent.com/43470398/182996760-abd711da-2f89-4762-b49e-31fa9bdd5639.png)

 </div>
</details>

---

<details>
<summary>성능 최적화에 대해서 고민하고 개선한 방법</summary>
<div markdown="1">

 </div>
</details>

