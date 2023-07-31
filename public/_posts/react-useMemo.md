---
title: 'React: useMemo 바로알기'
date: 2022-10-09 03:25
categories:
  - react
---

```jsx
const cachedValue = useMemo(calculationFn, [
  /* dependencies */
])
```

> `useMemo` is a React Hook that lets you cache the result of a calculation between re-renders. - react docs

어떤 값을 캐싱하고 싶다면 `useMemo` 훅을 사용하면 된다. 그런데 이게 무슨 의미일까?

## To skip calculation already done

예를 들어 데이터 셋으로부터 계산을 통해 특정 리스트를 만드는데, 계산의 복잡도가 높다고 가정해보자.

```jsx
// data set => list

const list = getListFromDataset(dataSet)
```

> **By default, when a component re-renders, React re-renders all of its children recursively.** - react docs

최로 렌더링 시 뿐만 아니라 앱이 렌더링 될 때 마다, 위 계산은 실행할 것이다.  
앱이 리렌더링 될 때 다시 계산하는 것이 아니라 이미 계산한 결과를 가져다 쓴다면 계산할 때 들어가는 비용을 없앨 수 있을 것이다.

React는 memoization을 위헤 `useMemo` 훅을 제공한다. useMemo로 특정 값을 감싸면 렌더링이 일어나도 dependencies가 변하지 않는 한 똑같은 값을 생성하지 않는다.

```jsx
const list = useMemo(listFromCalculation, [])
// ...

const listFromCalculation = () => {
  console.log('listFromCalculation called')
  return [1, 2, 3]
}
```

최초 렌더링시, listFromCalculation called가 로그에 찍히고 그 후 렌더링 시에는 찍히지 않는다.

### Expensive calculcation ?

계산 결과를 캐싱하여 이미 한 계산을 반복하지 않는 것은 알겠다. 그렇다면 계산 결과를 캐싱해야 하는 경우는 언제일까? 리액트를 사용하면 서 앱의 렌더링 퍼포먼스를 방해할 정도로 아주 무거운 계산을 수행해본 적이 없다. 왜냐하면 그 정도로 많은 양의 데이터 셋을 프론트에서 다뤄본 적이 없고 무엇보다 무거운 계산 같은 경우 서버에서 수행하는 것이 바람직 한 경우가 많기 때문이다.

## To skip re-rendering of components

`useMemo`가 memoization을 통해 이미 한 계산을 반복하지 않게 하는 경우 뿐만 아니라 앱의 리렌더링을 방지하는 경우도 있다.  
React에서 props이 이전과 동일하면 렌더링을 반복하지 않게 하기 위해 `memo` 함수를 제공한다.  
계산한 결과를 props로 넘겨주는 경우를 생각해보자

```jsx
const App = () => {
  const [now, setNow] = useState(0)
  const list = listFromCalculation()
  return (
    <>
      <List list={list} />
      <button
        onClick={() => {
          setNow(Date.now())
        }}
      >
        Render
      </button>
    </>
  )
}
```

`App`이 렌더링 될 때 마다, `listFromCalculation` 호출이 되고 `List`도 다시 렌더링 될 것이다.

```tsx
const list = useMemo(listFromCalculation, [])
```

`useMemo`를 사용하고

```tsx
const List = memo(({ list }: { list: number[] }) => {
  return (
    <ul>
      {list.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  )
})
```

`memo`로 `List` 컴포넌트를 감싸게 되면, `App`이 렌더링해도 `List`는 렌더링 하지 않는다.

> you ensure that it has the same value between the re-renders (until dependencies change). - react docs

왜냐하면 list는 이전과 같은 레퍼런스 아이디를 가지고 있기 때문이다.

## dependencies 주의!

dependencies로 객체를 사용하는 경우가 있다. 그런데 컴포넌트는 렌더링을 하면서 전부다 새롭개 만들어 낸다. 따라서 객체의 경우 렌더링 마다 항상 새로운 객체가 된다. 따라서 객체를 의존성 배열에 넣는다면 렌더링 마다 `useMemo`의 값이 이전 값을 사용하지 않고 새롭게 값을 만들어 낼 것이다. 따라서 의존성 배열을 지정할 때는 주의해야 한다. 의존성 배열에는 최대한 원시타입의 변수만 넣어주는 것이 best practice 이고, 만약 객체 타입을 넣고자 한다면 그 객체타입을 다시 `useMemo`로 캐싱하여 의존성 배열에 넣어줘야 한다.
