---
title: "React Query pattern: pagination"
date: 2022-09-28 12:44
categories:
  - react
---

## Pagination

page에 따라서 화면에 re rendering 되어야 하기 때문에 page state를 만들어 api의 파라미터로 사용한다.

```typescript
const [page, setPage] = useState(1);

const postsQuery = usePostsQuery(page);
```

위 코드 usePostsQuery 처럼 커스텀 훅을 만들 수도 있고 useQuery를 다이렉트로 사용할 수 있다.

```typescript
// 1. 커스텀 훅 생성
const usePostsQuery = (page: number) => {
  return useQuery(["posts", page], () => {
    return fetchPosts(page);
  });
};
```

```typescript
// 2. 다이렉트 사용
const postsQuery = useQuery(["posts", page], async () => {
  const { data } = await axios.get("/api/posts", {
    params: {
      page,
    },
  });
  return data;
});
```

커스텀 훅을 사용하는 방식이 maintainability가 더 좋은 것 같다.

## keepPreviousData

React Query의 query key는 마치 useEffect의 dependency array와 같아서 query key가 바뀌면 refetching을 한다.  
따라서 위 코드 같은 경우 page가 query key에 포함되어 있기 때문에 page가 바뀌면 refetching을 한다. 즉, 새로운 페이지를 불러온다.  
여기까지 일반적인 페이지네이션의 기능이다. 그런데 UI에는 삐그덕 거리는 부분이 있다.

```typescript
const PostList = () => {
  const [page, setPage] = useState(1);
  const postsQuery = usePostsQuery(page);

  if (postsQuery.isLoading) {
    return "Loading...";
  }

  return <ul>{/* 생략 */}</ul>;
};
```

page가 증가할 때마다 `"Loading"...` 이 깜빡였다 사라진다. 로딩 UI가 매우 별로지만 어쨌든 무언가 깜빡였다가 다시 post list가 렌더링 된다. 이는 refetching할 때마다 query의 status가 loading에서 success로 왔다 갔다 하기 때문이다.

```typescript
console.log(postsQuery.status); // page가 변할 때마다 loading, success가 반복적으로 나타난다.
```

우리는 useQuery의 keepPreviousData 옵션을 통해 이를 개선할 수 있다.

```typescript
    /**
     * Set this to `true` to keep the previous `data` when fetching based on a new query key.
     * Defaults to `false`.
     */
    keepPreviousData?: boolean;
```

```typescript
const usePostsQuery = (page: number = 1) => {
  const postsQuery = useQuery(["posts", page], () => fetchPosts(page), {
    keepPreviousData: true, // 🔥
  });
  return postsQuery;
};
```

이름 그대로 query key가 바뀌어 refetching하는 경우 이전데이터를 날리지 않고 유지한다는 것이다. 이는 query status의 행동을 바꾸게 된다.

이전에는 page가 바뀔 때마다 loading 에서 success로 왔다 갔다 했지만 keepPreviousData가 true인 경우에는 맨 처음 fetch 할 때만 loading status를 갖고 이후 page가 바뀌어도 쭉 sucess로 status가 유지된다. 그래서 새로운 데이터가 도착했을 때 심리스하게 이전 데이터와 교체 된다.

여기서 헷갈리지 말아야 할 부분은 query의 status와 query의 fetchStatus는 다르다는 것이다. 문서에도 나와 있듯이 query의 loading status는 query에 data가 없다는 것을 의미한다. 실제로 fetch와 관련된 상태는 fetchStatus를 통해 확인할 수 있다.

```typescript
console.log(postsQuery.fetchStatus); // fetching -> idle
```

그래서 fetchStatus를 보면 page가 바뀔 때마다 fetching과 idle를 왔다 갔다 한다.

이를 통해 UI의 큰 개선을 이룰 수 있는데 왜냐하면 page가 바뀔 때마다 loading status로 바뀌지 않기 때문에 깜빡이는 부분을 없앨 수 있기 때문이다. (**이는 query의 loading 상태로 로딩 UI를 컨트롤 하는 것을 전제로 한다.**)

## Source

[Paginated / Lagged Queries](https://tanstack.com/query/v4/docs/guides/paginated-queries)  
[React Example: Pagination](https://tanstack.com/query/v4/docs/examples/react/pagination)
