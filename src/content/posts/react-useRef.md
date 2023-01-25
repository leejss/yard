---
layout: '../../layouts/post-layout.astro'
title: "React: useRef 바로알기"
date: 2022-10-06 14:38
categories:
  - react
---

## Ref

useRef는 ref를 생성한다. ref는 주로 두 가지 일을 한다.

1. 렌더링과 관계없는 value를 저장한다.
2. DOM을 조작한다.

## state vs. ref

state와 ref의 공통점은 둘 다 렌더링 시 값이 유지한다. 그러나 state는 렌더링과 관계있고 ref는 렌더링과 관계가 없다. ref의 변화는 리렌더링을 일으키지 않는다.  
또 한 가지 차이점은 ref는 mutable하고 state는 immutable하다. 따라서 state는 set함수를 통해 값을 변경할 수 있고 ref는 current 속성에 바로 접근하여 값을 변경할 수 있다.  
state는 값이 바뀌면 reference identity가 바뀌지만 ref는 바뀌지 않는다.

> When a piece of information is used for rendering, keep it in state. When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient. - React docs

### reference identity

```js
console.log({} === {}); // false
console.log(Object.is({}, {})); // false

console.log(
  Object.is(
    () => {},
    () => {}
  )
); // false
```

위 코드에서 로그가 false로 나오는 이유는 두 객체의 reference identity가 다르기 때문이다. 객체 리터럴은 항상 새로운 객체를 생성한다. 자바스크립에서 객체 비교는 객체의 구조를 비교하는 것이 아니라 reference identity를 비교 한다.

```js
const obj1 = {};
const obj2 = obj1;

console.log(obj1 === obj2); // true
```

두 변수의 reference가 같기 때문에 위 비교는 true가 된다.

---

useState가 반환하는 set함수는 항상 새로운 객체를 리턴하기 때문에 이전 state 값과 set 이 후 현재 state값의 reference identity가 다르다. 반면 useRef는 직접 mutation을 하기 때문에 렌더링 사이에 같은 reference identity를 유지한다.

```tsx
let prevRef: any;

const App = () => {
  const [val, setVal] = useState(0);
  const ref = useRef({
    count: 0,
  });

  prevRef = ref;

  return (
    <div>
      <button
        onClick={() => {
          setVal((prev) => prev + 1);
          ref.current.count += 1;
          console.log(prevRef === ref); // true. prevRef와 ref는 같은 reference를 가지고 있다.
        }}
      >
        Render {val}
      </button>
    </div>
  );
};
```

## DOM과 ref

ref를 통해서 DOM 노드를 참조할 수 있다.

```jsx
<div ref={ref} />
```

그렇다면 ref를 사용할 수 있는 타이밍은 언제일까?  
React는 화면을 그려내는 과정을 두 단계로 나눈다.

- render: 컴포넌트 함수를 호출하여 무엇을 화면에 그려야 하는 지 정한다.
- commit: 결과를 실제 DOM에 반영한다.

```tsx
const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  console.log("During rendering: ", ref.current); // During rendering:  null
  useEffect(() => {
    console.log("After rendering", ref.current); // After rendering <div>​</div>​
  });
  return <div ref={ref}></div>;
};
```

위 코드를 보면 알 수 있듯이 ref는 render 단계가 아닌 commit 단계에서 attach 된다.

> React sets `ref.current` during the commit. - React docs

## References

- [When React attaches the refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs)
- [Referencing Values with Refs](https://beta.reactjs.org/learn/referencing-values-with-refs)
- [When to use refs](https://beta.reactjs.org/learn/referencing-values-with-refs#when-to-use-refs)
