---
title: 'Nodejs에서 Babel 사용하기'
date: 2022-12-27 4:10
categories:
  - javascript
---

ES6의 import, export를 사용한 스크립트를 nodejs환경에서 실행하려고 하면 에러가 발생한다.

```js
// server.js
import express from 'express'

const app = express()
const PORT = 8080

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
```

```zsh
node server.js
```

```txt
(node:98980) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/Users/leejss/dev/serverside/server.js:1
import express from "express";
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1088:15)
    at Module._compile (node:internal/modules/cjs/loader:1123:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Module._load (node:internal/modules/cjs/loader:878:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.12.1
```

Nodejs의 모듈 방식은 Commonjs이기 때문에 에러가 발생한다. `import` 문을 사용하려면 `package.json`의 타입을 `module`로 바꾸거나 `.mjs` 확장자를 사용하라고 알려준다.

위 방법을 사용하지 않고 Babel을 사용하여 코드를 transpile하여 Nodejs에서 실행하도록 바꿀 수 있다.

## [@babel/cli](https://babeljs.io/docs/en/babel-cli)

커맨드라인에서 자바스크립트 코드를 transpile할 수 있게하는 도구다. 따라서 .babelrc를 설정하고 다음과 같이 커맨드라인에서 babel을 사용할 수 있다.

```json
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```

```zsh
npx babel server.js --out-file server-babel.js
```

여기까지 실행하면 `server-babel.js`가 만들어지고 내용은 다음과 같을 것이다.

```js
// server-babel.js
'use strict'

var _express = _interopRequireDefault(require('express'))
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
var app = (0, _express['default'])()
var PORT = 8080
app.get('/', function (req, res) {
  res.send('hello')
})
app.listen(PORT, function () {
  console.log('http://localhost:'.concat(PORT))
})
```

이 코드를 run하면 정상적으로 실행된다.

```zsh
node server-babel.js
```

## [@babel/node](https://babeljs.io/docs/en/babel-node)

커맨드라인에서 자바스크립트 코드를 transpile하고 이를 다시 run하는 과정에 개발 단계에서는 다소 번거로울 수 있다. `@babel/node`를 통해 이 과정을 간소화할 수 있다.

> babel-node is a CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it.

`babel-node` 커맨드를 통해서 transpile과 run을 같이 할 수 있다. 따라서 다음과 같이 실행하면 된다.

```zsh
npx babel-node server.js
```

편리한 만큼 비용이 따른다. Babel 공식문서에서는 이를 프로덕션 환경에서 사용하는 것을 추천하지 않는다.

> You should not be using babel-node in production. It is unnecessarily heavy, with high memory usage due to the cache being stored in memory.

## [@babel/register](https://babeljs.io/docs/en/babel-register/)

@babel/register는 자바스크립트 코드를 transpile할 수 있는 방법 중 하나로, 빌드 단계가 아니라 런타임 단계에서 transpile할 수 있는 방법을 제공한다. 따라서 babel-node와 마찬가지로 프로덕션 환경에 적합하지 않다. (프로덕션 환경이라면 빌드 단계에서 transpile하는 것이 유리하다.)

@babel/register는 훅 패턴으로 코드를 transpile할 수 있으며 사용 방법은 다음과 같다.

```js
// index.js
require('@babel/register')({
  presets: ['@babel/preset-env'],
})

require('./server')
```

```zsh
node index.js
```
