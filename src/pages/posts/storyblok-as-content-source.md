---
layout: '../../layouts/post-layout.astro'
title: "Storyblok as content source"
date: 2022-09-02 15:00
categories:
  - etc
---

## Jamstack이란?

static site generator + headless cms를 부르는 명칭.

현재(2022-09-03) 이 블로그도 Jamstack으로 만들었다고 볼 수 있다.
site generator로는 nextjs를, headless cms로는 storyblok을 활용하고 있기 때문이다. cms는 **Content Management System**을 말한다.
content는 블로그 포스트가 될 수 있고 커머스 경우에는 상품이 될 수 있고 뉴스 같은 경우 아티클이 될 수 있다. 사이트의 성격에 맞는 다양한 content가 존재한다.
직접 에디터로 마크다운으로 블로그 포스트를 작성하는 경험은 좋지 않기 때문에 headless cms를 활용하기로 결정하기로 했다.
[Jamstack] 홈페이지에서 다양한 cms를 소개 중이다. (github star 순으로 정렬되어 있는데 인기 많다고 좋은 건 아닌 거 같음)
static site generator로 nextjs를 사용중이라면 [여기서] cms + nextjs 예시를 확인할 수 있다.
다른 cms는 모르겠는데 혹시 cms로 Ghost를 사용할 예정이라면 비추한다. 왜냐하면 nextjs와 integration하려면 월 25달러의 비용을 내야하기 때문이다.
꼭 cms의 pricing을 확인하여 무료버전이 있는지 체크가 필요하다.
![storyblokpricing](https://a.storyblok.com/f/171155/1022x436/bc1ad1a705/stotyblokpricing.png)
참고로 storyblok은 위와 같이 무료 plan이 존재한다.

## Content API

headless cms을 오로지 content source로만 사용할 예정이라면 선택한 cms의 content api를 살펴보면 된다.
content api는 rest api 또는 (cms에 따라) graphql을 지원, headless cms를 이용할 수 있는 수단이다.
cms마다 base url이 존재한다.
`{{STORYBLOK_API}}/cdn/stories?starts_with=posts&token={{preview_token}}&version=draft` 이런식으로 직접 호출해도 되는데
패키지 형태로 Javascript client를 제공해주는 곳도 있다. (아마 대부분의 cms가 지원해줄 것이라 예상)
결국 데이터를 불러오는 것은 똑같은데 직접 모듈을 만드는 것보다 모듈화된 클라이언트를 사용하는 쪽이 간편하다.

## Storyblok 사용하기

핵심은 Storyblok에 포스트를 등록하고 이걸로 static site를 만드는 것이다.
![](https://a.storyblok.com/f/171155/1469x100/4828315e7c/screen-shot-2022-09-03-at-1-38-17-am.png)
먼저 새로운 space를 만든다.
![](https://a.storyblok.com/f/171155/666x729/b994789677/screen-shot-2022-09-03-at-1-40-25-am.png)
스페이스 이름은 어차피 본인만 보니까 본인이 알아볼 수 있게 만들고 server location의 위치는 상관없을 거 같다. server side rendering이 아니기 때문이다.
스페이스를 만들면 content api를 위한 토큰을 생성해야 한다.
![](https://a.storyblok.com/f/171155/1551x348/5afb947cbf/screen-shot-2022-09-03-at-1-38-53-am.png)
Storyblok에는 Preview와 Public 타입의 토큰이 있다.
Preview는 Draft와 Published content를 불러 오고 Public은 오직 Published content만 불러온다.
목적에 맞게 쓰면 되겠지만 일반적으로 development에는 preview, production에는 public을 쓴다.
Storyblok은 리액트와 쉽게 결합할 수 있도록 `@storyblok/react`라는 패키지를 제공하고 있으니 이를 활용하자.

```ts
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { API_TOKEN } from "lib/constants";
import { getStoryblokApi } from "@storyblok/react";

storyblokInit({
  accessToken: API_TOKEN,
  use: [apiPlugin],
});

const ApiClient = getStoryblokApi();

export default ApiClient;
```

이런 식으로 Api 클라이언트를 만들었다.
이제 content를 등록해보자. Storyblok은 그들만의 용어, 예를 들어 Story, Blok 등을 사용 중인데 Story는 entry라고 생각하면 되고 Blok은 content api만 사용할 거면 신경쓰지말자.
`posts` 라는 폴더를 만들고 그 밑에 여러 Story를 생성하면 된다.
![](https://a.storyblok.com/f/171155/1855x815/a66361efd7/screen-shot-2022-09-03-at-1-39-12-am.png)
그 전에 Story의 필드들을 정의해줘야 하는데 스키마를 정의한다고 생각하면 된다.
![](https://a.storyblok.com/f/171155/464x586/5d794da11c/screen-shot-2022-09-03-at-1-55-42-am.png)
가장 기본적인 필드만 정의해주었다. 이미지 등의 다른 컨텐츠들은 markdown 안에서 처리하고자 한다.

```ts
export async function getAllPostStories() {
  const { data }: GenericStories<PostStory> = await ApiClient.get(
    `cdn/stories`,
    {
      version,
      starts_with: "posts/",
    }
  );
  return data.stories;
}
```

그리고 이런 식으로 포스트를 호출해주는 함수를 정의해서 사용한다.
content api의 세부적인 내용은 Storyblok의 Content API 문서를 살펴보면 된다. 언어별로 친절하게 소개해준다.

## 요약

Jamstack으로 블로그생성  
Storyblok에 content를 생성, nextjs에서 이를 렌더링

[jamstack]: https://jamstack.org/headless-cms/
[여기서]: https://nextjs.org/examples
