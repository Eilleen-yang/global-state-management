# Redux-Toolkit

## 기존 `Redux` 데이터 흐름

1. 사용자가 어떤 행동(클릭 등)을 함
2. **Action**을 생성 → “나 상태 바꿀 거야”라고 알림
3. **Dispatch** 함 → Action이 Store로 전달됨
4. **Reducer**가 Action을 보고 상태(State)를 업데이트함
5. **Store**가 업데이트된 상태를 컴포넌트에 전달해줌

→ 여기서 핵심은 무조건 “Action → Reducer → Store → View”로 한 방향 흐름

## `Redux`의 단점

- 방대한 **보일러 플레이트**
- 액션타입, 액션 생성자, 리듀서, 스토어가 모두 따로로 작성되어 코드가 많아지고 복잡하다.

<br/>

## `Redux-Toolkit`

```
# Redux Toolkit + React-Redux 설치
npm install @reduxjs/toolkit react-redux
```

- `createSlice()` 로 액션/리듀서 한 번에 생성
- `configureStore()` 로 스토어 간단 설정
- 비동기 통신(`createAsyncThunk`) 도 엄청 쉽게 가능

### `app` vs `features`의 차이점

| 폴더        | 설명                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| `app/`      | 리덕스 전체 스토어(store)를 만드는 설정 파일을 둡니다.                              |
| `features/` | "하나의 기능 단위"로 쪼갠 slice(조각)를 저장합니다. 보통 feature별 폴더로 나눕니다. |

- `features` : 비즈니스 로직을 포함하는 폴더. 각 기능별로 하나의 폴더를 만들어서, 해당 기능과 관련된 슬라이스, API 함수, 그리고 컴포넌트를 포함.
- `app` : 앱 전체적인 설정과 상태관리를 위한 폴더. store.js 파일에 전역 스토어 설정을 작성하고, App.jsx 파일에는 라우터와 전역 상태를 사용할 수 있도록 Provider를 설정.

### `configureStore`

configureStore 의 주요 역할은,

- 여러 개의 slice(reducer)를 합쳐서 스토어를 생성
- 개발툴(DevTools) 자동 연결
- 미들웨어 설정도 간편하게 지원

### `**createAsyncThunk**`

비동기 API 요청을 리덕스에서 쉽게 처리하도록 도와주는 함수

- 원래 리덕스는 **순수 동기 작업**만 처리했었다.
- 그런데 서버에 API 요청을 보내고 응답을 받아야 할 때는 **비동기 처리**가 필요함
- 이때 `createAsyncThunk`는
  - 비동기 함수를 작성할 수 있게 해주고
  - 자동으로 `pending, fulfilled, rejected` 상태를 만들어준다.

### `createSlice`

상태(state)와 그 상태를 바꾸는 방법(reducer)을 한 파일에서 한번에 만드는 함수

- `name` : 이 slice의 이름 (액션 타입 앞에 자동으로 붙여줌)
- `initialState` : 이 slice의 기본 상태값
- `reducers` : 동기 액션 처리 (ex: 추가, 삭제)
- `extraReducers` : 비동기 thunk 처리 (pending, fulfilled, rejected)

즉, createSlice는 상태 + 액션 + 리듀서를 동시에 만들면서 코드량을 획기적으로 줄여준다.

### Hooks

- `useSelector` : 리덕스 스토어 안에 있는 상태(state)를 읽어오는 훅

  - 스토어에 저장된 **특정 state**를 컴포넌트 안으로 가져오는 역할
  - 쉽게 말해 **읽기 전용**.

- `useDispatch` : 리덕스 스토어에 액션을 보내는(Dispatch) 훅
  - 액션을 스토어에 보내는 역할
  - 쉽게 말해 **상태를 변경하거나 비동기 thunk를 호출**할 때 사용

### Provider

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
