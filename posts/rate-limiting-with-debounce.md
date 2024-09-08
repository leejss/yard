---
date: "2023-12-26"
title: "Rate limiting with debounce"
---

# Rate limiting by awaiting a function call and clearing a timeout

```typescript
// without debounce

const callback = () => {
  console.log("Handle event")
}

callback() // Handle event
callback() // Handle event
callback() // Handle event
callback() // Handle event
callback() // Handle event
callback() // Handle event
callback() // Handle event
callback() // Handle event
callback() // Handle event

// with debounce
const debouncedCallback = debounce(callback, 1000);

debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()
debouncedCallback()

// after 1 second
// Handle event
```

Limiting function calls

스케쥴링 함수 중 하나인 `setTimeout`을 이용하여 함수 호출을 지연시킬 수 있다. 그리고 클로저를 이용하여 함수의 호출 상태를 관리 한다.

```typescript
function debounce(fn, wait) {
  let timeout = null
  let debounceFn = null

  const clear = () => {
    // 함수 호출을 취소하고 상태를 초기화 한다.
     if (timeout) {
      clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  }
  const debounceWrapper = function () {
    // ...

    // 이전에 기록된 함수 호출을 취소하고 상태를 초기화 한 후
    clear();

    // 새로 함수를 기록한다.
    debouncedFn = function () {
      fn();
    };

    // 그리고 함수 호출을 스케쥴링 한다.
    timeout = setTimeout(function () {
      const call = debouncedFn as Function;
      debouncedFn = null;
      return call();
    }, wait);
  };

}
```

따라서 함수를 연속적으로 호출하더라도 이전 함수 호출을 취소하고 새로운 함수를 스케쥴링하기 때문에 함수호출을 한 번만 발생시킬 수 있다.
