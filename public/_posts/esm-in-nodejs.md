---
title: 'ESM in Nodejs'
date: 2023-05-07 19:16
categories:
  - javascript
  - typescript
---

## Nodejs module system

Javascript의 대표적은 모듈 시스템 두 가지

- ESM (ECMAScript module)
- CJM (CommonJS module)

Nodejs의 기본 모듈 시스템은 CommonJS module이지만 ESM을 지원하기 위해 노력하고 있다.

### `package.json`의 `type` field

```json
// pacakge.json
{
  "type": "module" // or "commonjs"
}
```

`"type": "module"` 은 .js 파일이 CommonJS module이 아닌 ES module 인것을 의미한다. Nodejs 런타임에서 ES module로 사용하게 되면 몇 가지 다른 규칙들이 추가 된다.

- import, export 문, top level await 문을 사용할 수 있다.
- relative import path는 full file extension을 필요로 한다.
- require()나 \_\_dirname같은 글로벌을 바로 사용할 없다.
- CommonJs 모듈을 바로 사용할 수는 없다.

여기서 _relative import path는 full file extension을 필요로 한다._ 는 규칙을 눈여겨 봐야 한다. 이는 이후 타입스크립트 컴파일러 옵션의 `module`로 이어지기 때문이다.

Nodejs에서 ES module을 사용할 경우 (즉, type이 module인 경우), 모듈을 불러올 때 file extension(.js)를 import path에 포함시켜야 한다.

```js
import add from './add' // ❌ Cannot find module

import add from './add.js' // 🟢
```

#### Typescript

타입스크립트로 작성하는 경우를 생각해보자. 타입스크립트의 compilerOptions.module를 통해서 어떤 모듈시스템(ESM or CommonJS)으로 컴파일 할 것인지 설정할 수 있다.  
그런데 다음과 같은 문제 상황이 발생할 수 있다.

- package.json의 type 필드의 값이 module
- compilerOptions.module의 값이 ES6(or ES~)

위 둘의 조합은 문제를 야기할 수 있다. 왜냐하면 NodeJS에서 ES module을 사용하기 위해서는 import할 때 .js를 붙어야 하는데 컴파일 시, 파일 확장자를 자동으로 붙여주는 것이 아니기 때문이다.

```ts
// index.ts
import add from './add'

// 컴파일 이 후 index.js
import add from './add'
```

위 같은 상황을 위해서 타입스크립트는 compilerOptions.module 값으로 node16 또는 nodenext를 설정할 수 있다. 이 옵션을 사용하면 타입스크립트로 작성을 할 때 명시적으로 .js를 붙이도록 강제한다.
