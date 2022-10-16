---
title: "Form에 알맞은 initial state"
categories:
  - react
---

## useState의 initial state

필터와 관련된 form을 작성하던 중 의문이 하나 생겼다. 아무런 필터가 없다는 것을 쉽게 판별할 수 는 없을까? 즉 필터의 absence를 어떻게 쉽게 나타낼 수 있을까?

### `null`

```ts
filters === null; // true or false
```

위와 같이 한번 나타내보고 싶었다. 그러기 위해서 initial state를 null로 초기화를 해줬다.

```tsx
type Filters = {
  title?: string;
  author?: string;
};
const [filters, setFilters] = useState<Filters | null>(null);
```
