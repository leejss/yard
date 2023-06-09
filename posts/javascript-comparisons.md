---
title: 'Javascript comparisons'
date: 2022-09-13 13:44
categories:
  - javascript
---

A value와 B value가 서로 같은지 체크하고자 할 때 우리는 비교 연산자를 사용한다.

## triple-equals `===`

strict equality를 체크할 때 === 를 사용한다. 그런데 반드시 “strict”하지 않는다.

```jsx
3 === 3.0 // true
'yes' === 'yes' // true
null === null // true
false === false // true

42 === '42' // false
'hello' === 'Hello' // false
true === 1 // false
0 === null // false
'' === null // false
null === undefined // false
```

위 예시가 `===`의 일반적인 usecases다.

왜 반드시 strict하지 않냐면 `===` 가 거짓말을 하는 경우가 두 가지 있다.

```jsx
NaN === NaN // false
0 === -0 // true
```

위 두 가지 경우에는 `===`를 사용하면 안 된다. 대신 `Object.is()`나 `Number.isNaN()`을 사용해야 한다.

---

`===` 를 보면 type과 value를 체크한다. 그래서 type이 다르면 `false`를 반환한다. 그런데 사실 자바스크립트의 comparisons은 `===` 뿐 만 아니라 모두 타입 비교를 한다. `===`는 비교 과정에서 type conversion(aka coercion)을 허락하지 않는다.

## Coercive Comparisons `==`

비교하고자 하는 두 변수의 타입이 같으면 `==`와 `===`의 차이는 없다.

그런데 타입이 다르면 두 연산자는 다르게 동작한다.

`==`는 먼저 type conversion을 수행한다. 그 다음 값을 비교한다.

`==`를 loose equality라고 하는 경우가 있는데 그 대신 coercive equality라고 불려야 한다.

따라서 다음과 같은 경우가 발생한다.

```jsx
42 == '42' // true
1 == true // true
```

어떤 두 값을 비교할 때 타입이 다른 경우 의도치 않게 coercion이 일어날 수 있다. 따라서 `==`는 주의해서 사용해야 한다.

## Object comparisons

객체에 대하여 ===는 structural equality 비교가 아닌 reference(identity) equality 비교를 수행한다.

```jsx
const a = [1,2,3]
const b = a

a === b // true

a === [1,2,3] // false -> identity가 서로 다르다.

[] === [] // false
{} === {} // false
```

## Object.is

=== 보다 더 strict한 비교 수단이다.

```jsx
Object.is(NaN, NaN) // true
Object.is(0, -0) // false
```

===와 마찬가지로 객체 비교에서는 reference를 체크한다.

```jsx
Object.is([], []) // false
```
