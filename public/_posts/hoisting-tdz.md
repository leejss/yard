---
title: 'Hoisting, TDZ'
date: 2022-10-10 14:17
categories:
  - javascript
---

## Hoisting

> The term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called hoisting. - You Don't Know JS Yet: Scope & Closures - 2nd Edition Chapter 5

변수는 식별할 수 있는 이름을 가지고 있다. 그리고 그 이름은 자바스크립트 프로그램이 실행하기 전에 일종의 컴파일(또는 파싱)단계를 거쳐서 스코프에 등록(register)한다. 자바스크립트 엔진은 변수 이름을 만나면 스코프 매니저에게 이름이 현재 스코프에 등록이 되어 있는지 묻고 이를 스코프 매니저가 답하는 과정에서 변수를 다루게 된다.

자바스크립트 프로그램이 실행하기 전에 변수의 이름이 스코프에 등록하기 때문에 변수의 선언은 밑에 있더라도 자바스크립트 엔진은 변수의 이름을 볼 수 있는 것이다. 이렇게 변수의 이름이 스코프에 등록이 되고 엔진이 볼 수 있는 이 프로세스를 hoisting이라 한다.

hoisting에는 두 가지 타입이 있다. Variable hoisting과 Function hoisting이 있다.

### Variable hoisting

자바스크립트에서 [변수를 선언하는데 사용하는 키워드는 var, let, const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements#declaring_variables)가 있다.  
var hoisting과 let, const hoisting에 차이가 있다. (You Don't Know JS Yet을 보면 var hoisting을 Variable hoisting으로 설명하고 있다. 따라서 Variable hoisting이라고 하면 var hoisting이라고 보면 된다.)

`var`는 function-scoped 변수를 생성하지만, `let`과 `const`는 block-scoped 변수를 생성한다. 따라서 `var`는 변수 식별자를 가장 가까운 function scope에 등록하지만 `let`과 `const`는 가장 가까운 block에 scope를 등록한다.  
그리도 또 하나의 차이점은 var hoisting된 변수는 `undefined`로 자동 초기화(auto-initialization)를 하지만 let과 const는 자동초기화를 하지 않는다.

```js
console.log(a) // undefined
var a = 'hello'
```

위 코드가 동작하는 이유는 var hoisting에서는 자동초기화가 일어나기 때문이다.

```js
console.log(a) // ReferenceError: Cannot access 'a' before initialization
let a = 'hello'
```

`let`과 `const`는 자동초기화가 일어나지 않는다. `let`과 `const`의 초기화는 오직 직접 초기화를 수행한 경우 일어난다.

### Function hoisting

```js
// Functuon declaration
function foo() {}

// Function expression (anonymous)
var boo = function () {}

// Function expression (named)
var hoo = function hoo() {}
```

function hoisting은 function declaration에서만 일어난다.  
function hoisting은 variable hoisting과 다른 점이 있다. 먼저 이름이 스코프에 등록된다는 것은 동일하다. 그리고 자동 초기화가 일어난데 `undefined`가 아닌 변수에 실제 function value가 할당된다.

> Pay close attention to the distinction here. A function declaration is hoisted and initialized to its function value (again, called function hoisting). - You Don't Know JS Yet: Scope & Closures - 2nd Edition

```js
foo() // foo
console.log(foo) // [Function: foo]

function foo() {
  console.log('foo')
}
```

따라서 함수 선언문은 위치에 상관없이 callable하다.  
반면 함수 표현식에서는 function hoisting은 일어나지 않는다. var로 선언한 변수에 함수가 할당하는 방식이기 때문에 Variable hoisting이 일어난다.

```js
console.log(foo) // undefined

var foo = function () {
  console.log('foo')
}
```

## Temporal Dead Zone

TDZ는 초기화 하지 않는 변수(Uninitialized Variables)를 사용할 수 있는 time을 가리키는 용어다.

> The term coined by TC39 to refer to this period of time from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone (TDZ).

var로 선언한 변수는 hoisting이 되면서 undefined로 자동 초기화가 일어난다. 반면 let과 const는 hoisting은 되지만 (visible from the entering of the scope) 자동초기화가 일어나지 않는다.

> The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way.

hoisting은 일어나서 scope내에서 visible 하지만 초기화하지 않아 RefernceError가 발생한다. TDZ는 바로 이런 상태, 즉 변수의 초기화가 되지 않아 사용할 수 없는 상태 또는 일종의 time length를 나타내는 단어다.  
사실 TDZ를 의식하지 않더라고 우리는 TDZ를 피하면서 자바스크립트를 사용해 왔을 것이다. 예를 들어 다음 코드가 잘못됐다는 것은 쉽게 알 수 있다.

```js
// TDZ
console.log(a) // ReferenceError: Cannot access 'a' before initialization

let a = 123 // Where TDZ ends
```

그런데 Function hoisting이 일어나게 되면 좀 더 실질적인 TDZ를 느낄 수 있다.

```js
speakName()

let a = 'helloo'
function speakName() {
  console.log(a)
}
```

위 코드에서 에러가 발생할까? 발생한다면 무슨 에러가 발생할까?  
`ReferenceError: Cannot access 'a' before initialization` 가 발생한다. function hoisting이 일어나 자동초기화가 일어나는데 그 시점에 아직 `let`으로 선언한 변수 `a`는 초기화 되지 않은 상태다. 즉 TDZ에 놓여 있다. 따라서 에러가 발생한다.  
따라서 functiond declaration과 let, const 등 TDZ의 위험이 있는 변수를 사용한다면 function hoisting으로 인해 TDZ가 발생하지는 않는지 경계해야 한다.

## Reference

- [You Don't Know JS Yet: Scope & Closures - 2nd Edition Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md#a-conversation-among-friends)
- [You Don't Know JS Yet: Scope & Closures - 2nd Edition Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)
