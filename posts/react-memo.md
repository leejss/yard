---
title: "React: memo 제대로 알기"
date: 2022-10-04 22:48
categories:
  - react
---

## Extra re-rendering

React에서 optimization은 주로 extra re-rendering을 최소화 하는 작업이다. extra re-rendering이란 컴포넌트와 직접 관련이 없는 상태가 변할 때 rendering이 일어나는 것을 말한다.

```jsx
export default function App() {
  const [countState, setCountState] = useState({
    count1: 0,
    count2: 0,
  });
  return (
    <div className="App">
      <button
        onClick={() => {
          setCountState((prev) => ({
            ...prev,
            count1: prev.count1 + 1,
          }));
        }}
      >
        count1++
      </button>
      <button
        onClick={() => {
          setCountState((prev) => ({
            ...prev,
            count2: prev.count2 + 1,
          }));
        }}
      >
        count2++
      </button>
      <Counter1 count1={countState.count1} />
      <Counter2 count2={countState.count2} />
    </div>
  );
}

const Counter1 = (props) => {
  console.log("Counter1 render");
  return <h1>{props.count1}</h1>;
};

const Counter2 = (props) => {
  console.log("Counter2 render");
  return <h1>{props.count2}</h1>;
};
```

`Counter2` 컴포넌트는 오직 `App`의 `countState.count2`만 필요하지만 `count1++` 버튼을 클릭하면 같이 렌더링 된다.

<img src="/images/react-memo/react-memo1.gif" alt="" style="margin: 0 auto" />

즉, Counter2의 props는 이전과 똑같지만 렌더링이 발생하고 있는 것이다. 이는 Extra re-rendering이고 만약 이렇게 렌더링되는 컴포넌트의 사이즈가 크거나 또 많다면 최적화의 대상이 된다.

## memo 사용하기

> Memoization only has to do with props that are passed to the component from its parent.

memo는 오직 props를 비교한다 만약 props가 이전과 똑같다면 렌더링을 하지 않는다. 따라서 rendering 마다 props가 자주 변하지 않는다면 memo를 통해서 성능 개선을 **이룰 수도** 있다. 위 카운트 예제에서 `Counter2` 컴포넌트를 `memo`로 감싸면 더 이상 extra re-rendering이 발생하지 않는다.

```jsx
const Counter2 = memo((props) => {
  console.log("Counter2 render");
  return <h1>{props.count2}</h1>;
});
```

<img src="/images/react-memo/react-memo2.gif" alt="" style="margin: 0 auto" />

Counter2 컴포넌트의 props가 이전과 동일한 경우 렌더링을 하지 않는다.

memo는 오직 prop 변화만을 감지하여 extra re-rendering을 방지한다. memo로 감싼 컴포넌트라 하더라도 local state, global state가 변하면 렌더링은 일어난다. (global state로 인한 extra re-rendering을 방지하기 위해서는 selector, atom 등의 라이브러리의 해결방안을 사용해야 한다.)

## memo는 항상 옳은가?

"memo는 extra re rendering을 방지한다." 이렇게 생각했을 때 memo를 사용하는 것이 best practice처럼 보인다. 그런데 정말 그럴까?  
일단 prop 변화가 자주 일어난다면 memo를 사용할 이유가 없다. 컴포넌트 memoization은 prop 변화가 적어야 의미가 있다.  
그리고 memo가 실제로 성능을 개선할까? memo가 re-rendering을 방지하는 것은 맞지만 이 것이 성능을 개선을 의미할까? (리렌더링을 막는다고해서 무조건 성능이 개선될까?)  
컴포넌트를 memoize 하는 것은 메모리 어딘가 컴포넌트를 저장한다는 것이다. memo를 자주 사용한다면 그 만큼 memory 사용이 늘어나고 가바지 컬렉션이 되지 않고 않는다. 또한 memoize를 하는 오버헤드도 늘어나게 된다.

> premature optimization is the root of all evil - Donald Knuth

따라서 실제로 성능저하가 발견이 되고 (그리고 측정이 되고) 이를 개선하기 위해 memo를 사용해야지 코드를 작성하는 시점에 미리 예상을 해서 memo를 사용하는 것은 바람직해보이지 않는다.
