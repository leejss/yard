---
title: "Flex basis: To control flex item's size"
date: 2022-09-02 05:42
categories:
  - css
---

flex item의 initial main size를 결정한다.
main size는 axis에 따라서 `width`또는 `height` 이다.
`flex-direction`이 row경우 `width`, column인 경우 `height`이다.

flex item이 `auto`가 아닌 `flex-basis`값을 가지면서 동시에 `width` 또는 `height`를 가진다면 `flex-basis`값이 우선하여 적용한다.

## use cases

`flex-direction`이 `row`라고 가정, 즉 main size는 `width`.

```css
flex-basis: auto;
```

flex item이 가진 `width`를 적용.
`flex-basis`의 디폴트 값이다.

```css
flex-basis: 200px;
```

flex item의 `width`를 `200px`로 설정.

```css
flex-basis: 20%;
```

flex item의 `width`를 flex container의 `width`의 `20%`로 적용

```css
flex-basis: content;
```

flex item의 content에 맞게 width를 자동 설정
