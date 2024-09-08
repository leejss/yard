---
title: 'media query 올바르게 사용하기'
date: 2023-05-20 12:35
categories:
  - css
---

## max-width condition

```css
.Color {
  color: gray;
}

@media (max-width: 768px) {
  .Color {
    color: red;
  }
}

@media (max-width: 1200px) {
  .Color {
    color: blue;
  }
}

@media (max-width: 1400px) {
  .Color {
    color: green;
  }
}
```

위 CSS 코드의 실행 결과를 예측해보자.

뷰포트의 너비가 1400을 초과하면 gray, 이하면 green이 된다. 어째서 일까?

CSS에서 동일한 Specificity 를 가진다면 가장 나중에 작성된 스타일이 적용된다.

따라서 현재 뷰포트의 너비가 500px여도, 가장 나중에 작성된

```css
@media (max-width: 1400px) {
  .Color {
    color: green;
  }
}
```

가 적용된다.

그렇다면 이제 다음 코드의 결과를 예측해보자.

```css
.Color {
  color: gray;
}

@media (max-width: 1400px) {
  .Color {
    color: green;
  }
}

@media (max-width: 768px) {
  .Color {
    color: red;
  }
}

@media (max-width: 1200px) {
  .Color {
    color: blue;
  }
}
```

현재 뷰포트너비를 vw라고 한다면,

- vw > 1400: gray
- 1200 < vw ≤ 1400: green
- vw ≤ 1200: blue

가 된다.

똑같은 코드이지만 작성 순서를 바꾸니 결과가 달라진다. 위 코드는 다음과 같이 바꿔볼 수 있다.

```css
@media (min-width: 1200px) and (max-width: 1400px) {
  .Color {
    color: green;
  }
}

@media (max-width: 1200px) {
  .Color {
    color: blue;
  }
}
```

```css
@media (max-width: 768px) {
  .Color {
    color: red;
  }
}
```

위 코드는 Specificity에 따라 무시된다.

따라서 media query에 max-width 조건을 사용하는 경우 breakpoint의 값이 큰 순서대로 작성해야 한다. 그렇지 않으면 무시되는 속성이 발생할 수 있다.

## min-width condition

다음 코드의 결과를 예측해보자.

```css
.Color {
  color: gray;
}

@media (min-width: 1400px) {
  .Color {
    color: green;
  }
}

@media (min-width: 1200px) {
  .Color {
    color: blue;
  }
}
@media (min-width: 768px) {
  .Color {
    color: red;
  }
}
```

위 코드는 뷰포트 너비가 768px 보다 크면 red, 이하이면 gray가 된다. min-width를 사용하는 경우에도 specificity에 따라 스타일이 무시되는 경우가 발생할 수 있다. 따라서 min-width condition을 사용하는 경우에는 max-width와는 반대로 breakpoint가 작은 순서대로 작성하는 것이 바람직 해보인다.

```css
✅ .Color {
  color: gray;
}
@media (min-width: 768px) {
  .Color {
    color: red;
  }
}
@media (min-width: 1200px) {
  .Color {
    color: blue;
  }
}

@media (min-width: 1400px) {
  .Color {
    color: green;
  }
}
```

## Summary

```css
/* max-width */

/* base style 그리고 1400 < vw 스타일을 여기에 정의 */

@media (max-width: 1400px) {
  /* 1200 < vw <= 1400 스타일을 여기에 정의 */
}

@media (max-width: 1200px) {
  /* 760 < vw <= 1200 스타일을 여기에 정의 */
}

@media (max-width: 760px) {
  /*  vw <= 760 스타일을 여기에 정의 */
}

/* min-width */

/* base style 그리고 vw <= 390 스타일을 여기에 정의 */

@media (min-width: 390px) {
  /* 390 < vw <= 760 스타일을 여기에 정의 */
}

@media (min-width: 760px) {
  /* 760 < vw <= 1400 스타일을 여기에 정의 */
}

@media (min-width: 1400px) {
  /* 1400 < vw 스타일을 여기에 정의 */
}
```
