---
title: "AWS Amplify로 nextjs SGG앱 배포 시 주의할 점"
date: 2022-10-31 23:48
categories:
    - nextjs
---

AWS Amplify는 디폴트로 당신이 SSR과 SSG를 사용한다고 가정한다. 따라서 배포 시, SSR을 위해서 lambda를 셋팅하는 데, 이 과정에서 시간을 많이 잡아 먹는다.

그런데 만약 서버 사이드 렌더링을 사용하지 않는다면 lambda를 셋팅하는 것은 불필요하다. 따라서 기본 설정을 바꿔줘야 하는데 바꾸는 방법이 조금 독특?하다.

AWS Amplify는 당신이 SSR을 원하는 지, 원하지 않는 지를 package.json의 build script를 보고 판단한다. 만약 build 스크립트가 `next build` 이면 SSR + SSG를, 빌드 스크립트가 `next build & next export` 이면 오직 SSG를 사용한다고 생각한다.

즉 SSR을 하지 않을려면 빌드 스크립트를 `next build & next export`로 바꿔야 한다.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build && next export",
  "start": "next start"
}
```

또 하나 바꿔야 할점은 amplify의 빌드 셋팅 (`amplify.yml`)이다. 만약 SSG만 사용하고자 한다면 `baseDirectory`를 `.next`가 아닌 `out`으로 바꿔야 한다.

이렇게 설정을 바꿔야지 Amplify가 SSR을 위한 셋팅을 하는 것을 막을 수 있다. 개인적 경험으로 Amplify가 SSR 셋팅을 하는 시간이 전체 배포시간의 3분의 2정도를 차지한다. 위 과정을 통해 배포 시간을 크게 단축할 수 있었다.
