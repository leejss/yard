---
title: "브라우저 렌더링 (크롬)"
date:
categories:
  - react
---

## Browser Architecture

브라우저를 구현하는 방법에 대한 specification이 없기 때문에 브라우저마다(크롬, 사파리, 파이어폭스, ...) 구현 사항(implementation details)이 다르다.

Google chrome같은 multi-process 구조를 가진다. Browser process, Renderer process, GPU process, Plugin process 등을 가지고 있다. 크롬에서 Task Manager를 들어가보면 크롬에 현재 어떤 프로세스가 있는지 볼 수 있다.

<img src="/images/browser-rendering/pic2.png" alt=""  />

크롬은 탭마다 독립적인 Renderer process를 부여한다. Task Manager를 보면 탭마다 고유의 프로세스를 가지고 있는 것을 볼 수 있다. 이 외에도 Extension process, Utility process, Service worker process 등을 확인할 수 있다.

Browser process을 더 이해하기 위해서는 [Browser Architecture](https://developer.chrome.com/blog/inside-browser-part1/#browser-architecture)을 읽어보는 것을 추천한다.

다양한 프로세스를 통해서 브라우저는 많은 일을 수행하는데, 렌더링은 Renderer process에서 담당한다.

## Rendering Pipeline

<img src="/images/browser-rendering/pic1.png" alt=""  />

브라우저 렌더링이란 무엇일까? `<html>...</html>` 로 이루어진 문자열을 가지고 픽셀형태로 화면에 보여주는 것을 브라우저 렌더링이라 한다. 그리고 브라우저 렌더링이 이루어지는 곳은 Renderer process의 main thread이다.

<img src="/images/browser-rendering/pic3.avif" alt="" style="margin: 0;" />
<figcaption>출처 https://developer.chrome.com/blog/inside-browser-part3/</figcaption>

### References

- [Multi-process on the Web: The Browser Process Model](https://www.webperf.tips/tip/browser-process-model/) -[An Introduction to the Browser Rendering Pipeline](https://www.webperf.tips/tip/browser-rendering-pipeline/)

- [Inside look at modern web browser (part 1)](https://developer.chrome.com/blog/inside-browser-part1/)
- [Inside look at modern web browser (part 3)](https://developer.chrome.com/blog/inside-browser-part3/)
