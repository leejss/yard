---
layout: '../../layouts/post-layout.astro'
title: "React Context로 Store만들어 사용하기"
date: 2022-11-10 02:02
categories:
  - react
---

리액트에서 컴포넌트를 렌더링하고 싶으면 어떻게 해야 할까? useState (또는 useReducer)를 통해서 로컬 상태를 선언하고 set함수를 이용하여 로컬 상태를 업데이트 하면 된다.
만약 다른 컴포넌트와 상태를 공유하고 싶으면 어떻게 해야할까? 만약 자식 컴포넌트라면 props로 전달할 수 있다. 부모 컴포넌트라면 상태를 lift up 하거나 전역 상태로 만든다. 전역 상태로 만드는 방법 중 하나는 context api를 이용하는 것이다. context에는 여러 형태의 데이터를 담을 수 있는데 state도 그 중 하나다.  
context에 데이터를 담아 컴포넌트 트리에 주입할 수 있다. 그리고 useContext 훅을 이용하여 컴포넌트에서 context값에 접근할 수 있다. 만약 context에 state와 set 함수를 담아 컴포넌트 트리 안에 넣게 된다면 context에 있는 state는 global state로 사용할 수 있다.  
부모 컴포넌트가 렌더링을 하면 자식 컴포넌트로 렌더링을 한다. 만약 Provider 컴포넌트에 있는 state가 set하면 그 아래의 자식 컴포넌트들은 렌더링한다. 문제는 실제로 변한 state를 사용하지 않는 자식 컴포넌트들도 렌더링을 한다. 즉 extra re rendering이 발생한다. memo를 이용하여 컴포넌트를 memoizartion할 수 있지만 이는 다른 방식으로 오버헤드를 일으킨다.
state가 변한 부분만 렌더링을 하고자 하는 경우 어떻게 Context를 디자인할 수 있을까?

## State Based Context

```tsx
const App = () => {
  return (
    <StoreContext.Provider value={value}>
      <Container>
        <Wrapper>
          <Box>
            <Form />
          </Box>
        </Wrapper>
      </Container>
    </StoreContext.Provider>
  );
};
```

기본적으로 provider의 value props를 통해서 컴포넌트 트리에 data를 전파한다. state based context같은 경우 다음과 같이 작성할 수 있다.

```tsx
const App = () => {
  const [name, setName] = useState({
    first: "",
    last: "",
  });

  return (
    <StoreContext.Provider value={value}>
      <Container>
        <Wrapper>
          <Box>
            <Form />
          </Box>
        </Wrapper>
      </Container>
    </StoreContext.Provider>
  );
};
```

App 컴포넌트의 로컬 상태가 context로서 컴포넌트 트리에 전달된다. App 컴포넌트의 로컬 상태는 곧 전역 상태가 된다. Form 컴포넌트에서는 useContext훅을 통해서 가장 가까이 있는 Provider의 context를 읽는다.

```tsx
const Form = () => {
  **const [name, setName] = useContext(StoreContext)**
  return (
    <form className="form">
      <label>
        first name
        <input type="text" />
      </label>
      <label>
        last name
        <input type="text" />
      </label>
    </form>
  );
};
```

setName을 통해 name 상태를 변경하면 App컴포넌트가 리렌더링 되기 때문에 전체 컴포넌트 트리가 리렌더링 된다. state based context는 이러한 extra re rendering을 막지 못한다.  
따라서 다른 방식이 필요하다. useRef는 어떨까?

## Ref Based Context

```tsx
const App = () => {
  const value = useRef({
    first: "",
    last: "",
  });
  return (
    <StoreContext.Provider value={value}>
      <Container>
        <Wrapper>
          <Box>
            <Form />
          </Box>
        </Wrapper>
      </Container>
    </StoreContext.Provider>
  );
};
```

useRef를 통해 생성한 값은 렌더링 마다 동일한 레퍼런스를 유지하고 (즉 새로 생성하지 않고) ref의 값을 변경해도 렌더링을 트리거 하지 않는다. 실제로 렌더링을 하기 위해서는 useState와 useReducer를 거쳐야 한다. 말하자면 useRef를 통해 생성한 data source가 있고 이 data를 이용하여 state를 만들어 렌더링을 담당하는 rendering layer가 있는 셈이다. 이렇게 두 개를 분리해서 얻을 수 있는 이점은 이전과는 다르게 어떤 컴포넌트를 rendering할지를 컨트롤 할 수 있다는 점이다.

## Store Data Source, Data layer, Rendering layer

먼저 인터페이스 부터 생각해보자. 다음과 같은 인터페이스를 구현해보고 싶다.

```tsx
const store = createStore();

store.get();
store.set(newState);
store.subscribe(callback);
```

subscribe를 통해서 콜백을 등록하고 store의 데이터가 변할 때마다 콜백을 호출해준다. callback에 바로 set 함수를 추가하여 rendering layer를 추가할 것이다.

```tsx
const createNameStore = () => {
  // 1.
  const value = useRef({
    first: "",
    last: "",
  });

  type NameStoreUpdateFunction = (nextState: NameStore) => NameStore;
  // 2.
  const subscribers = useRef(new Set<() => void>()).current;
  const get = useCallback(() => value.current, []);
  const set = useCallback((nextState: NameStore | NameStoreUpdateFunction) => {
    value.current =
      typeof nextState === "function"
        ? (nextState as NameStoreUpdateFunction)(value.current)
        : nextState;
    // 3.
    subscribers.forEach((cb) => cb());
  }, []);

  // 4.
  const subscribe = useCallback((cb: () => void) => {
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  return {
    get,
    set,
    subscribe,
  };
};

type NameContextReturnType = ReturnType<typeof createNameStore>;
const NameContext = createContext<NameContextReturnType | null>(null); // default value is null

// 5.
const useNameStore = () => {
  const store = useContext(NameContext); // get store from the context
  if (!store) throw new Error("Provider is missing");
  // 6.
  const [name, setName] = useState(store.get());
  store.subscribe(() => {
    setName(store.get());
    // store.set -> store update -> set function called -> rendering
  });
  return [name, store.set] as const;
};
```

1. useRef를 사용하여 변수를 선언했다. 렌더링 마다 같은 참조를 유지한다.
2. 콜백을 관리할 subscribers를 선언했다 set 데이터 구조를 활용하여 중복된 참조를 가진 콜백이 없도록 한다.
3. store의 set함수는 직접 렌더링을 트리거 하지 않는다. 대신 set함수를 호출 하면 subscribers에 등록된 콜백을 차례대로 호출한다. 이 콜백이 바로 rendering을 트리거 한다.
4. subscribe를 통해store에 콜백을 등록한다. return 하는 함수는 unsubscribe함수다.
5. 컴포넌트와 store의 바인딩을 해줄 커스텀 훅을 작성한다. 이 훅을 통해서 state의 변화를 컴포넌트에 전파한다.
6. store의 rendering layer을 생성한다. 실제 렌더링을 트리거하는 역할을 한다. useState와 store를 서로 연결한다.

따라서 다음과 같이 Provider 컴포넌트를 작성할 수 있다.

```tsx
const NameProvider = ({ children }: PropsWithChildren) => {
  const store = createNameStore();
  return <NameContext.Provider value={store}>{children}</NameContext.Provider>;
};
```

```tsx
const App = () => {
  return (
    <NameProvider>
      <h1>App</h1>
      <Container>
        <Wrapper>
          <Box>
            <Form />
          </Box>
        </Wrapper>
      </Container>
    </NameProvider>
  );
};
```

NameProvider가 위치한 곳은 컴포넌트 트리의 최상위고 업데이트가 일어나는 곳은 Form이다.

```tsx
const Form = () => {
  const [name, setName] = useNameStore();
  return (
    <form>
      <label>
        first name
        <input
          type="text"
          onChange={(e) => {
            setName({
              ...name,
              first: e.target.value,
            });
          }}
        />
      </label>
      <label>
        last name
        <input
          type="text"
          onChange={(e) => {
            setName({
              ...name,
              first: e.target.value,
            });
          }}
        />
      </label>
    </form>
  );
};
```

하지만 트리 전체가 렌더링 하는 대신 Form 컴포넌트만 렌더링 된다. 왜냐하면 실제 렌더링은 Form컴포넌트의 useNameStore 훅에서 일어나기 때문이다. 이렇게 Hook을 이용하여 렌더링을 트리거 하는 방식은 많은 상태관리 라이브러리에서 제공한다.

## Do generic

팩토리 함수를 작성해보자.

```tsx
const StoreContext = createContext(null);
const StoreProvider = ({ children }: PropsWithChildren) => {
  const store = createStore(initialData);
  return <StoreContext.Provider>{children}</StoreContext.Provider>;
};
```

createStore 팩토리 함수를 만들면 쉽게 store를 생성하여 context를 만들 수 있다.

그런데 한가지 달라진 점은 컴포넌트 트리 밖 또는 훅 밖에서는 훅을 사용할 수 없다. 따라서 useRef 대신 지역변수를 사용하도록 한다.

```tsx
function createStore<T>(initialData: T) {
  type StateUpdateFunction<T> = (prev: T) => T;
  let data = initialData;
  const subscribers = new Set<() => void>();
  const get = () => data;
  const set = (nextState: T | StateUpdateFunction<T>) => {
    data =
      typeof nextState === "function" ? (nextState as StateUpdateFunction<T>)(data) : nextState;
    subscribers.forEach((cb) => cb());
  };
  const subscribe = (cb: () => void) => {
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  };

  return {
    get,
    set,
    subscribe,
  };
}

export default createStore;
```

initialData의 타입을 추론하여 store를 생성하도록 했다.

```tsx
const countStore = createStore(0);
const nameStore = createStore({
  first: "",
  last: "",
});
```

이런 식으로 store를 생성할 수 있다. 컴포넌트를 store와 연결해줄 훅도 제네릭하게 바꿔보도록 하자.

```tsx
import { Context, useContext, useState } from "react";

type Store<T> = {
  get: () => T;
  set: (nextState: T | ((prev: T) => T)) => void;
  subscribe: (cb: () => void) => () => void;
};

function useStore<T>(ctx: Context<Store<T> | null>) {
  const store = useContext(ctx);
  if (!store) throw new Error("Provider is missing");
  const [data, setData] = useState(store.get);
  store.subscribe(() => {
    setData(store.get());
  });
  return [data, store.set] as const;
}

export default useStore;
```

useStore의 역할은 context를 찾아 data layer에 접근하고 컴포넌트의 렌더링을 담당한다.

```tsx
const [count, setCount] = useStore(CountContext);
const [name, setName] = useStore(NameContext);
```

이런 식으로 context를 넘겨 사용할 수 있다.

정리 하자면,

- createStore를 통해 data source를 생성하고
- useStore를 통해서 data source에 접근하고 rendering layer를 생성한다.

## More generic

그런데 createStore, Provider, useStore를 통해 사용하게 되면 boilerplate가 길어져 금방 코드가 어지러워 진다. 더군다나 useStore에 context를 넘겨주는 것이 어색하게 느껴진다. 조금 더 제네릭하게 바꿔보자.

구현하고자 하는 것은 createStateContext 함수다. 리액트의 기본 api인 createContext와 구별하기 위해 createStateContext라고 지었지만 createContext로 정의하여 사용해보 무방할 것 같다.

실제로 createContext 팩토리 함수를 직접 정의해서 사용하는 라이브러리들이 있는 것 같은데 Chakra UI 라이브러리에서도 같은 방식으로 직접 createContext 함수를 정의하여 사용하고 있다.

```tsx
const [StoreProvider, useStore] = createContext(initialState);
```

기본적인 인터페이스는 위와 같다. 전에 비해 훨씬 간결해졌다. 작성 방법도 이전과 크게 다르지 않다.

```tsx
function createStateContext<T>(initialState: T) {
  type ContextReturnType = ReturnType<typeof createStore<T>>;
  const store = createStore(initialState);
  const StateContext = createContext<ContextReturnType | null>(null);

  const StateProvider = ({ children }: PropsWithChildren) => {
    return <StateContext.Provider value={store}>{children}</StateContext.Provider>;
  };

  const useContextState = () => {
    const storeData = useContext(StateContext);
    if (!storeData) throw new Error("Provider is missing");
    const [data, setData] = useState(storeData.get());
    storeData.subscribe(() => {
      setData(storeData.get());
    });
    return [data, storeData.set] as const;
  };

  return [StateProvider, useContextState] as const;
}
```

이제 createContext를 통해서 data source와 data access layer, rendering layer까지 정의해서 사용할 수 있다.

```tsx
export const [CountProvider, useCount] = createStateContext(0);

const App = () => {
  return (
    <CountProvider>
      <NameProvider>
        <h1>App</h1>
        <Container>
          <Wrapper>
            <Box>
              <Form />
              <Counter />
            </Box>
          </Wrapper>
        </Container>
      </NameProvider>
    </CountProvider>
  );
};
```

<video  autoplay controls>
  <source src="/video/Screen Recording 2022-11-10 at 1.45.30 AM.mov" />
</video>

렌더링도 잘 동작하는 것을 볼 수 있다.

## Referncces

[https://www.youtube.com/watch?v=ZKlXqrcBx88&t=119s](https://www.youtube.com/watch?v=ZKlXqrcBx88&t=119s)
