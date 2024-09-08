---
date: "2024-04-24"
title: "css only shimmer"
---

# CSS로 shimmer UI 만들기

## color layout

- base color: 기본 백그라운드 컬러
- highlight: base color보다 밝은 컬러로, shimmering light 효과를 담당한다.

## movement

- 보통의 shimmering UI는 반짝임이 수평(horizontally)으로 움직인다
- 따라서 좌에서 우로 또는 우에서 좌로 움직임을 보인다.

## customizable

- 정적인 Shimmer UI 보다는 props를 통해 color, speed를 바꿀수 있어야 한다.

## code

### css (with tailwindcss)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* 좌에서 우로 백그라운드의 x position을 움직이게 한다 */
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
}

@layer components {
  .shimmer {
    /* css 변수를 활용해 이 후 값을 바꿀 수 있도록 한다 */
    --shimmer-color-base: #f6f7f8;
    --shimmer-color-highlight: #edeef1;
    --shimmer-speed: 1.5s;
    background: linear-gradient(
      to right,
      var(--shimmer-color-base) 8%,
      var(--shimmer-color-highlight) 18%,
      var(--shimmer-color-base) 33%
    );
    /* 애니메이션을 위해서 백그라운드의 크기를 확장한다. */
    background-size: 200% 100%;
    /* 그리고 넘치는 부분을 가린다. */
    overflow: hidden;
    animation: shimmer var(--shimmer-speed) infinite linear;
  }
}

```

### typescript (with react)

```typescript
interface ShimmerProps {
  className?: string;
  colorBase?: string;
  colorHighlight?: string;
  speed?: string; // This can be 'slow', 'fast', or any valid CSS time unit
}

const Shimmer = ({
  className,
  colorBase,
  colorHighlight,
  speed,
}: ShimmerProps) => {
  const style = {
    "--shimmer-color-base": colorBase,
    "--shimmer-color-highlight": colorHighlight,
    "--shimmer-speed": speed,
  } as React.CSSProperties;

  return <div style={style} className={`shimmer ${className}`}></div>;
};

export default Shimmer;

```
