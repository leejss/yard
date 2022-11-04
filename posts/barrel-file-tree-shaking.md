---
title: "타입스크립트 Barrel file의 Tree shaking 문제"
date: 2022-11-04 15:43
categories:
  - react
---

## Barrel file 또는 Barrel module이란

배럴 모듈은 다른 모듈을 re-export함으로써 모듈을 모으는 역할을 하는 모듈이다. 일반적으로 module resolution 규칙에 맞게 `index.js` 또는 `index.ts`로 만든다.

## Barrel file을 사용한 폴더 구조

배럴 모듈 또는 배럴 파일을 사용하는 이유는 이를 통해 깔끔한 폴더 구조를 만들 수 있기 때문이다. 특정 컴포넌트를 불러올 때 만약 그 컴포넌트의 코드가 깊숙히 위치해 있다면 import 문이 길어진다.

```jsx
import Button from "@components/base/Button/Button";
```

import 문이 길어진다는 것은 곧 더 많은 텍스트가 필요하다는 것이고 이는 파일의 사이즈를 늘어나게 한다. 그리고 보기에도 별로 좋아보이지 않다. 배럴 모듈을 쓰면 다음과 같이 바꿀 수 있다.

```jsx
// ./components/base/index.ts
export * from "./Button";
```

```jsx
import { Button } from "@components/base";
```

import 문이 줄어들고 깔끔해졌다. 그리고 Button 컴포넌트가 base에 속한다는 것을 알아보기 쉬워졌다.

## 문제점

그런데 위 방식을 Nextjs 프로젝트에 사용하면 문제가 있다. Tree shaking이 되지 않는다. 배럴 모듈에서 특정 모듈 하나만 import를 해도 번들 과정에서 배럴 모듈안에 있는 모든 모듈을 번들링에 포함시킨다. 웹팩의 bundle analyzer를 통해 이 문제점을 직접 확인 할 수 있다.

```jsx
yarn add -D @next/bundle-analyzer
```

```jsx
// nextjs.config.js

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withBundleAnalyzer(nextConfig);
```

먼저 배럴 모듈이 아닌 컴포넌트 모듈을 직접 가져오는 경우를 살펴보자

```jsx
import Button from "@components/base/Button/Button";

const Home = () => {
  return (
    <div>
      <Button />
    </div>
  );
};

export default Home;
```

번들 결과를 보면 index.js에 import한 컴포넌트만 포함되어 있는 것을 볼 수 있다. 그 다음 배럴 모듈에서 가져온 경우를 살펴보자

```jsx
import { Button } from "@components/base";

const Home = () => {
  return (
    <div>
      <Button />
    </div>
  );
};

export default Home;
```

index.js를 살펴보면 Button만 import했는데 배럴 모듈안에 있는 모든 모듈이 bundle된 것을 볼 수 있다. 타입스크립트 배럴 모듈이 트리 셰이킹 되지 않는 문제점은 nextjs 뿐만 아니라 다른 webpack 프로젝트에서도 확인할 수 있었다.

## 해결책

해결책은 간단하다. package.json에 다음 속성을 추가해주면 된다.

```jsx
{
	"sideEffects": false
}
```

속성을 추가한 후 다시 번들 결과를 살펴보자.  
Tree shaking이 정상적으로 동작하는 것을 볼 수 있다.  
그렇다면 무슨 일이 일어난 것일까?  
기본적으로 ES 모듈 방식은 웹팩에서 Tree shaking을 한다. 그런데 문제는 Side effect import다. side effect import란 글로벌 스코프에서 특정 코드를 실행하기 위해 Import를 하는 것을 말한다. 주로 polyfill을 적용할 때 사용한다.

```jsx
import "./polyfill.js";
```

모듈 A에서 Side effect import를 하면 A는 더 이상 pure하지 않다. (아마 이런 경우 트리 셰이킹을 하지 않는 것 같다.) 웹팩 문서에서는 배럴 모듈에 대한 언급은 없으나 아마 배럴 모듈도 같은 이유로 트리 셰이킹을 하지 않는 것 처럼 보인다. 따라서 만약 sideEffect를 사용하지 않는다면 `package.json`에 `"sideEffects": false`를 추가해줘서 Tree shaking을 할 수가 있다.

### References

[Tree Shaking | webpack](https://webpack.js.org/guides/tree-shaking/)

[import - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only)

[https://github.com/vercel/next.js/issues/12557](https://github.com/vercel/next.js/issues/12557)
