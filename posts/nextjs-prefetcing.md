---
title: "Nextjs prefetching"
date: 2022-09-12 13:11
categories:
  - nextjs
---

## prefetching이란?

- pre + fetching. 미리 fetch하는 것을 말한다.
- 단어의 의미는 그렇고 기술적으로 어떤 의미일까?
- 여러가지 기술적인 의미를 가지고 있다.
- 웹 개발에 prefetching은 link prefetching이라고 볼 수 있다.
- 어떤 웹 사이트 또는 앱의 인덱스는 자기로 부터 navigate될 수 있는 여러 link를 포함할 수 있다.
- 보통 A 페이지에 들어가면 A페이지에만 필요한 assets만 fetch하고 A 페이지에서 링크를 통해 B페이지에 들어가면 B 페이지의 assets을 fetch하는 것을 일반적이라고 생각해볼 수 있다.
- A 페이지에서 미리 B 페이지의 assets을 fetch하는 것을 prefetching이라고 한다.

## prefetching 을 하는 이유?

- navigate할 또는 할 예정인 link의 assets을 미리 fetch하게 되면 prefetching을 적용하기 전보다 빠른 navigation으로 UX에 긍정적인 영향을 주기 때문이다.

## prefetching 전략

- prefetching을 어떤 식으로 할 지 생각해 본다면 다음과 같은 전략을 세워볼 수 있다.

1. navigate될 수 있는 모든 link를 prefetching한다.
2. 현재 보이는 Link만 prefetching한다
3. predictive prefetching: navigate가 될 확률이 높은 link를 prefetch.
4. manual prefetching: 어떤 link를 prefetch할 것인지 개발자가 선택

## nextjs에서 prefetching 해보기

- nextjs에서 prefetching은 link과 관련된 js 파일만 prefetch 한다.
- nextjs에서는 prefetching할 Link를 직접 설정할 수 있다.
- prefetching을 쉽게 적용하는 방법은 `next/link`의 Link 컴포넌트를 이용하여 route를 설정하는 것이다.
- Link 컴포넌트에 명시한 href과 관련된 js를 자동으로 prefetch 한다. - Link 컴포넌트는 prefetch라는 props를 받는데, default가 true이다.
- Link 컴포넌트를 사용하지 않고 `next/router`의 router를 이용하여 route를 설정하는 경우, 추가 작업이 필요하다.
- `router.prefetch(href)` 를 통해 어떤 route를 prefetch할 것인지 명시 해주면 된다.
- 대신 1. 프로덕션 환경에서만 prefetch를 수행한다. 2. `useEffect`안에 prefetch 문을 넣어야 한다.

---

- 비교를 위해 프로덕션 환경에서 테스트를 해보기로 한다.
- 테스트 해볼 앱은 커머스 앱으로 홈인 /와 /products/[id] route가 있다.
- 먼저 prefetch를 적용하지 않는 환경이다.
  ![](https://a.storyblok.com/f/171155/2926x1386/ec7bd235fb/screen-shot-2022-09-12-at-11-59-13-pm.png)
- 여러 chunks가 보이는데 /products/[id] 와 관련된 js는 prefetch되지 않았다.
- 그 다음 prefetch를 해보았다. `index.tsx`에 다음 코드를 넣어 준다.

```tsx
useEffect(() => {
  router.prefetch("/products/[id]");
}, []);
```

- 그리고 다시 network를 확인해 본다.
  ![](https://a.storyblok.com/f/171155/3640x1570/21220cd049/screen-shot-2022-09-13-at-12-02-55-am.png)
- /products/[id] 와 관련된 chunk가 prefetch 된 것을 볼 수 있다.

## References

- [Route prefetching in Next.js](https://web.dev/route-prefetching-in-nextjs/)
- [Faster Web Navigation with Predictive Prefetching](https://www.youtube.com/watch?v=0jB4YWgAxUo&list=PLndr4jfFMrRQMcTU-Wz6d15V4K_AmVOaO&index=42&t=344s)
- [Prefetching](https://en.wikipedia.org/wiki/Prefetching)
