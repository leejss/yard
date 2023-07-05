---
title: "React + Typescript Webpack으로 SPA 프로젝트 구성하기"
date: 2022-11-03 21:54
categories:
  - React
---

먼저 UI를 렌더링 해줄 React와 Bundling을 해줄 Webpack을 각각 의존성에 추가한다.

```shell

yarn add react react-dom
yarn add -D webpack webpack-cli

```

그 다음은 webpack config를 작성해주면 되는데 그 전에 무엇이 필요한지 잠깐 생각해보자.

먼저 타입스크립트로 작성을 해야 하니까 타입스크립트 컴파일러가 필요할 것이고 그리고 그 것을 번들링을 해야하니까 typescript과 관련된 loader가 필요할 것이다. 그 외에도 CSS나 이미지 파일, 폰트 등의 파일도 번들링 해아 하니 관련된 설정도 필요할 것이다. 또한 자바스크립트의 forward compatilbity를 위해서 컴파일(또는 트랜스파일)과정도 필요할 것이다.

하나씩 추가해보자.

자바스크립트를 컴파일 해주는 babel이 필요하다. 그리고 관련된 여러가지 preset들이 필요하다.

```shell

yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/typescript

```

webpack에서 babel을 사용하기 위해 babel-loader를 설치한다.

```shell
yarn add -D babel-loader
```

그리고 CSS를 위해 관련 로더를 설치해준다.

```shell
yarn add -D style-loader css-loader
```

module resolution과 관련된 설정은 `module.rules` 에서 한다. `module.rules`에 로더를 추가한다.

```javascript
const commonConfig = {
  entry: "./src/index.typescript",
  output: {
    filename: "bundle.javascript",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(javascript|typescript)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Asset Module
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Asset Module
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".typescript", ".typescript", ".javascript"],
  },
};
```

그 다음 template html을 위해 `html-webpack-plugin`을 설치해준다. 이 플러그인은 빌드 마다 index.html을 자동으로 생성해준다.

```shell
yarn add -D html-webpack-plugin
```

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: "./index.html", // 생성할 템플릿 파일을 지정할 수 있다.
    filename: "index.html",
  }),
];
```

그 다음 리액트 코드를 작성해보자.

```typescript
// src/index.typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

```typescript
const App = () => {
  return <h1>React + Typescript Template</h1>;
};

export default App;
```

빌드 커맨드를 통해서 빌드를 한번 해보자.

```json
// package.json

"scripts": {
  "build": "webpack"
}
```

```shell
yarn build
```

빌드는 잘 된다. 이제 개발 환경을 구성해보자. 개발환경은 웹팩 개발 서버의 hot reload 그리고 react의 hot module replacement가 필요하다. hot reload는 코드의 변화가 생기면 reload를 하는 것이도 hot module replacement는 변화한 module만 바꾸는 것이다. 이렇게 해야 개발 과정에서 react의 state가 유지된다.

일단 개발 서버를 추가해보자.

```shell
yarn add -D webpack-dev-server
```

```javascript
devServer: {
  hot: true,
  open: true
}
```

```json
"scripts": {
  "build": "webpack",
  "dev": "webpack serve"
}
```

개발환경의 webpack 설정과 프로덕션 환경의 webpack 설정을 분리하여 커맨드에 따라 어떤 설정을 적용할 것인지 선택하도록 구조를 바꿔야 겠다.

webpack cli는 --env를 통해 환경변수 값을 설정에 전달할 수 있다.

```json
// package.json

"scripts": {
  "build": "webpack --env env=prod",
  "dev": "webpack serve --env env=dev",
}
```

넘겨 받은 값을 통해서 개발환경인지 프로덕션 환경인지 구분할 수 있다. 웹팩설정을 환경별로 구분해준다.

```javascript
const commonConfig = {
  entry: "./src/index.typescript",
  output: {
    filename: "bundle.javascript",
    path: path.resolve(__dirname, "build"),
  },
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.(typescript|javascript)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".typescript", ".typescript", ".javascript"],
  },

  plugins: [
    new WebpackBar(),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
  ],
};

const devConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
  },
};

const prodConfig = {
  mode: "production",
  devtool: "source-map",
};
```

설정을 합치기 위해 webpack-merge를 사용한다.

```shell
yarn add -D webpack-merge
```

그러면 최종적으로 webpack.config.js의 module.exports는 다음과 같다.

```javascript
module.exports = ({ env }) => {
  return env === "dev" ? merge(commonConfig, devConfig) : merge(commonConfig, prodConfig);
};
```

그 다음 Hot module replacement를 추가해보자. 다음 두 가지 패키지가 필요하다.

```shell
yarn add -D react-refresh @pmmmwh/react-refresh-webpack-plugin
```

Hot module replacemen는 오직 개발환경에서 필요하기 때문에 `devConfig`의 플러그인에 추가해준다.

```javascript
const devConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
```

이제 어느정도 개발과 프로덕션이 구분된 환경이 만들어졌다.

전체 코드는 <a href="https://github.com/leejss/react-with-webpack">https://github.com/leejss/react-with-webpack</a>에서 확인할 수 있다.
