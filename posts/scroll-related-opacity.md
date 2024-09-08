---
date: "2024-01-30"
title: "scoll related opacity"
---

# 스크롤 움직임에 따라 Opacity 값 바꿔보기

## Scroll position

스크롤이 특정 위치에 도달하면 opacity값이 0이 되도록 해보기. 예를 들어 처음에는 opacity가 1 이었다가 스크롤이 내려갈때마다 감소하여 스크롤을 다 내리면 0으로 만든다.

먼저 scrollable height를 구해준다

```typescript
const clientHeight = document.documentElement.clientHeight;
const scrollHeight = document.documentElement.scrollHeight;
const scrollableHeight = scrollHeight - clientHeight;
```

`window.scrollY`를 이용하여 스크롤이 수직으로 움직인 거리를 알 수 있는데, 만약 스크롤을 다 내린다면 `scrollableHeight`와 값이 일치하게 된다. 따라서 다음 수식을 만들 수 있다.

```typescript
const fraction = window.scrollY / scrollableHeight
const opacity = 1 - fraction
```

`fraction`의 값은 처음에는 0이었다가 스크롤을 다 내리면 1로 된다. 따라서 `opacity`도 0이 된다.

## Scrolled distance

스크롤이 움직인 거리에 따라 opacity값을 조정해보자.

예를 들어 스크롤이 100px 아래로 움직일 때마다 opacity값을 0.1씩 감소 시키고 싶다. 이 경우 스크롤이 움직인 거리, 그리고 스크롤의 방향을 계산해야 한다.

스크롤이 움직인 거리를 계산하기 위해 직전에 기록한 스크롤 위치와 현재 스크롤 위치를 스크롤 이벤트 헨들러에서 계산해준다.

```typescript
let lastScrollY = 0;
const onScroll = () => {
  const distance = Math.abs(window.scrollY - lastScrollY);
  if (disatance <= 100) return

  lastScrollY = window.scrollY
}

window.addEventListener("scroll", onScroll);
```

`disatance`가 100을 넘었다면 `opacity`값을 계산하여 적용한다.

```typescript
  if (window.scrollY > lastScrollY) {
    // downward
    opacity = Math.max(0, opacity - (0.1 * distance) / 100);
  } else {
    // upward
    opacity = Math.min(1, opacity + (0.1 * distance) / 100);
  }

  text.style.opacity = opacity.toString();
```
