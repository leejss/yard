---
date: "2024-06-08"
title: "(Effect-TS) Service 생성하기 (1)"
---

# Single Service Program with No Layer

- Effect TS 에서는 Service가 Context에 저장된다.

```typescript
// pseudo context code
class ServiceATag {
  static _tag: "ServiceA"
}
class ServiceA {}
class ServiceBTag {
  static _tag: "ServiceB"
}
class ServiceB {}

const Context = {
  [ServiceATag._tag]: new ServiceA(),
  [ServiceBTag._tag]: new ServiceB()
}1
```

- 따라서 `Service`를 식별할 `Tag`를 생성해준다.

  ```typescript
  import {Effect, Context} from "effect"
  interface ApiServiceImpl {
    readonly getPosts: Effect.Effect<Post[], Error, never>;
  }

  // tagging the service
  class ApiService extends Context.Tag("ApiService")<
    ApiService,
    ApiServiceImpl
  >() {

    // Implementation of ApiService
    static readonly live = {
      getPosts: Effect.tryPromise({
        try: () =>
          fetch("https://jsonplaceholder.typicode.com/todos").then(
            (res) => res.json() as Promise<Post[]>,
          ),
        catch: () => {
          return new Error("Error while fetching data");
        },
      }),
    };
  }
  ```

- 그리고 이 Service를 사용하는 Effect를 생성한다.

  ```typescript
  const program: Effect.Effect<Post[], Error, ApiService> = Effect.gen(function* () {
    // get service
    const service = yield* ApiService;

    // run effect
    const posts = yield* service.getPosts;

    // return result
    return posts;
  });
  ```

- `program`의 타입이 `Effect.Effect<Post[], Error, ApiService>`이 인 것을 확인할 수 있다. `ApiService`가 Requirement로 되어 있다. 따라서 program은 ApiService을 provide하기 전에는 실행할 수 없다.

  ```typescript
  // provide the service
  const runnable = program.pipe(
    Effect.provideService(ApiService, ApiService.live),
  );

  // also
  // const runnable = Effect.provideService(program, ApiService, ApiService.live);

  // running the program
  const posts = await runnable.pipe(Effect.runPromise);
  console.log("Posts", posts);
  ```
