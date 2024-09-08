---
title: 'ES6 Module System'
date: 2023-08-15 23:43
categories:
  - javascript
---


ES6 module system - javascript standard module system
Module system can split large codes into smaller pieces
모듈 시스템을 통해서 자바스크립트 모듈을 만들 수 있고 모듈을 import, export 할 수 있다.
We can import or export things through the module system

## Static nature of es6 module system

what does 'static' mean?
meaning it is not dynamic. it does not have runtime behaviors
We cannot dynamically import or export things at runtime.

기본적으로 ES6의 모듈 시스템은 Static이다. 이는 런타임 행동이 없다는 것을 의미한다. 동적으로 모듈을 생성하거나, 모듈을 export 할 수 없다. (See dynamic import)

By this nature, we can analyze and make module graph then parse.
This leads to some features like tree shaking, optimize bundling and editor's refactoring tools or code lens features.

이러한 ES6의 정적인 특성 (Static nature) 덕분에 모듈 간 Dependency graph를 만들 수 있고 Vite같은 번들러가 Tree shaking할 수 있게 하고, VSCode같은 에디터를 통해서 Refactoring, code lens feature 등을 사용할 수 있게 해준다.

## ES6 in browser

### 모던 브라우저는 ES6 모듈 시스템을 지원한다

module script를 통해서 ES6 모듈 시스템을 사용할 수 있다.

```js
<script type="module" src="./main.js"></script/>

// or you can use inline module script

<script type="module">
 // do something
</script>

```

### Using import and export inside `.js` file

다음 import statement를 살펴보자.

```js
// import statement

import A from "B";
```

When javascript engine encounter this line, how js engine locate module "B" ?

자바스크립트 엔진이 위 import statement를 만났을 때, 어떻게 모듈 "B"의 위치를 찾을 수 있는 걸까?
여기엔 다음 개념이 사용된다.

- module resolver
- module loader
- module resolution algorithm

Module resolver가 모듈 "B"의 정확한 위치를 정하고 Module loader가 모듈을 불러오고 execute 한다.

<https://nodejs.org/api/esm.html#resolution-and-loading-algorithm>
<https://www.typescriptlang.org/docs/handbook/module-resolution.html>

이제 `main.js`의 import statement를 살펴보자

```js
// inside main.js

// which is error in the perspective of browser 

import {foo} from "./utils"
// or 
import {foo} from "./utils.js"
```

=> Browser cannot find "utils". this will be error

자바스크립트 또는 타입스크립트 모듈을 불러올 때, 아마 `.js` (or `.ts`) 확장자를 생략하는 경우가 더 많을 것이다. 만약 확장자를 생략했는데 정상적으로 자바스크립트 모듈을 불러온다면 이는 어떤 자바스크립트 툴링이 관여되어 있다는 뜻이다.
기본적으로 브라우저의 module resolver는 확장자가 없으면 모듈을 찾지 못한다. 사실 이는 당연하다. 확장자가 없으면 이 파일이 자바스크립트인이 CSS인지 어떻게 알 수 있나?

그렇기 때문에 기본적 ES6 모듈 시스템에서는 자바스크립트 확장자를 생략하지 않는다.  

But we familiar with omitting js extension .
개발을 할 때, 확장자를 제외하고 import statement를 작성했는데 에러가 없다면,
it means that some tooling get involved.

## ES6 in nodejs

Nodejs has two module systems - Commonjs and ES6

Nodejs에는 CommonJS와 ES6 두 가지 모듈 시스템이 있다

We need to specify what module system I use.

1. use .mjs extension
2. package.json type property. it tells that this package will use es6 module system -> all .js will be treated es6 module

따라서 Nodejs에서 ES6 모듈을 사용하기 위해서는 명시해줘야 한다.기본적으로 다음 두 가지 방법으로 명시할 수 있다.

1. .mjs extension
2. `"type": "modoule"` in `package.json`

package.json에서 type을 module로 하면 Nodejs는 이 패키지가 ES6모듈 시스템을 사용한다고 가정한다. 따라서 .js 파일은 ES6 모듈이 된다.
.mjs 확장자는 이보다 좀 더 파워풀한 시그널이다. 아예 확장자를 통해서 이 자바스크립트 파일은 ES6 모듈임을 알리는 것이다.
