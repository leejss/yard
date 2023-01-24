---
title: "React Query pattern: prefetching"
date: 2022-09-28 21:55
categories:
  - react
---

## 일반적인 fetch 시나리오

![prefetching1](/images/prefetching1.png)

Post 리스트가 있는 웹 페이지를 가정해볼 때, 맨 처음 post 리스트를 fetch하고 이 후 post 아이템을 클릭하면 그에 맞는 데이터를 다시 fetch하여 보여줄 것이다.  
위 예시 화면에서 Post3을 클릭하면 React Query에서는 새로운 query key(예를 들면 `[posts, 3]`) 즉, 새로운 데이터가 생기는 것이기 때문에 query status가 `loading`을 거쳐서 `success`로 이동할 것이다.
status가 `loading`인 경우 로딩 UI를 보여주고 있다면 새로운 Post 아이템을 클릭할 때마다 로딩 UI가 화면에 노출할 것이다.  
Post 아이템을 클릭하면 로딩이 일어나고 로딩이 끝나면 새로운 data를 렌더링하는 것은 일반적인 fetch 시나리오 인데, 이를 prefetching을 통해 개선할 수 있다.

## prefetching 시나리오

![prefetching2](/images/prefetching2.png)

Post 아이템을 클릭하여 라우트를 이동하기 전에 미리 해당 Post 아이템에 대한 data를 fetch하는 것이다. 즉 Post 아이템에 대한 data를 prefethcing하는 것이다.  
prefetching을 하게 되면 React Query의 cache에는 해당 data가 들어가게 된다. 미리 data를 fetch하여 cache에 저정했기 때문에 Post 아이템을 클릭하면 query의 status가 `loading`을 거치지 않고 바로 `success`를 가지게 된다.  
여기서 정확히 해야 하는 것은 query의 status가 `loading`을 지나지 않았다고 해서 fetch가 일어나지 않은 것은 아니다. fetch와 관련된 status는 `fetchStatus`를 봐야 한다. status가 `loading`이라는 것은 공식 문서에 따르면 cache에 해당 query key에 따른 data가 없는 경우를 말한다. prefetching하여 data를 가져 왔기 때문에 (`stale` 상태 일지라도) `loading`을 가지지 않는다.  
`loading`을 거치지 않기 때문에 로딩 UI는 나타나지 않고 즉시 Post아이템이 나타난다. 한번 더 강조하지만 네트워크 탭을 보면 prefetching을 하더라도 Post 아이템을 클릭하면 실제로 API 요청은 일어난다. (단, `staleTime`이 0인 경우)

## Code

QueryClient를 통해서 prefetching을 할 수 있다.

```tsx
const queryClient = useQueryClient();

// ...

await queryClient.prefetchQuery(["post", id], () => {
  return fetchPost(id);
});
```

언제 prefetch를 하고 얼마나 prefetch를 할 것인지는 작성자에 따라 달렸다.  
공식문서의 예제에서는 mouseenter 이벤트 시, prefetch를 하도록되어 있다.

```tsx
<ul>
  {data.map((d) => (
    <li
      key={d.id}
      onMouseEnter={async () => {
        await queryClient.prefetchQuery(
          ["post", id],
          () => {
            return fetchPost(id);
          },
          {
            staleTime: 3 * 1000, // staleTime을 설정하여 api call이 연속으로 두 번 발생하지 않도록 했다.
          }
        );
      }}
    >
      {/* 생략 */}
    </li>
  ))}
</ul>
```
