---
title: "타입스크립트에서 클래스 다루기 - 2"
date: 2022-10-29 23:31
categories:
    - typescript
---

## `this`

자바스크립트에서 this가 어렵다고 느낀 이유는 this context가 다이나믹하게 바뀌기 때문이다. 예를 들어 다음 코드를 보자

```js
// javascript
class Person {
    name = "James";
    logName() {
        console.log(this.name);
    }
}

const p = new Person();
p.logName(); // James

const obj = {
    name: "obj",
    sayName: p.logName,
};

obj.sayName(); // obj
```

`this` context는 함수를 어떻게 호출하냐에 따라 결정된다. `obj`를 통해서 `logName`을 호출하면 `this` context는 클래스 인스턴스가 아닌 `obj`로 결정된다.  
this context를 클래스 인스턴스로 고정시키는 방법은 arrow function을 사용하는 것이다.

```js
class Person {
    name = "James";
    logName = () => {
        console.log(this.name);
    };
}

const p = new Person();
p.logName(); // James

const obj = {
    name: "obj",
    sayName: p.logName,
};

obj.sayName(); // James
```

대신 이 방식에는 몇 가지 [trade-offs](https://www.typescriptlang.org/docs/handbook/2/classes.html#arrow-functions)가 있다.

### `this` parameter

arrow function을 사용하는 대신 타입스크립트에서는 this context를 명시적으로 설정하여 컴파일 단계에서 context를 타입체크할 수 있다.

```ts
class Person {
    name = "James";
    logName(this: Person) {
        console.log(this.name);
    }
}

const obj = {
    name: "obj",
    sayName: p.logName,
};

obj.sayName(); // ❌ Compile error
// The 'this' context of type '{ name: string; sayName: (this: Person) => void; }' is not assignable to method's 'this' of type 'Person'.
// Property 'logName' is missing in type '{ name: string; sayName: (this: Person) => void; }' but required in type 'Person'
```

this context를 정하는 방법에서 arrow function은 런타임 행동이고 this parameter는 컴파일 타임 행동이다.

### `this` type

this의 타입은 동적으로 결정된다. 왜냐하면 클래스를 상속하는데 사용할 수 있기 때문이다.

## References

-   [Typescript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
