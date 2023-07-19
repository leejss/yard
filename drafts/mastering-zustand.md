---
title: "Zustand receipe"
date: 2023-02-18 22:41
categories:
  - react
---

## Basic handling state skills

### Initialize state

```typescript
import { create } from "zustand";

type AppState = {
  connected: boolean;
};

type AppAction = {
  setConnected: (connected: boolean) => void;
};

const useAppStore = create<AppState & AppAction>((set) => ({
  connected: false,
  setConnected: (connected: boolean) => set({ connected }),
}));

export default useAppStore;
```

### Using Typescript

### Read state

Read State => Bind components to states

#### Read whole state

```typescript
// App.typescript
const App = () => {
  const appStore = useAppStore(); // appStore의 state가 변할 때 마다 App은 리렌더링 한다.
  // ...
};
```

#### Read state slices

```typescript
// ConnectionState.typescript
const ConnectionState = () => {
  const connected = useAppStore((state) => state.connected); // appStore의 connected가 바뀔 때 마다 리렌더링 한다.
  // ...
};
```

### Write state (or Update state)

1. upate state immutably.

```typescript
const useAppStore = create<AppState & AppAction>((set) => ({
  connected: false,
  setConnected: (connected: boolean) => set({ connected }),

  // ❌ 올바르지 않은 방법
  // setConnected: (connected: boolean) =>
  //   set((state) => {
  //     state.connected = conneceted
  //   }),
}));
```

2. `set` function try to merge new state into old state, not replace the old state

```typescript
const useAppStore = create<AppState & AppAction>((set) => ({
  connected: false,
  setConnected: (connected) => set((state) => ({ ...state, connected })),
  accounts: [],
  setAccounts: (accounts) => set((state) => ({ ...state, accounts })),
}));
```

위 코드의 `setConnected`, `setAccounts` 를 보면 `...state`를 통해서 전체 state를 복사 후 새로운 state에 담아 리턴하고 있다. 불변성을 지키면서 상태를 업데이트하는 방법이지만 위와 같이 작성할 필요 없다. 왜냐하면 set은 업데이트 된 state를 기존 state에 merge하기 때문이다. 객체를 merge하기 위해 `Object.assign`을 활용한다. 따라서 다음과 같이 작성할 수 있고 이렇게 작성하는 것이 보다 깔끔하다.

```typescript
const useAppStore = create<AppState & AppAction>((set) => ({
  connected: false,
  setConnected: (connected) => set({ connected }),
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
}));
```

3. update nested object

다음과 같은 store를 생각해보자.

```typescript
const useAppStore = create<AppState & AppAction>((set) => ({
  modals: {
    error: {
      open: false,
      message: "",
    },
    alert: false,
    confirm: false,
  },
}));
```

state가 Nested object형태로 되어 있다. nested objecet같은 경우 불변성을 지키기 위해 복사를 해줘야 한다.

```typescript
setModals: (modals) =>
  set((prev) => ({
    modals: {
      ...state.modals,
      error: {
        ...state.modals.error,
        ...modals.error,
      },
    },
  }));
```

## Middleware

미들웨어를 통해서 Update state에 추가 행동을 부여할 수 있다. 예를 들어, State를 업데이트할 때 마다 로깅하거나 스토리지에 저장할 수 있는 로직을 마들웨어 형식으로 추가할 수 있다.
