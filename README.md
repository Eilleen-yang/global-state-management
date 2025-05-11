# 전역상태관리 라이브러리 종류

## `recoil`

> 라이브러리 개념

- `React`의 `useState`처럼 다루지만, 전역 상태처럼 공유 가능하다.
- 상태를 `atom`단위로 나누고, 여러 컴포넌트에서 이 `atom`을 구독할 수 있다.

> `Recoil`을 왜 사용할까 ?

- `Redux`보다 난이도가 낮고, `React`와 잘 맞는다.
- `React Suspense`와 함께 사용하기 좋다 (비동기 `atom` 등..)

> 언제 사용하는 것이 좋을까 ?

- 상태를 **독립적인 조각으로 관리하고 싶은 경우**
- **비동기 전역 상태를 간단하게 처리하고 싶을 때** (ex. 서버 요청 후, 상태 저장)
- `Recoil`은 `React`전용이라 다른 프레임워크와 연동이 어렵다.

> `Recoil`의 특징

- 프로젝트 크기가 클 경우에는 `Zustand/Redux-Toolkit`을 사용한다.
- `Recoil은 여전히 베타`느낌이 있으므로 실무에선 사용 여부를 프로젝트 상황에 맞춰 선택해야한다.

<br/>

## `Zustand`

> 아주 가볍고, 직관적이며, 빠른 상태 관리 라이브러리

### `Zustand`라이브러리의 장점

- `Redux`처럼 복잡한 설정이 필요 없음
- 글로벌 상태를 아주 쉽게 만들고 사용할 수 있음
- `React Context + useReducer` 패턴보다 훨씬 간결함
- 내부적으로 **Context API**를 안 쓰고, 훨씬 더 빠른 구조를 갖고 있음<br/>
  (→ 최적화 굿 👍🏼)
- 즉, **“상태를 관리하는 가장 간단하고 빠른 방법”**

### `Zustand`를 사용해야 하는 이유

- **설정 없이 바로 사용 가능**
- **파일 분리 필요 없이** 1줄로 store 만들기 가능
- **코드량이 매우 적음**
- **렌더링 최적화**가 자동으로 잘 됨
- **React 의존성이 없음** → React 외부에서도 동작할 수 있음
- **비동기, 셀렉터, 미들웨어 확장성** 다 지원

| 상황                                        | 추천 여부                                       |
| ------------------------------------------- | ----------------------------------------------- |
| 상태 관리가 간단한 프로젝트                 | ✅ **매우 추천**                                |
| 전역 상태가 필요하지만 Redux 쓸 정도는 아님 | ✅ **적극 추천**                                |
| 빠른 프로토타이핑 필요할 때                 | ✅ **추천**                                     |
| 복잡한 상태 흐름이 필요한 대형 프로젝트     | 🚫 **"큰 규모"에서는 RTK Query/Redux까지 고려** |

<br/>

### (실습) 체크리스크 + 필터 기능 만들기

- `API`로 리스트 불러오기 연습 테스트 (현재 주석처리)
- 이 후, `API`구현은 부분은 제거 후, 필터기능 추가

---

1. 할일관리
2. 필터 기능 구현

- 요구사항
  - 할 일을 입력하고 목록에 추가 (`API`호출하지 않기 위해 제거 : 주석)
  - 할 일을 완료, 삭제 기능
  - `전체 / 완료 / 미완료` 상태를 **필터 버튼**으로 분류
  - 필터 상태를 `zustand`로 관리
  - 할 일과 필터 상태는 가독성과 재사용성을 위해 `각 slice로 분리`

<br/>

## Redux-Toolkit

### 기존 `Redux` 데이터 흐름

1. 사용자가 어떤 행동(클릭 등)을 함
2. **Action**을 생성 → “나 상태 바꿀 거야”라고 알림
3. **Dispatch** 함 → Action이 Store로 전달됨
4. **Reducer**가 Action을 보고 상태(State)를 업데이트함
5. **Store**가 업데이트된 상태를 컴포넌트에 전달해줌

→ 여기서 핵심은 무조건 “Action → Reducer → Store → View”로 한 방향 흐름

### `Redux`의 단점

- 방대한 **보일러 플레이트**
- 액션타입, 액션 생성자, 리듀서, 스토어가 모두 따로로 작성되어 코드가 많아지고 복잡하다.

<br/>

### `Redux-Toolkit`

```
# Redux Toolkit + React-Redux 설치
npm install @reduxjs/toolkit react-redux
```

- `createSlice()` 로 액션/리듀서 한 번에 생성
- `configureStore()` 로 스토어 간단 설정
- 비동기 통신(`createAsyncThunk`) 도 엄청 쉽게 가능

#### `app` vs `features`의 차이점

| 폴더        | 설명                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| `app/`      | 리덕스 전체 스토어(store)를 만드는 설정 파일을 둡니다.                              |
| `features/` | "하나의 기능 단위"로 쪼갠 slice(조각)를 저장합니다. 보통 feature별 폴더로 나눕니다. |

- `features` : 비즈니스 로직을 포함하는 폴더. 각 기능별로 하나의 폴더를 만들어서, 해당 기능과 관련된 슬라이스, API 함수, 그리고 컴포넌트를 포함.
- `app` : 앱 전체적인 설정과 상태관리를 위한 폴더. store.js 파일에 전역 스토어 설정을 작성하고, App.jsx 파일에는 라우터와 전역 상태를 사용할 수 있도록 Provider를 설정.

#### `configureStore`

configureStore 의 주요 역할은,

- 여러 개의 slice(reducer)를 합쳐서 스토어를 생성
- 개발툴(DevTools) 자동 연결
- 미들웨어 설정도 간편하게 지원

#### `**createAsyncThunk**`

비동기 API 요청을 리덕스에서 쉽게 처리하도록 도와주는 함수

- 원래 리덕스는 **순수 동기 작업**만 처리했었다.
- 그런데 서버에 API 요청을 보내고 응답을 받아야 할 때는 **비동기 처리**가 필요함
- 이때 `createAsyncThunk`는
  - 비동기 함수를 작성할 수 있게 해주고
  - 자동으로 `pending, fulfilled, rejected` 상태를 만들어준다.

#### `createSlice`

상태(state)와 그 상태를 바꾸는 방법(reducer)을 한 파일에서 한번에 만드는 함수

- `name` : 이 slice의 이름 (액션 타입 앞에 자동으로 붙여줌)
- `initialState` : 이 slice의 기본 상태값
- `reducers` : 동기 액션 처리 (ex: 추가, 삭제)
- `extraReducers` : 비동기 thunk 처리 (pending, fulfilled, rejected)

즉, createSlice는 상태 + 액션 + 리듀서를 동시에 만들면서 코드량을 획기적으로 줄여준다.

#### Hooks

- `useSelector` : 리덕스 스토어 안에 있는 상태(state)를 읽어오는 훅

  - 스토어에 저장된 **특정 state**를 컴포넌트 안으로 가져오는 역할
  - 쉽게 말해 **읽기 전용**.

- `useDispatch` : 리덕스 스토어에 액션을 보내는(Dispatch) 훅
  - 액션을 스토어에 보내는 역할
  - 쉽게 말해 **상태를 변경하거나 비동기 thunk를 호출**할 때 사용

#### Provider

> 리액트 컴포넌트들이 리덕스 스토어를 사용할 수 있게 만들어주는 컴포넌트

- 리액트 전체 컴포넌트 트리 안에 store를 전달해주는 역할
- Provider는 context를 이용해서 어디서든 스토어를 사용할 수 있게 만들어준다.

```javascript
import { Provider } from "react-redux";
import { store } from "./app/store";

<Provider store={store}>
  <App />
</Provider>;
```

| 개념               | 설명                                                        |
| ------------------ | ----------------------------------------------------------- |
| `createAsyncThunk` | 비동기 API 요청을 리덕스 안에서 관리하게 하는 함수          |
| `createSlice`      | 상태(state)와 액션, 리듀서를 한 번에 만드는 함수            |
| `useSelector`      | 스토어의 상태를 읽어오는 훅                                 |
| `useDispatch`      | 스토어에 액션을 보내는 훅                                   |
| `Provider`         | 리액트 컴포넌트들이 스토어에 접근할 수 있게 해주는 컴포넌트 |

<br/>

## `RTK Query`

> Redux Toolkit(RTK) 안에 내장된 “비동기 서버 통신” 전용 기능<br/>
> API 요청(서버통신)을 매우 간단하고, 빠르고, 최적화된 방식으로 처리할 수 있게 해주는 도구이다.

### `RTK`의 단점

- 매 요청마다 pending/fulfilled/rejected 다 관리해야 하고,
- 상태(state) 직접 만들고, 업데이트도 직접 해야한다.
- 코드가 많고 복잡하다.

<br/>

💡 **RTK Query**가 이 문제를 해결한다.

- 비동기 로직을 거의 “0줄”로 작성
- 캐싱, 리페칭, 로딩 상태, 에러 상태 전부 **자동 관리**
- 성능 최적화(메모이제이션, 자동 업데이트)까지 기본 제공

### `RTK Query`의 사용해야하는 상황

> API 서버와 통신할 일이 많을 때

- 목록 불러오기 (fetch list)
- 글쓰기/수정/삭제 (post/patch/delete)
- 검색 기능
- 무한 스크롤
- 채팅/라이브 데이터

<br/>

#### RTK Query 기본 구조 흐름

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
