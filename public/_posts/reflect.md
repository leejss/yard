---
title: "ES6 Reflect"
date: 2023-02-23 23:30
categories:
  - javascript
---

Reflect는 object에 특정 행동을 수행할 수 있는 여러 정적 메소드를 제공해주는 전역 객체다. 간단한 메소드를 알아보자

### 1. get

```typescript
const obj = {
  message: "hello",
};

const result = Reflect.get(obj, "message");
console.log(result); // hello
```

### 2. set

```typescript
const obj = {
  message: "hello",
};

Reflect.set(obj, "message", "world");
console.log(obj); // { message: "world" }
```

### 3. has

```typescript
const obj = {
  message: "hello",
};

Reflect.has(obj, "message"); // true
Reflect.has(obj, "text"); // false
Reflect.has(obj, "toString"); // true
```

`in` operator와 동일하게 동작하기 때문에 기본 내장 프로퍼티도 감지한다.

### 4. apply

Function.prototype.apply와 차이점은 있지만 기본적인 행동은 동일하게 동작한다. 즉, this와 arguments를 동적으로 전달하여 함수를 호춢한다.

```typescript
function sum(a: number, b: number) {
  return a + b;
}

const result = Reflect.apply(sum, null, [4, 5]); // 9
```

이 외에도 여러 메소드들이 존재한다.
