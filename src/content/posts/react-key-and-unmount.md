---
layout: '../../layouts/post-layout.astro'
title: "React: key와 props change"
date: 2022-10-06 03:47
categories:
  - react
---

## key

배열을 렌더링하려고 할 때, 우리는 key를 항상 넣어준다.

```tsx
{
  list.map((item) => <li key={item.id}></li>);
}

{
  posts.map((post) => <PostItem key={post.id} {...post} />);
}
```

이 상황에서 key를 넣어줘야 하는 이유는 무엇일까? React는 렌더링을 하고 실제 DOM에 커밋하기 전에 이전 렌더링과 비교를 한다. React tree를 완전하게 비교를 하는 것은 매우 비효율적인 복잡도를 가지고 있기 때문에 React는 휴리스틱한 비교 알고리즘을 사용한다. 따라서 완벽히 비교를 하기 보다는 주요 속성 몇 가지를 비교하여 이전과 같고 다름을 구분한다. 그 후 이전과 다른 부분만을 실제 DOM에 반영한다.

key는 비교 과정에서 사용하는 속성이다. Tree 구조에서 동일한 위치에 있는 컴포넌트가 이전 렌더링과 다른 key를 가지고 있으면 해당 컴포넌트를 언마운트 시키고 DOM을 재생성한다. 만약 key를 가진 컴포넌트가 local state를 가지고 있으면 이 과정에서 state가 초기화 된다. (사실상 컴포넌트를 삭제했다가 재생성한 것이다.)  
상태를 초기화 하는 속성을 이용하여 key값을 배열을 렌더링할 때 뿐만 아니라 다르게 활용할 수 있다.

## key를 이용하여 상태 초기화 하기

기본적으로 Parent 컴포넌트가 렌더링을 하면 재귀적으로 Children 컴포넌트들도 렌더링을 한다. 만약 Child 컴포넌트가 local state를 가지고 있으면 렌더링 마다 상태값은 유지가 된다.

```tsx
const App = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CounterWithName name={name} />
    </div>
  );
};

export default App;

const CounterWithName = ({ name }: { name: string }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>
        {name}: {count}
      </h1>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

예를 들어, `App` 컴포넌트에서 `name`값을 변경해 리렌더링이 일어나도 `CounterWithName` 컴포넌트의 `count` 상태값은 사라지지 않는다.

그런데 만약 name이 변하면 count state가 초기화 즉, initialValue를 다시 가져야하는 경우라면 어떻게 해애햘까 ? 즉 props가 변경하면 컴포넌트의 상태값이 초기화해야하는 경우 말이다.

먼저 `useEffect`를 떠올려 볼 수 있다.

```tsx
useEffect(() => {
  setCount(0);
}, [name]);
```

실제로 `name`이 바뀌면 `setCount(0)` 을 호출하기 때문에 값이 초기화 된다. 하지만 이는 불필요한 작업(unnecessary effects) 이다.  
그리고 declarative해보이지 않는다.  
여기서 우리는 key를 활용할 수 있다. 이전 렌더링과 key가 다르다면 상태는 초기화 된다. 따라서 useEffect대신 다음과 같이 작성할 수 있다.

```tsx
<CounterWithName name={name} key={name} />
```

React가 봤을 때 key가 다르면 state를 공유하지 않은 전혀 다른 컴포넌트라고 생각한다. 따라서 컴포넌트를 언마운트 시키고 새로 생성한다. 그리고 새로 생성하는 과정에서 상태도 초기값을 가지게 된다.  
만약 props에 따라 상태를 초기화해야 한다면 key를 사용해보자.

## state의 초기값을 props로 하는 경우

React의 안티패턴 중에 props를 state의 초기화 값으로 사용하는 것이 있다.

```tsx
const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);
  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        increment
      </button>
    </div>
  );
};
```

다음과 같이 사용하면 문제가 없다.

```tsx
<Counter initialCount={10} />
```

문제는 props가 렌더링 시 변하는 경우다.

```tsx
const App = () => {
  const [initialValue, setInitialValue] = useState(0);
  return (
    <div>
      <h1>Initial Value</h1>
      <input
        type="number"
        value={`${initialValue}`}
        onChange={(e) => {
          setInitialValue(parseInt(e.target.value));
        }}
      />
      <Counter initialCount={initialValue} />
    </div>
  );
};
```

인풋창을 통해서 initialValue를 바꾸어도 Counter 컴포넌트의 count 값은 여전히 0이다. 렌더링을 하면 `const [count, setCount] = useState(initialCount);` 도 실행할텐데 어째서 count값이 바뀌지 않는 것일까?

> The initial value of a useState hook is always discarded on re-renders - it only has an effect when the component mounts. - TkDodo

왜냐하면 state의 초기값은 mount 할 때만 정해지는 것이기 때문이다. 마운트가 되고 리렌더링 시, initialValue는 더이상 사용하지 않는다. 따라서 Counter가 마운트가 되고 나서 0으로 설정되고 난 후 리렌더링시에는 값을 사용하지 않기 때문에 마치 props의 값이 반영이 안되는 것처럼 보인다.

그런데 key를 사용하면 이를 해결할 수 있다.

```tsx
<Counter initialCount={initialValue} key={initialValue} />
```

key가 이전과 바뀌면 언마운트 시키고 다시 생성한다고 했다. 따라서 useState의 initial value도 다시 생성이 된다. 그렇기 때문에 props 값을 반영하는 것처럼 보인다.

## Sources

- [Putting props to useState](https://tkdodo.eu/blog/putting-props-to-use-state)
- [Resetting all state when a prop changes](https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes)
