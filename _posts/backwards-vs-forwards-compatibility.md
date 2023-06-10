---
title: 'Backwards compatibility vs. Forwards compatibility'
date: 2022-09-11 14:29
categories:
  - javascript
---

## backwards compatibility

- valid JS(valid syntax, valid method 등)인 것이 invalid될 미래의 변화가 없다는 것.
- 예를 들면 95년도 작성된 자바스크립트가 현재의 JS 엔진에서도 문제 없이 동작하는 것을 의미한다.
- [Breaking the web](https://github.com/tc39/tc39.github.io/issues/57)
- innovative한 JS feature가 쉽게 추가 되지 않는 이유도 바로 backwards compatibility를 만족해야 하기 때문이다.

## forwards compatibility

- backwards compatibility가 old JS in current environment(또는 engine)이라면 forwards는 반대로 Current JS in old environment다.
- 예를 들어, 최신 자바스크립트가 이전 버전의 JS 환경에서도 문제없이 작동해야 한다는 것이다.
- 자바스크립트는 forwards compatibility를 만족하지 않는다.

## transpile and polyfill(aka "shim")

- 자바스크립트는 forwards compatibility를 만족하지 않기 때문에 개발자는 자바스크립트와 자바스크립트 런타임 환경의 gap을 메꿔야 한다.
- 대표적인 두 가지 방법은 transpile과 polyfill이다.
- transpile은 new syntax를 old syntax로 바꾸기 위해 사용한다.
- polyfill은 현재 자바스크립트에서 지원하는 method 또는 API를 옛 JS 환경에 추가해주기 위해 사용한다.
- 대표적으로 babel이 있고 최근에는 swc도 사용되고 있다.
