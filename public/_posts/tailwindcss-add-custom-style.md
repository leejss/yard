---
title: "tailwindcss에 커스텀 클래스 추가하기"
date: 2022-10-08 14:17
categories:
  - etc
---

## `@layer`

일반적인 css 클래스 정의를 통해 클래스를 추가할 수 있다.

```css
.customClass {
  /* ... */
}
```

```javascript
<div className="customClass"></div>
```

tailwindcss는 일반적인 클래스 정의를 제한하지 않는다.  
그런데 다음과 같이 클래스를 추가할 수도 있다.

```css
@layer components {
  .customClass {
    /* ... */
  }
}
```

```javascript
<div className="customClass"></div>
```

두 방식의 차이점은 무엇일까?

> Use the `@layer` directive to tell Tailwind which “bucket” a set of custom styles belong to. - tailwindcss docs

@layer를 통해 등록한 커스텀 클래스는 tailwind의 시스템(base, componentns, utilities)에 등록하는 것이다. 따라서 style order가 자동으로 관리가 되 `md:` 나 `hover:` 와 같은 modifier와 함께 사용이 가능하다. 또한 tree shaking(사용하지 않은 클래스는 포함하지 않음)도 지원이 된다.

```css
.highlight {
  color: yellogreen;
}
```

```javascript
<a className="hover:highlight">Hover me</a> // 스타일 적용 ❌
```

위 스타일은 적용되지 않는다. 왜냐하면 `.highlight` 은 일반적인 클래스지, tailwindcss에 등록한 커스텀 클래스가 아니기 때문이다.

```css
@layer components {
  .highlight {
    color: yellogreen;
  }
}
```

```javascript
<a className="hover:highlight">Hover me</a> // 스타일 적용 ✅
```

@layer directive로 등록한 커스텀 클래스를 등록하면 tailwindcss의 스타일 룰과 같이 사용이 가능하다.

## config에 등록

`@layer` 는 쉽고 빠르게 tailwindcss에 커스텀 클래스를 등록할 수 있는 방법이다. 그런데 이 방식에는 단점이 있다. autocomplete가 되지 않는 것이다. tailwindcss가 좀 더 인기가 많이진 이유에는 extension이 제공하는 autocomplete이 있기 때문이라고 생각한다. 특정 스타일 룰을 찾기 위해 docs를 왔다 갔다 하는 것은 생산성이 없고 지루한 작업이다. tailwindcss의 에디터 (또는 IDE)의 extension은 `@layer` 로 등록한 커스텀 클래스를 autocomplete 하지 못한다. autocomplete 하지 못하는 이유는 tailwindcss는 css 파일안에 어떤 커스텀 클래스가 있는지 모르기 때문이다.

따라서 커스텀 클래스가 많아지게 되면 생산성 없고 지루한 작업이 반복될 가능성이 있다.

대신 우리는 `tailwind.config.javascript`에 커스텀 클래스를 등록할 수 있다. config에 커스텀 클래스를 등록하면 tailwindcss는 어떤 클래스가 등록이 되어 있는지 알 수 있다. 따라서 autocomplete가 가능하다.

```javascript
// tailwind.config.javascript

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.typescript"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".highlight": {
          color: "#34ebbd",
        },
      });
    }),
  ],
};
```

## References

- [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)
- [Functions & Directives](https://tailwindcss.com/docs/functions-and-directives)
