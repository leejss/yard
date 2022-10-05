---
title: ""
date:
categories:
  - react
---

## Skipping re-rendering

```tsx
const cachedFn = useCallback(fn, dependencies);
```

useCallback은 캐시된 함수를 리턴한다. 리렌더링 시, 함수를 새로 생성하지 않고 캐시함수를 사용하기 위해 사용한다.  
그런데 함수를 캐시한다는 것은 무슨 뜻일까??

> In JavaScript, a function () {} or () => {} always creates a different function, - React beta docs

```js
const a = () => {};
const b = () => {};

console.log(a === b); // false
Object.is(a === b); // false
```

컴포넌트가 렌더링을 하면 컴포넌트 바디안에 있는 내용은 다시 실행한다. 따라서 함수도 새롭게 만들어 낸다. 그리고 그 새롭게 만들어 낸 함수가 다시 이벤트 헨들러가 되고 또 자식 컴포넌트의 props로 전달된다.
