---
title: "React Query pattern: mutation"
date: 2022-10-02 21:46
categories:
  - react
---

## mutation

query가 상태를 읽는 것이라면 mutation은 상태를 바꾸는 것이다. query가 Read라면 mutation은 Create, Update, Delete 가 될 수 있다.  
프론트에서 백엔드의 상태를 바꾸기 위해서 post, delete, patch, put 요청을 한다. `useQuery` 훅과 Promise를 리턴하는 fetcher를 서로 연결했듯이, useMutation도 mutation을 수행하는 api 요청을 연걸하여 라이브러리가 제공하는 기능을 사용할 수 있다.

## mutation 사용하기

> [useQuery is declarative, useMutation is imperative.](https://tkdodo.eu/blog/mastering-mutations-in-react-query#differences-to-usequery)

서버 상태를 읽고 싶으면 간단하게 useQuery 훅을 사용하면 된다. React Query가 revalidate, refetching 등 다양한 작업을 대신해준다.  
그런데 mutation은 다르다. mutation은 상태를 바꾸는 행동이기 때문에 어떻게 할 것인지를 작성자가 직접 정해야 한다. 그래서 `useMutation`은 imperative하다.

상태를 바꾸는 행동은 `useMutation`의 `mutate`를 직접 호출해야 한다.

```typescript
const mutation = useMutation((newPost) => {
  const res = await axios.post("/api/posts");
  return res.data;
});

const handleClick = () => {
  mutation.mutate({
    content,
    author,
  });
};
```

`useMutation`은 `useQuery`와 key를 공유하지 않는다. 따라서 `useMutation`을 통해서 상태를 변경했어도 `useQuery`는 revalidate하기 전까지는 이를 바로 알아차리지 못한다.  
예를 들어 장바구니에서 상품을 삭제했어도 화면에서는 상품이 바로 사라지지 않는다. delete 요청으로 백엔드에서 장바구니 상품이 사라졌어도 React Query가 관리하는 프론트의 서버 상태는 revalidate하기 전까지는 이를 바로 알아차리지 못하기 때문에 화면에는 여전히 장바구니 상품이 사라지지 않고 남아있게 된다. 그리고 stale time이 지나서 onFocus, interval 등의 어떤 이유로 인해 revalidate가 일어나면 그제서야 장바구니 목록이 업데이트 된다.

따라서 `useMutation` 사용의 핵심은 useQuery와 sync를 맞추는 것이다. sync를 맞추기 위해서 QueryClient를 사용하며 방법에는 두 가지가 있다.

### 1. `invalidateQueries`

invalidation은 React Query에게 직접 특정 key가 더이상 validate하지 않다, 즉 revalidate해야 한다는 것을 알려주는 것이다. mutation을 성공하고 바로 invalidate하면 UI도 즉시 반영할 것이다.

```typescript
export const useTodosMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // 👈 서버가 다시 요청해서 값을 업데이트 할 것이다. (revalidation)
    },
  });
  return mutation;
};
```

### 2. `setQueryData`

invalidateQueries는 mutation 이후 서버에서 값을 다시 가져와 서버 상태를 업데이트 하는 방식이다.  
setQueryData는 서버 상태를 직접 조작하여 업데이트 하는 방식이다. 이 방식을 하기 위해서는 직접 저장하려는 데이터가 서버에서 내려받는 데이터와 구조가 일치해야 한다는 것이다.

```typescript
export const useQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(postQuestion, {
    onSuccess: (data) => {
      // data는 mutationFn이 반환하는 Promise가 resolved된 값이다.
      queryClient.setQueryData(["question", data.id.toString()], data); // 👈 특정 key의 값을 직접 바꿔준다.
    },
  });
};
```

---

위 두가지 방식 중 무엇을 선택해야 할까?

> I personally think that most of the time, **invalidation should be preferred**. Of course, it depends on the use-case, but for direct updates to work reliably, you need more code on the frontend, and to some extent duplicate logic from the backend. - TkDodo

두 방식의 차이는 값을 바꾸는 주체다. invalidateQueries는 백엔드의 응답값이 새로운 값이 되고, setQueryData는 값이 백엔드에서 응답받은 결과라 하더라도 값을 바꾸는 주체는 프론트다. 백엔드에게 상태 변경의 주체를 맡기는 것이 대부분의 경우 바람직해 보인다.

## Source

[Mutations](https://tanstack.com/query/v4/docs/guides/mutations)  
[Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
