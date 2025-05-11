# `RTK Query`

> Redux Toolkit(RTK) 안에 내장된 “비동기 서버 통신” 전용 기능<br/>
> API 요청(서버통신)을 매우 간단하고, 빠르고, 최적화된 방식으로 처리할 수 있게 해주는 도구이다.

## `RTK`의 단점

- 매 요청마다 pending/fulfilled/rejected 다 관리해야 하고,
- 상태(state) 직접 만들고, 업데이트도 직접 해야한다.
- 코드가 많고 복잡하다.

<br/>

💡 **RTK Query**가 이 문제를 해결한다.

- 비동기 로직을 거의 “0줄”로 작성
- 캐싱, 리페칭, 로딩 상태, 에러 상태 전부 **자동 관리**
- 성능 최적화(메모이제이션, 자동 업데이트)까지 기본 제공

## `RTK Query`의 사용해야하는 상황

> API 서버와 통신할 일이 많을 때

- 목록 불러오기 (fetch list)
- 글쓰기/수정/삭제 (post/patch/delete)
- 검색 기능
- 무한 스크롤
- 채팅/라이브 데이터

<br/>

### RTK Query 기본 구조 흐름

---

**`createAPI` 만들기**

1. **API Service 파일**을 만든다. (RTK Query가 제공하는 `createApi` 사용)
2. 컴포넌트 안에서는 **자동 생성된 훅**을 사용해서 데이터 가져온다.

<br/>

**함수의 역할**

| 함수           | 역할                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| createApi      | RTK Query에서 API 서비스를 정의하는 함수. 서버 요청을 쉽게 관리할 수 있게 해준다. |
| fetchBaseQuery | 기본적인 서버 요청(fetch)을 설정하는 함수. 예를 들면, baseURL 설정 등에 사용      |

<br/>

**`createApi` 안에 들어간 설정**

| 옵션명      | 역할                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| reducerPath | 이 API 서비스가 store에 등록될 때 사용할 이름(별칭). 보통 “xxxApi”처럼 짓는다.                  |
| baseQuery   | 서버랑 통신할 때 사용할 기본 설정(fetch 설정). baseUrl 지정 후 endpoint는 상대 경로만 사용 가능 |
| endpoints   | 실제로 사용할 요청들(엔드포인트)을 정의하는 부분. (GET, POST, PUT 등)                           |

<br/>

**`endpoints` 내부 코드**

> `builder`라는 도구를 이용해 `GET, POST`요청을 정의

- `GET`을 할 때에 넘겨지는 query 함수는 요청 경로(엔드포인트)를 리턴하는 함수
- `POST`를 할 때에 넘겨지는 newTodo는 함수에 넘기는 파라미터<br/>
  (새로 추가할 Todo 객체)

| 이름             | 역할                                                  |
| ---------------- | ----------------------------------------------------- |
| builder.query    | 읽기(GET) 요청을 정의할 때 사용                       |
| builder.mutation | 쓰기/수정/삭제(POST/PUT/DELETE) 요청을 정의할 때 사용 |

<br/>

**`createApi`** : `RTK Query`가 자동으로 React용 훅

- 주의할 점
  - query로 만든 건 → useXXXQuery
  - mutation으로 만든 건 → useXXXMutation

| 훅 이름            | 역할                                    |
| ------------------ | --------------------------------------- |
| useGetTodosQuery   | 서버에서 “todos” 목록을 GET 요청하는 훅 |
| useAddTodoMutation | 서버에 새로운 todo를 POST 요청하는 훅   |

- `createApi` 를 호출하면 내부적으로 `reducer, endpoint, middleware` 를 자동으로 생성한다.
- 즉, 만든 `todosApi.reducer & todosApi.middleware` **모두 `store` 에 직접 추가**해줘야 한다.

<br/>

---

**`store` 연결**

| 등록 항목                                | 이유                                                          |
| ---------------------------------------- | ------------------------------------------------------------- |
| [todosApi.reducerPath]: todosApi.reducer | 요청 결과를 전역 상태로 관리하기 위해                         |
| .concat(todosApi.middleware)             | 요청 lifecycle(start, success, error 등)을 자동 관리하기 위해 |

<br/>

---

**만든 hook을 컴포넌트에 적용**

- **`TodoInput.jsx`** : RTK Query의 `useAddTodoMutation` 훅 사용해서 Todo 추가
- **`TodoList.jsx`** : RTK Query의 `useGetTodosQuery` 훅 사용해서 Todo 목록 가져오기
