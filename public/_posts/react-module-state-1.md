---
title: "React module state (1)"
date: 2022-09-05 15:05
categories:
  - react
---

본 글은 [Daishi Kato]의 [Micro State Management with React Hooks]의 일부분을 요약하고 정리한 글입니다.
본문에 나온 코드는 [github]에서 살펴볼 수 있습니다.

## module state란?

- module scope에 정의한 state

```tsx
let count = 0; // 👈 module state라고 볼 수 있다.
const Counter = () => {
  /* ... */
};
```

- module state의 목적은 여러 컴포넌트가 같은 state를 공유하도록 하기 위해서다.

## Approach 1

- 컴포넌트 바깥에 변수를 정의한다고 해서 이 것이 module state가 되는 것이 아니다.
- 왜냐하면 변수의 값을 직접 바꾼다고 해도 렌더링이 일어나지 않기 때문이다.
- **렌더링을 하기 위해서는 리엑트의 라이프사이클에 개입 하여 렌더링을 일으켜 줘야 하는데** 이를 가능하게 해주는 hook이 `useState`와 `useReducer`다.
- 따라서 다음과 같이 작성해 볼 수 있다.

```tsx
let count = 0;

export const Counter1 = () => {
  const [_, setState] = useState(count);
  return (
    <div className="counter">
      <h1>{count}</h1>
      <div className="buttonGroup">
        <button
          onClick={() => {
            count -= 1;
            setState(count);
          }}
        >
          -1
        </button>
        <button
          onClick={() => {
            count += 1;
            setState(count);
          }}
        >
          +1
        </button>
      </div>
    </div>
  );
};
```

- module state에 useState를 사용하여 state를 업데이트하면서 rendering을 트리거 했다.
- 그런데 이 방식의 문제점은 module state가 sharable하지 않는 다는 점이다.
- 무슨 말이냐면 한 컴포넌트에서 state를 업데이트 하면 이 state를 사용하고 있는 다른 컴포넌트가 리렌더링하지 않는다.
- 왜냐하면 당연하게도 다른 컴포넌트에서는 set함수가 invoke되지 않았기 때문
  ![](https://a.storyblok.com/f/171155/600x380/b72d485c0c/modulestate1.gif)
- 그래서 위와 같은 현상이 발생한다. 한쪽의 set이 다른 컴포넌트의 리렌더링을 발생시키지 않는다.

## Approach 2

- 이를 해결하기 위해서는 한 쪽에서 set이 invoke되면 해당 state를 사용하고 있는 컴포넌트에도 set이 invoke되어야 한다.
- daish kato는 이를 위해 setState 함수를 담을 Set 데이터 구조를 만들고 컴포넌트의 set함수들을 여기다 담는다.
- 그리고 한 쪽에서 set함수를 호출할 때, Set데이터 구조를 순환하여 같은 인자를 넣어 전부 호출한다. 코드를 보면 간단하다.

```tsx
const setStateFunctions = new Set<(count: number) => void>(); // 👈 setState 함수를 담을 구조를 생성

export const Counter1 = () => {
  const [_, setState] = useState(count);

  useEffect(() => {
    setStateFunctions.add(setState);
    return () => {
      setStateFunctions.delete(setState);
    };
  }, []);

  const increment = () => {
    count += 1;
    setStateFunctions.forEach((setState) => {
      setState(count);
    });
  };

  const decrement = () => {
    count -= 1;
    setStateFunctions.forEach((setState) => {
      setState(count);
    });
  };

  return (
    <div className="counter">
        {// 생략 }
    </div>
  );
};

export const Counter2 = () => {
  const [_, setState] = useState(count);
  useEffect(() => {
    setStateFunctions.add(setState); // 👈 여기서 set함수를 담는다. 일종의 구독관계를 형성
    return () => {
      setStateFunctions.delete(setState);
    };
  }, []);

  const increment = () => {
    count += 1;
    setStateFunctions.forEach((setState) => { // 👈 Set을 전부 돌아 다른 컴포넌트의 렌더링을 유발한다.
      setState(count);
    });
  };

  const decrement = () => {
    count -= 1;
    setStateFunctions.forEach((setState) => {
      setState(count);
    });
  };
  return (
    <div className="counter">
      {// 생략}
    </div>
  );
};

```

- 이렇게 하면 sharable한 module state를 만들 수 있는데 문제는 코드가 중복된다.

## Approach 3

- 코드의 중복을 해결하기 위해 daish kato는 store와 subscription model을 제안한다.
- 간단하게 말하면 module state인 store가 있고 callback을 store에 subscribe할 수 있다.
- 만약 store에 있는 state가 변하면 subscribe한 callback이 호출된다.

```tsx
const unsubscribe = store.subscribe(() => {
  // store의 state가 변하면 이 callback이 호출된다.
});
```

- store의 팩토리 함수를 살펴보면 다음과 같다.

```tsx
type Store<T> = {
  getState: () => T;
  setState: (nextState: T | ((prev: T) => T)) => void;
  subscribe: (cb: () => void) => () => void;
};

export const createStore = <T extends unknown>(initialState: T): Store<T> => {
  let state = initialState;
  const callbacks = new Set<() => void>();
  return {
    getState: () => state,
    setState: (nextState) => {
      state =
        typeof nextState === "function"
          ? (nextState as (prev: T) => T)(state)
          : nextState;

      callbacks.forEach((cb) => cb());
    },
    subscribe: (cb) => {
      callbacks.add(cb);
      return () => {
        callbacks.delete(cb);
      };
    },
  };
};
```

- store는 `getState`, `setState`, `subscribe` 세 가지 메소드를 가진다.
- store의 setState를 살펴보면 Approach 2 에서 살펴본 것 처럼 Set을 순환하여 subscribe된 콜백을 호출한다.
- 그리고 이를 컴포넌트 렌더링 과정에 "hook" 하기 위하여 useStore라는 훅을 만들 수 있다.

```tsx
export const useStore = <T>(
  store: Store<T>
): [T, (nextState: T | ((prev: T) => T)) => void] => {
  const [state, setState] = useState<T>(store.getState());

  useEffect(() => {
    // add subscription
    const unsubscribe = store.subscribe(() => {
      setState(store.getState()); // 🔥 useStore를 컴포넌트에서 사용하면 그 컴포넌트는 store에 subscribe하게 된다.
    });
    setState(store.getState()); // 👈 초기 store의 state를 반영하기 위함.
    return unsubscribe;
  }, [store]); // 👈 store가 변할 때 마다 리액트의 useState 훅을 통해 렌더링을 유발한다.

  return [state, store.setState];
};
```

- 컴포넌트에서는 다음과 같이 사용한다

```tsx
export const countStore = createStore({ count: 0 });

export const Counter1 = () => {
  const [countState, setCountState] = useStore<{ count: number }>(countStore);
  const decrement = () => {
    setCountState((prev) => ({
      count: prev.count - 1,
    }));
  };

  const increment = () => {
    setCountState((prev) => ({
      count: prev.count + 1,
    }));
  };
  return (
    <div className="counter">
      { // 생략 }
    </div>
  );
};
```

- module state를 정의하고 훅을 통해서 관리를 할 수 있게 되었다.
- module state에 subscribe하는 모델의 개념적인 부분은 [observer pattern]에서 더 배울 수 있다.
- 그런데 이 방식의 문제점은 extra re rendering이 발생할 수 있다는 것이다.
- 예를 들어 state가 여러 개의 properties를 가지고 있는 객체인 경우 한 쪽에서 하나의 property만 수정해도 이를 사용하지 않은 다른 컴포넌트도 렌더링을 하게 된다.
- 이를 해결하기 위해 daish kato는 selector를 제안한다.
- 이 부분은 react module state (2) 에서 다룬다.

[daishi kato]: https://github.com/dai-shi
[micro state management with react hooks]: https://www.amazon.com/Micro-State-Management-React-Hooks/dp/1801812373
[github]: https://github.com/leejss/react-module-state
[observer pattern]: https://www.patterns.dev/posts/observer-pattern/
