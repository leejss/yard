---
title: "infer keyword로 타입 추론하기"
date: 2023-03-07 00:20
categories:
  - typescript
---

`infer`는 conditional type과 같이 쓰인다. conditional type은 어떻게 구현할

## `extends`

타입스크립트에서 extends는 두 가지 용도로 쓰인다.

1. 타입 파라미터가 가질 수 있는 타입의 후보를 정한다.

보통 extends 키워드는 제네릭과 함께 쓰인다. 타입 파라미터에 들어갈 수 있는 타입을 제한(constraint)하는 목적으로 extends를 활용한다. 에를 들면 다음과 같이 사용할 수 있다.

```typescript
function foo<T extends string | number>(args: T) {}
```

근데 위 함수를 이렇게도 쓸 수 있지 않을 까 생각할 수도 있다.

```typescript
function foo(args: string | number) {}
```

파라미터의 타입을 제한한다는 점에서는 같다. 그런데 다음을 확인해보자.

```typescript
function foo<T extends string | number>(args: T) {
  const msg: T = "hello"; // ❌ Type 'string' is not assignable to type 'T'.  'string' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'string | number'.
}
```

T 타입을 가진 `msg`에 `string` 타입의 값을 할당하려고 했는데 에러가 났다.

```typescript
const msg: string | number = "hello";
```

반면 위 표현식은 에러가 발생하지 않는 표현식이라는 것은 잘 알고 있다. 따라서 우리는 `T extends string | number`에서 `T`와 `string | number`가 다르다는 사실을 알 수 있다. T는 one of two이지, both는 아니다.  
어쨌든 `extends`는 제네릭에서 타입 파라미터가 가질 수 있는 타입을 제한하는 목적으로 사용한다.

2. conditional type

타입을 정의할 때 조건에 따라 타입을 달리하고 싶은 경우에 활용한다. 특히, Conditional type을 마치 함수처럼 사용해서 기존 타입으로부터 새로운 타입을 만들때 자주 쓴다. 그리고 여기에 `infer`를 활용하면 나만의 유틸리티 타입을 만들 수 있다.

## infer

`infer`는 conditioanl type에서 쓰이며 말 그대로 특정 타입을 추론하기 위해 사용한다. 메타마스크의 core 모듈을 살펴보면 다음과 같은 유틸리티 타입들이 있다.

```typescript
export type ExtractActionParameters<Action, T> = Action extends {
  type: T;
  handler: (...args: infer H) => any;
}
  ? H
  : never;

export type ExtractActionResponse<Action, T> = Action extends {
  type: T;
  handler: (...args: any) => infer H;
}
  ? H
  : never;
```

위 코드를 보면 `infer`가 어떤 역할을 하는지 이해를 바로 할 수 있다. 타입스크립트의 유틸리티 타입들도 위 같은 구조로 되어 있다.

```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

정의만큼 중요한게 어떻게 사용하느냐이다. `infer`를 왜 사용해야 하고 이를 어떻게 활용할 수 있는지에 대해 고민해야 한다. 어떻게 사용하는지에 대해 고민해보고 그 다음 정의를 구현해보는 것도 공부에 도움이 된다.

```typescript
const name: ExtractName<{ name: "Alice" }> = "Alice"; // 여기서 변수 name의 타입은 "Alice"가 된다.

// 어떻게 구현할 것인가?

type ExtractName<T> = T extends { name: infer N } ? N : never;
```
