---
title: "Serverside rendering 기본 구현해보기"
date: 2022-12-29 15:14
categories:
  - react
---

# 1. Render server

먼저 서버에서 컴포넌트 렌더링을 담당할 Nodejs 런타임 기반의 렌더(Render) 서버가 필요하다. 렌더 서버는 컴포넌트를 import하여 HTML로 변환 즉, 컴포넌트를 렌더링하는 역할을 하는 서버다. Nextjs와 같은 서버 렌더링을 지원하는 프레임워크 같은 경우는 이러한 렌더 서버를 out of the box로 제공한다.
렌더 서버를 위해 express를 사용한다.

```js
// src/server/server.js
import express from "express";

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
```

ES6와 JSX를 Nodejs에서 사용하기 위해 babel을 사용한다.

```js
// src/server/index.js
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("./server.js");
```

커맨드라인에서 `node render-server/index.js`를 입력하면 런타임에서 babel이 서버 코드를 transpile하여 실행한다.

# 2. 리액트 컴포넌트 소스코드

서버에서 렌더링할 컴포넌트를 생성해준다.

```jsx
// src/App.js
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => {
        setCount((prev) => prev + 1);
      }}
    >
      count: {count}
    </button>
  );
};

const App = () => {
  return (
    <div>
      <h1>Hello world!</h1>
      <Counter />
    </div>
  );
};

export default App;
```

컴포넌트를 통해서 단순히 HTML을 생성하고 싶다면, 웹팩(webpack)과 같은 별다른 모듈 번들러(bundler)가 필요하진 않다. 즉 위 코드는 클라이언트(client)로 ship되지 않는다. 단지 서버에서 HTML을 생성하기 위해 필요할 뿐이다.
이 후 hydration을 위해 클라이언트 사이드 자바스크립트가 필요해지는데, 이때 번들러를 사용하도록 한다.

# 3. Renderer(ReactDOM)

리액트 컴포넌트를 HTML로 바꾸기 위해서는 ReactDOM이라는 렌더러(renderer)가 필요하다. ReactDOM렌더러는 Nodejs, 브라우저 두 환경 위에서 동작한다.
다음과 같이 서버에서 리액트 컴포넌트를 렌더해보자.

```js
import { renderToString } from "react-dom/server";

// ... 중간생략

app.get("/", (req, res) => {
  const html = renderToString(<App />);
  res.send(html);
});
```

console.log(html)을 통해 결과물을 보면 다음과 같다.

```bash
<div><h1>Hello world!</h1><button>count: <!-- -->0</button></div>
```

컴포넌트 트리가 html로 변환된 것을 확인 할 수 있다.

---

여기까지가 컴포넌트가 렌더서버에서 렌더링되는 기본 방식이다. 렌더 서버를 설정하고, 컴포넌트를 import한 다음, 렌더러를 통해 HTML로 변환하여 response 하는 방식이다.
하지만 실제 서버사이드 렌더링을 하기위해서 추가 설정이 필요하다. 상태 관리, 이벤트 헨들러 등 실제 웹앱을 위해서는 클라이언트 사이드 자바스크립트가 필요하기 때문이다. 클라이언트 사이드 자바스크립트를 통해서 hydration을 해야 한다.
클라이언트 사이드 자바스크립틀 같이 보내기 위해서는 컴파일 작업, 번들작업이 필요하고 경로 설정도 필요하다.
