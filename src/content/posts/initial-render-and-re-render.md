---
layout: '../../layouts/post-layout.astro'
title: 'Initial render와 Re render'
date: 2022-11-29 17:56
categories:
  - react
---

프론트엔드 개발을 하다 보면 렌더링(Rendering)이라는 단어를 많이 접하게 된다. 브라우저 렌더링, 클라이언트 사이드 렌더링, 서버사이드 렌더링, 컴포넌트 렌더링, 리렌더링... 상황에 따라 렌더링이 의미하는 것이 다르기 때문에 의미를 명확하게 할 필요가 있다.

[리액트 문맥에서 사용하는 렌더링](https://reactjs.org/docs/rendering-elements.html)에 대해 이야기 해보려고 한다.

> “Rendering” is React calling your components. - React docs

리액트에서 렌더링을 타이밍에 따라 두 단계로 구분할 수 있다.

- Initial Render
- Re Render

## Initial Render

### Trigger

리액트 앱을 최초로 실행할 때 일어나는 렌더링이다. `react-dom/clinet`의 `createRoot`를 통해서 앱의 컨테이너 역할을 하는 루트 노드를 생성한다. 그리고 루트 노드를 통해서 render 함수를 호출하여 초기 렌더링을 Trigger한다.

```tsx
const root = createRoot(container)

// CSR 환경인 경우
root.render(<App />)

// SSR 환경인 경우
hydrateRoot(container, <App />)
```

### Render

`render()`에 의해서 초기 렌더링이 트리거 되었다면 루트 컴포넌트(여기서는 `<App />`)을 호출한다. 이 과정에서 DOM노드를 생성한다.

### Commit

생성한 DOM 노드를 브라우저에 반영한다.

## Re Render

### Trigger

```tsx
setCount(count + 1) // ✅ Trigger render!
count++ // ❌ Not tirgger render!
```

컴포넌트의 state가 업데이트 되면 렌더링을 Trigger한다. (함수 컴포넌트에서는 렌더를 Trigger하는 `useState`, `useReducer`를 제공한다.) 초기 렌더링 이 후 일어나는 렌더링이기 때문에 리렌더링이라 한다.

### Render

`root.render()`를 다시 호출하는 것이 아니라 Render를 Trigger한 컴포넌트를 호출한다. 그리고 DOM 요소를 처음 부터 재생성하지 않고 이전 렌더(Previous render)와 비교하여 달라진 부분을 계산한다.

### Commit

달라진 부분을 비교하여(Reconciliation) DOM에 반영한다.

### Trigger + Render + Commit

컴포넌트를 호출하고 화면에 반영되는 과정을 Rendering이라고 포괄적으로 부를 수 있지만 리액트 공식문서는 이를 세 단계로 구분한다.

- Trigger: 렌더를 트리거하는 단계. render(), set 함수 등을 통해 렌더가 트리거 된다.
- Render: createElement()로 DOM요소를 생성하거나 또는 이전 DOM과 비교하는 단계.
- Commit: appendChild() 단계로 실제 DOM에 반영하는 단계

## References

[Render and Commit](https://beta.reactjs.org/learn/render-and-commit)
