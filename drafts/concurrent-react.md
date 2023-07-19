---
title: "Concurrent React"
date:
categories:
  - react
---

## React는 UI를 어떻게 업데이트할까?

리액트도 자바스크립트이기 때문애 자바스크립트로 어떻게 UI를 그려내는지를 생각해보면 된다. DOM API에는 요소를 생성하고 DOM 트리에 요소를 삽입하는, 즉 DOM mutation을 수행할 수 있는 API가 있다.

```javascript
const app = document.getElementById("app");
const button = document.createElement("button");
app.appendChild(button);
```

createElement()를 통해서 요소를 생성하고, appendChild()를 통해서 DOM mutation을 수행한다.

## Single-threaded concurrency

## Synchronous rendering (Blocking rendering)

react 18 이전 렌더링 방식

start rendering => finish rendering

버벅거림.

## Concurrent rendering (Interruptible rendering)

react 18 이후 렌더링 방식

start v1 rendering => stop v1 rendering => start v2 rendering ..

edge cases가 존재. 렌더링 중 상태가 변경되는 경우

concurrency가 이루고자 하는 것은 ?

during v1 rendering, v2 can interrupt rendering.

자바스크립트 엔진은 싱글 쓰레드.

start v1 rendering => pause v1 rendering => start v2 rendering => finish v2 rendering => continue v1 rendering (or abandon v1 rendering) => finish v1 rendering

How react guarantees the consistency ? => Tearing issues

Main thread가 task를 수행한다.

trigger => render => commit

render in the background

## Concurrency in react

## References

- [What is tearing?](https://github.com/reactwg/react-18/discussions/69)
- [React 18](https://reactjs.org/blog/2022/03/29/react-v18.html)
- [Introducing Concurrent Mode](https://17.reactjs.org/docs/concurrent-mode-intro.html)
- [Concurrent UI Patterns](https://17.reactjs.org/docs/concurrent-mode-patterns.html)
- [The Story of Concurrent React](https://www.youtube.com/watch?v=NZoRlVi3MjQ)
- [Concurrent Rendering in React - Andrew Clark and Brian Vaughn - React Conf 2018](https://www.youtube.com/watch?v=ByBPyMBTzM0)
