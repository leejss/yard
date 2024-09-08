---
title: createSignal 살펴보기
date: 2023-09-16 13:21
categories:
  - javascript
---
### full code

```ts
// Define type for running and subscription
interface Running {
  execute: () => void;
  dependencies: Set<Set<Running>>;
}

// Define the context
const context: Running[] = [];

// subscribe function
function subscribe(running: Running, subscriptions: Set<Running>): void {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

// createSignal function
export function createSignal<T>(value: T): [() => T, (newValue: T) => void] {
  const subscriptions: Set<Running> = new Set();

  const read = (): T => {
    const running = context[context.length - 1];
    if (running) {
      subscribe(running, subscriptions);
    }
    return value;
  };

  const write = (newValue: T): void => {
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
    value = newValue;
  };

  return [read, write];
}

// cleanup function
function cleanup(running: Running): void {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }
  running.dependencies.clear();
}

// createEffect function
export function createEffect(fn: () => void): void {
  const execute = (): void => {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  const running: Running = {
    execute,
    dependencies: new Set(),
  };

  execute();
}

```

- two public function. `createSignal` and `createEffect`
- `createSignal`: Signal (aka Reactivity) 를 생성.
- `createEffect`: Effect를 생성

### `createSignal` 살펴보기

먼저 `createEffect`도 마찬가지지만, `createSignal`은 closure를 이용한다는 것에 주목하자. createSignal을 호출하면, closure를 생성하면서 두 함수, `read`와 `write`함수를 define하고 return 한다.

```ts
const [count, setCound] = createSignal(1)
```

closure는 심플하게 이해한다면, 함수의 hidden context object라고 생각하면 된다. 예를 들어 `createSignal`을 호출한다면, 다음과 같은 closure를 생각하면 된다.

```ts
// Inside createSignal conetxt


const closure = {
 value: 1,
 subscription: Set([])
}

const read = () => {}
const write = () => {}

```

`createSignal`안에서 정의한 `read`와 `write`는 closure에 접근할 수 있다.

#### read and write

```ts
const read = (): T => {
 const running = context[context.length - 1];
 if (running) {
   subscribe(running, subscriptions);
 }
return value;
};
```

read가 하는 일은 크게 보면 closure에서 value를 읽어와 return 한다. running과 관련된 부분은 잠시 가려두자.

```ts
  const write = (newValue: T): void => {
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
    value = newValue;
  };
```

write가 하는 일도 단순해보인다. closure의 value를 newValue로 업데이트 하고 있다. read와 write 함수는 그들의 역할을 수행하기 전에 일련의 작업을 진행한다. 이 작업들은 Effect와 관련이 있다.

간단히 살펴보면, read 같은 경우,

```ts
 const running = context[context.length - 1];
 if (running) {
   subscribe(running, subscriptions);
 }
```

module scope에 정의한 스택 형태를 가진 `context`에서 읽어와서 running이라는 변수에 할당한다. 만약 running이 있다면, `subscribe`를 호출한다.

`subscribe`를 살펴보면,

```ts
function subscribe(running: Running, subscriptions: Set<Running>): void {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}
```

두 가지 파라미터, running과 subscriptions를 받는다. 그리고 일단은 각각의 Set에 add를 수행하는 것을 알 수 있다. `subscribe`를 호출하고 나면 `context`와 `subscriptions`가 업데이트 한다는 것을 추측할 수 있다.

write같은 경우,

```ts
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
```

closure의 subscriptions를 순환하여 running 객체의 execute메소드를 호출한다.

아직은 정확이 이 부분들이 어떤 식으로 동작하는지 이해하기 어렵다.

이제 `createEffect`를 살펴보자

### `createEffect` 살펴보기

```ts
const [count, setCount] = createSignal(1);
console.log("read count", count());
createEffect(() => {
  console.log("createEffect", count());
});

setCount(2);
console.log("after setCount", count());
```

위 코드를 실행하면 로그는 다음과 같다

```shell
read count 1
createEffect 1
createEffect 1
after setCount 2
```

Order of execution 을 보면 setCount 이전에 createEffect의 인자로 넣어준 함수가 실행되었다는 점이다. 즉 createSignal의 write함수, 여기서는 setCount함수가 어떤 식으로는 createEffect의 인자 함수를 실행한 것인데, 여기서 일종의 bidirectional binding (또는 subscription)이 사용된다.

running과 context를 살펴보자.

```ts
interface Running {
  execute: () => void;
  dependencies: Set<Set<Running>>;
}

// Define the context
const context: Running[] = [];
```

context는 running 객체를 담는 배열이다. running 객체는 execute, dependencies 두 properties를 가지고 있다. context와 running의 dependencies를 통해서 reactivity가 만들어진다.

running은 createEffect가 생성하고 context에 Push한다. createEffect를 살펴보면,

```ts
export function createEffect(fn: () => void): void {
  const execute = (): void => {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

  const running: Running = {
    execute,
    dependencies: new Set(),
  };

  execute();
}

```

최종적으로 execute함수를 정의하고 호출한다. 그리고 다음의 closure가 생성된다.

```ts
// 가상의 closure 객체
const closure = {
 fn: () => { /* */ },
 running: {
  execute: () => { /* */ },
  dependencies: Set()
 }
}

```

createEffect안에 정의된 execute함수는 위 closure에 접근할 수 있다. createEffect는 running을 생성하고 context에 push한다.

```ts
createEffect(() => {
  console.log("createEffect", count());
});
```

위 statement가 실행하고 나면 context는 다음과 같다.

```ts
const context = [
 {
  execute: () => { /* clean up running and call fn */ },
  dependencies: Set()

 }
]
```

createEffect는 최초 실행 시, 인자로 주어진 함수를 한번 호출한다. 인자로 주어진 함수에 createSignal의 read함수를 호출하는 문이 있다면 subscription이 일어난다. read함수를 다시 살펴보면,

```ts

  const read = (): T => {
    const running = context[context.length - 1];
    if (running) {
      subscribe(running, subscriptions);
    }
    return value;
  };

```

running을 가져와서 subscribe를 호출한다.

```ts

function subscribe(running: Running, subscriptions: Set<Running>): void {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

```

subscribe을 호출하고 나면 context와 createSignal의 closure는 다음과 같이 업데이트 될 것이다.

```ts

// createSignal closure
const closure = {
 value: 1, 
 subscription: Set( [ running ] )
}

// context 
const context = [
 {
  execute: () =>{},
  dependencies: Set ( subscriptions)
 
 }
]
```

위 구조를 살펴보면 closure는 running을, context는 dependencies를 서로 기억하고 있다.

이제 createSignal의 write함수를 살펴보자.  

```ts

  const write = (newValue: T): void => {
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
    value = newValue;
  };

```

write함수는 subscriptions에 등록된 running을 순환하면서 running.execute를 실행한다.

```ts

  const execute = (): void => {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  };

```

running.execute는 먼저 cleanup를 호출하는데, 이는 subscriptions와 dependencies를 비우는 역할을 한다. 그리고 다시 context에 running을 push한다. execute가 reference하고 있는 running은 createEffect의 closure에 있는 running이다.

fn을 실행한다. 그러면 다시 createSignal의 read함수가 호출하면서 subscription이 일어난다. context는 pop되지만, createSignal, createEffect의 closure는 서로를 기억하게 된다.

이런 식으로 서로를 기억하면서 Signal과 Effect를 통한 reactivity가 만들어진다.

## Keywords

Signal, Reactivity

## References

<https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf>
