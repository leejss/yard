---
title: 'SWR과 React-Query 비교 분석'
date: 2022-11-27 16:48
categories:
  - react
---

## 공통점

> SWR is a React Hooks library for data fetching. - SWR docs

> React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze. - React-Query docs

두 라이브러리의 주요 기능은 data-fetching과 연관이 있다. fetching하여 응답받은 data를 state로서 관리, revalidation, 그리고 caching하는 것이 두 라이브러리의 주요 기능이라고 볼 수 있다. 한 가지 명확히 해야 할 부분은 data fetching 라이브러리라고 나와 있어서 이 두 라이브러리를 실제로 HTTP 요청을 하는 라이브러리로 착각하는 것이다. 나 또한 처음 라이브러리의 소개 문구를 읽었을 때 Axios의 대체재 같은 건가?라고 생각했었다. 그런데 이 두 라이브러리는 HTTP 요청을 직접 수행하지 않는다. 직접 사용해보면 알겠지만 `useSWR` 또는 `useQuery` 훅에 fetcher를 전달해야 한다. 그리고 이 fetcher는 `axios` 인스턴스의 `get` 메소드가 될 수도 있고 `fetch` 함수가 될 수 있다. 실제로 서버에 요청을 수행하는 것은 인자로 전해준 fetcher다. fetcher로 무엇을 전달할지는, `axios`를 쓰든 `fetch`를 쓰든 이것은 개발자의 판단이다.  
가끔씩 `axios`와 `React-Query` 또는 `SWR`을 서로 대체재로 여기는 글을 보게 되는데 엄밀히 말하면 이 둘은 대체재가 아니라 같이 사용할 수 있는 보완재에 가깝다.

이 둘 라이브러리를 사용해 봤을 때, 주요 기능의 사용성은 유사하다.

```ts
// SWR

const {} = useSWR(key, fetcher, options)

// React-Query
const {} = useQuery(key, fetcher, options) // 또는 const {} = useQuery(config);
```

그런데 여러 가지 부분에서 차이점이 존재한다.

## 차이점

### 사이즈

가장 눈에 띄는 차이점이 아닐까 싶다.

NPM에 나와 있는 [SWR](https://www.npmjs.com/package/swr)의 unpacked size는 231kb이고 [React-Query](https://www.npmjs.com/package/react-query)의 unpacked size는 2.27MB이다. 사이즈에서 상당한 차이가 난다. 사실 이 사이즈가 번들 과정에서 그대로 적용되어 클라이언트에 전달되는 것은 아니기 때문에 직접 비교하는 것은 무리가 있어 보이지만 그래도 역시 사이즈 차이가 많이나고 어쨌든 `React-Query`가 코드 베이스를 더 무겁게 만드는 것은 사실이다. (그 만큼 더 다양한 기능을 제공한다.) 따라서 프로젝트의 사이즈가 크지 않고 데이터 펫칭 로직이 간단하다면 아무래도 좀 더 라이트한 `SWR`을 사용하는 게 더 합리적인 것처럼 보인다.

### 공식 문서

별거 아닌 것 처럼 보이지만 크리티컬한 차이점이라고 생각한다.

[SWR의 공식문서](https://swr.vercel.app/docs/getting-started)와 [React-Query](https://tanstack.com/query/v4/docs/overview)의 공식문서를 보면 React-Query는 API 레퍼런스 뿐만 아니라 가이드, 콘셉트, 예시, 커뮤니티 레퍼런스 등 라이브러리에 대한 다양한 정보를 제공해준다. 특히 커뮤니티 레퍼런스 중 [TkDodo's blog](https://tkdodo.eu/blog/practical-react-query)는 React-Query를 이해하는 데 가장 완벽한 레퍼런스가 아닐까 싶다. 반면 SWR의 공식 문서는 React-Query에 비해서 빈약하다. 단지 SWR를 어떻게 사용할 수 있는지에 대해 나열 한 정도다. 지금 보니 API 레퍼런스도 없다.  
공식 문서가 왜 크리티컬한 차이점이라고 생각하냐면 이 라이브러리의 콘셉트를 설명 하냐 안 하냐에 따라서 이 라이브러리를 언제 어떻게 그리고 왜 써야 하는지을 알 수 있냐 없냐를 결정하기 때문이다.  
나는 data fetching 라이브러리를 SWR로 처음 접했다. SWR의 사용설명서를 읽고 사용하는 정도였다. 이 라이브러리를 왜 써야 하는지에 대한 고민이 없었다. 이후 React-Query를 공부하면서 공식 문서를 통해서 data fetching 라이브러리의 콘셉트를 이해하고 이 라이브러리을 언제 어떻게 그리고 왜 써야 하는지에 대해서 이해 했다. 이러한 콘셉트를 이해하고 쓰는 것과 이해하지 않고 쓰는 것은 매우 큰 차이다. SWR의 공식 문서는 data fetching 라이브러리에 대한 콘셉트를 즉, 이 라이브러리를 왜 써야 하는지를 충분히 설명하지 않지만 React-Query는 콘셉트에 대해 충분히 설명해준다.

따라서 만약 data-fetching 라이브러리를 써야 하는 상황에서 어떤 라이브러리를 써야 하는지 고민한다면 나는 React-Query를 추천한다. 이유는 React-Query가 기능적으로 우수해서라기보다는 React-Query를 통해서 data fetching 라이브러리에 대해 이해할 수 있기 때문이다.

### Status

사이즈와 공식문서는 실제 사용성의 차이점은 아니다. 이제 부터 두 라이브러리를 실제 사용하면서 겪었던 차이점에 대해 이야기해보려고 한다. 이러한 차이점들은 React-Query에는 있지만 SWR에는 없는 기능들 이다.

그 중 첫번 째로는 status다. React-Query는 개발자가 data fetching과 관련된 상황에 따라 여러 가지 행동을 할 수 있도록 status 값을 제공해준다. React-Query는 data fetfching의 결과에 대해 두 가지 상태인 `status`와 `fetchStatus`를 보여 준다. `status`는 아직 데이터가 없는 초기 쿼리 또는 리셋된 쿼리와 연관이 있다. 즉 React-Query가 관리하는 캐시 엔트리에 해당하는 쿼리 키가 없는 경우 `status`를 통해서 해당하는 쿼리 데이터의 상태를 볼 수 있다. `loading`, `error`, `success`의 문자열 값을 가지고 `isError`, `isSuccess`와 같은 boolean 값으로도 `status`를 확인 할 수 있다.

`fetchStatus`는 말 그대로 fetch의 상태를 나타난다. data fetching을 타이밍에 따라 구분하자면 initial fetch가 있고 이 후 revalidation단계에서 수행하는 refetch가 있다. 이전 status 값이 initial fetch의 상태 (성공 또는 실패)를 나타낸다면 `fetchStatus`는 단순히 fetch 중인지 아닌지를 나타낸다. 따라서 `fetchStatus`는 `fetching`, `paused`, `idle` 문자열 값을 값으로 가진다.

위 두 상태 값의 정확한 차이를 알기 위해서는 [공식 문서](https://tanstack.com/query/v4/docs/guides/queries#why-two-different-states)를 참고하길 바란다.

즉 우리는 쿼리 데이터의 있고 없고(status)와 백그라운드에서 fetching이 이루어지고 있고 아닌지에 따라(fetchStatus) 여러 가지 동작을 수행할 수 있다.

SWR은 이에 비해 status를 나타내는 데 빈약하다. useSWR이 반환하는 값 중, status를 나타내는 값은 data와 isValidating 뿐 밖에 없다. data가 undefined라면 loading 중, isValidating이 true라면 fetching 중 이런 식으로 사용해야 한다. React-Query는 각각의 status에 대해 명확한 값을 제시한 반면 useSWR은 단편적인 status만을 제시하고 각각의 상황은 개발자가 직접 판단해야 한다. (개발자가 직접 판단해서 하는 게 엄밀히 말해 문제라고 볼 수 는 없지만 협업과정에서 이 값이 무엇을 의미하는지 서로 생각하는 게 달라지면 골치가 아파진다. 따라서 React-Query처럼 명확한 값을 제시해주는 게 개발 경험이 더 좋다고 생각한다.)

### Dev tools

React-Query는 깔끔한 개발 도구를 제공한다. 그리고 정말 파워풀하다. (`@tanstack/react-query-devtools` 라는 라이브러리를 추가로 설치해줘야 하긴 하다.) 이 개발도구를 통해서 실제로 cache된 데이터가 어떤 데이터고, 어떤 쿼리 키로 관리가 되고 있고 언제 refetching이 일어나는지를 쉽게 파악할 수 있다. SWR은 별도의 dev tool을 제공하지는 않는다. 따라서 `console.log`를 열심히 활용해야 한다.

### Cache client ?

단순히 data를 fetching하여 결과를 cache하여 보여주는 것 외에도 cache된 server state(서버 상태)에 어떤 행동을 하거나 조작해야 하는 상황이 있다. React-Query는 그러한 시나리오를 위해서 QueryClient 라는 인터페이스를 제공해준다. QueryClient를 통해서 query data를 get, set, invalidate, reset 등을 할 수 가 있다. 우리는 이를 통해서 optimistic updates, invalidate by events 등을 수행할 수 있다. 또는 특정 쿼리 키가 server state에 이미 있는지 없는지 검사를 할 수도 있다.

그러나 SWR은 서버 상태에 접근할 수 있는 위 같은 client를 명시적으로 제공하지 않는다. SWR의 공식문서를 보면 애초에 그런 기능 자체가 빈약하다. cache자체에 접근할 수 있긴 있다.

```tsx
const { cache } = useSWRConfig()
```

이렇게 cache에 접근할 수 있지만 reset하거나 invalidate하는 API하는 기능은 제공하지 않는다. 그러다보니 optimistic updates 방식에도 차이가 있다. SWR은 optimistic updates 관련 로직이 mutate함수의 options에 결합이 되어 있다.

```ts
// SWR 공식문서의 Optimistic UI 예시에서
await mutate(addTodo(newTodo), {
  optimisticData: [...data, newTodo],
  rollbackOnError: true,
  populateCache: true,
  revalidate: false,
})
```

이런 식으로 `mutate`라는 함수안에 옵션으로 Optimistic updates에 대한 로직을 정한다면 React-Query는 QueryClient가 있기 때문에 mutation과 서버상태 로직을 분리해서 Optimistic updates를 수행한다. 그리고 이런 방식이 논리적으로 더 맞다고 생각한다. 그래서 결론적으로 React-Query가 개발 경험이 더 좋다.

## 그래서 무엇을 선택해야 하는가 ?

위 차이점 말고도 더 있을 것이라고 예상한다. (자세히 살펴보진 않았지만 에러 헨들링에도 차이점이 있는 것 같다.) 아마 이런 차이점들은 Reacy-Query에는 있지만 SWR에는 없는 성격의 차이점일 것이다. 따라서 웬만한 프로젝트에서는 SWR보다는 React-Query가 더 좋은 선택으로 보인다. 다른거 필요없고 프로젝트에서는 data fetching만 해서 보여준다 하면 SWR을 고려해볼만 하다. 하지만 단순히 기능을 떠나서 개발 경험을 비교해봤을 때, React-Query가 더 좋기 때문에 여러 상황에서 React-Query가 더 나은 선택이라고 생각한다.

그리고 SWR같은 경우 현재 시점을 기준으로 8개월 동안 업데이트가 되지 않고 있다. Vercel에서 SWR을 계속해서 개발해 나갈 것인지도 잘 모르겠다.
