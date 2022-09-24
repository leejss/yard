---
title: "[You Don't Know JS Yet] Lexical Scope"
date: 2022-09-15 13:55
categories:
  - javascript
---

이 글은 [You Don't Know JS Yet: Scope & Closures - 2nd Edition](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)의 챕터1과 챕터 2 부분을 읽고 정리한 글 입니다.

## Two Phases (compile then execute)

자바 스크립트는 스크립트이기 때문에 당연히 interpreted language이고 컴파일 단계는 생략된 언어라고 생각했다. 그런데 사실 그렇지 않았다. 자바스크립트 프로그램은 실행 전 parsing(또는 compilation)과정을 거치고 그 다음 실행한다.

> To state it as simply as possible, the most important observation we can make about processing of JS programs is that it occurs in (at least) two phases: parsing/compilation first, then execution.

JS엔진이 자바스크립트를 실행 전 parsing하는 것을 알 수 있는 증거는 Syntax error와 hoisting이다.
![](https://a.storyblok.com/f/171155/1394x910/8d9046bda9/screen-shot-2022-09-16-at-12-07-34-am.png)
로그가 출력되지 않았다. 파싱과정에서 에러가 생겼기 때문이다.  
JS 엔진이 자바스크립트를 대할 때, line by line으로 statement를 실행하는 것이 아닌, 그 전에 parsing을 한다는 mental model을 가져야 자바스크립트를 잘 이해할 수 있다.

## Target reference

변수는 사용에 따라 target 또는 source 두 가지로 나눌 수 있다.
다음 코드는 전부 target reference 상황이다.

```js
var age = 64;

for (const number of numbers) {
} // 루프 변수 타겟

getUserById(23); // 파라미터가 타겟

function getUserById() {} // 함수선언은 타겟
```

## Lexical Scope

> To narrow this chapter down to a useful conclusion, the key idea of "lexical scope" is that it's controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.

스크립트를 작성하면서 우리는 변수를 선언한다. 글로벌로 변수를 선언할 수 있고 함수 안에다 선언할 수 있고 block(`{}`)안에 선언할 수 있다. JS엔진이 변수의 스코프를 정할 때 이 변수가 어디에서 선언되었는지를 보고 스코프를 결정한다.

처음에 Lexical이라는 단어를 보고 사전에 검색했는데 어휘의 이런 뜻이어서 이해하는데 힘들었다. 알고보니 언어의 컴파일 단계에서 Lexing이라는 단계가 있고 Lexical은 여기에서 온 단어인 것 같다.

자바스크립트의 컴파일 단계에서 각각의 identifier들의 lexical scope가 결정되고 프로그램 실행에 필요한 일종의 스코프 맵을 형성한다. 이 단계는 아직프로그램이 실행되기 전이기 때문에 실제로 메모리에 할당되지 않는다.

## Not defined vs undefined

![](https://a.storyblok.com/f/171155/1400x272/5ace313cce/screen-shot-2022-09-16-at-12-49-18-am.png)
Not defined는 실제로 Not declared의미다. 무슨 의미냐면 lexically available한 scope에서 해당 identifier와 매칭되는 것을 찾을 수 없다는 뜻이다.  
하지만 undefined는 변수는 declared되었지만 이 안에 value가 없다는 뜻이다.
