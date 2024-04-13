---
title: 'Cancel timer'
date: 2023-03-10 09:41
categories:
  - javascript
---

## Cause of memory leak

`setTimeout` 또는 `setInterval` 에 등록한 callback(timer) 은 가비지 콜렉트가 되지 않는다. 따라서 반복해서 타이머를 등록하는 경우 memory leak문제가 발생할 수 있다. 특히 리액트 처럼 함수가 반복적으로 호출되는 환경에서 setTimeout을 사용한다면 memory leak을 주의해야 한다.

## `clearTimeout`, `clearInterval`

timer를 메모리에서 삭제 시킬려면 clear함수를 호출해야 한다.

```ts
const timerId = setTimeout(() => {}, 1000)
clearTimeout(timerId)
```

타이머의 콜백을 호출하고 그다음 바로 clear할 수 있다면 memory leak문제를 해결할 수 있다.

```ts
const registerTimer = (cb, delay) => {
  const timerId = setTimeout(() => {
    cb()
    clearTimeout(timerId)
  }, dalay)
  return () => clearTimeout(timerId)
}
```

callback과 closure를 이용하여 registerTimer 함수를 만들었다. 콜백을 실행하여 바로 clear하도록 했고 또 clear함수를 직접 호출할 수 있게 했다.

```ts
const cancelTimer = registerTimer(() => {
  console.log('Hello World')
}, 1500)

cancelTiemr() // delay 이전에 cancel하고 싶은 경우.
```
