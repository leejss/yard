---
title: "비동기 자바스크립트와 실행 순서"
date: 2022-12-01 21:41
categories:
  - javascript
---

지바스크립트 엔진은 콜스택(aka 실행 컨텍스트 스택)을 통해서 함수의 실행 순서를 컨트롤 한다. 런타임 과정에서 함수 실행문을 만나면 함수 컨텍스트를 생성하여 콜스택에 푸시한다. 함수의 실행이 끝나면 함수 컨텍스트는 콜스택에서 팝되어 사라지고 다른 컨텍스트로 함수 실행이 이동한다.

자바스크립트 엔진은 콜스택을 하나만 가지고 있다. 이런식으로 콜스택을 통해서 함수의 실행은 동기적으로 이루어 진다. 즉, 어떤 한 함수의 실행이 다른 함수의 실행을 막는다 (Blocking). 자바스크립트 엔진은 동기적으로 동작한다.

자바스크립트 런타인 환경에서 비동기 작업을 처리하는 곳은 자바스크립트 엔진이 아닌 이벤트 루프와 태스크 큐, 그리고 마이크로태스크 큐다. 이를 통해 알 수 있는 것은 자바스크립트 엔진은 싱글 쓰레드 이지만 자바스크립트 런타임 환경(브라우저 또는 Nodejs)은 멀티 쓰레드다.

> Node.js runs JavaScript code in a single thread, which means that your code can only do one task at a time. However, Node.js itself is multithreaded and provides hidden threads through the libuv library, which handles I/O operations like reading files from a disk or network requests. - [https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js](https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js)

코드를 작성할 때, 위에서 아래로 순차적으로 작성하기 때문에 코드의 실행 또한 위에서 아래로 순차적으로 이루어지는 것을 기대한다. 하지만 비동기 작업을 처리하는 방식의 특성 상 코드의 실행이 작성된 순서와 반드시 일치하지 않을 수 있다. 이러한 특성을 이해하고 코드의 실행 순서를 이해하는 것이 중요하다.

### 비동기 WebAPI

비동기로 동작하는 WebAPI에는 여러가지가 있는데 대표적으로 setTimeout, setInterval와 같은 호출 스케줄링, XMLHttpRequest, Fetch와 같이 네트워크 요청을 하는 API가 비동기로 동작한다.

```js
console.log("start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
console.log("end");
```

따라서 다음 코드를 실행하면

```txt
start
end
setTimeout
```

를 호출하게 된다.

setTimeout의 콜백은 비동기 작업이기 때문에 태스크 큐에 먼저 들어가게 되고 콜스택이 비워지면 이벤트 루프에 의해 콜스택에 푸시되어 실행된다. 콜스택이 비워진 이후에 비동기 작업이 실행되기 되기 때문에 맨 마지막에 로그가 찍히게 된다.

```js
console.log("start");
[1, 2, 3, 4].forEach((n) => {
  setTimeout(() => {
    console.log(n);
  }, 0);
});
console.log("end");
```

위 코드를 실행하면 로그는 어떻게 나올까?

```txt
start
end
1
2
3
4
```

콜스택이 전부 비워지고 난 이후, 즉 `console.log("end")`가 실행되고 난 이후 이벤트 루프에 의해서 완료된 비동기 작업을 콜스택에 푸시한다.

```js
console.log(n);
```

이 차례로 태스크 큐에 들어가서 나오게 된다.

```js
setTimeout(() => {
  console.log("1");
}, 0);
setTimeout(() => {
  console.log("2");
}, 0);
setTimeout(() => {
  console.log("3");
}, 0);
setTimeout(() => {
  console.log("4");
}, 0);
setTimeout(() => {
  console.log("5");
}, 0);
```

```txt
1
2
3
4
5
```

WebAPI의 비동기 작업은 태스크 큐에 의해서 관리가 되기 때문에 비동기 작업의 실행 순서가 호출 순서와 동일한 것을 알 수가 있다.

### Promise

```js
console.log("start");
Promise.resolve().then(() => {
  console.log("1");
});
Promise.resolve().then(() => {
  console.log("2");
});
console.log("end");
```

```txt
start
end
1
2
```

```js
console.log("start");
new Promise((resolve) => resolve(1)).then((res) => {
  console.log(res);
});
new Promise((resolve) => resolve(2)).then((res) => {
  console.log(res);
});
console.log("end");
```

```txt
start
end
1
2
```

프로미스의 후속처리 메소드로 넘겨준 콜백은 비동기로 동작한다. WebAPI의 비동기 콟백과는 다르게 프로미스의 콜백은 마이크로태스크 큐에 담기며 태스크 큐보다 우선순위가 높다. 우선순위가 높다는 것은 만약 태스크 큐와 마이크로태스크 큐에 동시에 대기중인 태스크가 있다면 마이크로태스크 큐에 있는 태스크 부터 콜스택에 푸시한다는 것을 의미한다.

반면 다음 코드를 보자.

```js
console.log("start");
new Promise(() => {
  console.log("1");
});

new Promise(() => {
  console.log("2");
});
console.log("end");
```

이 코드의 실행 순서는 어떻게 될까?

```txt
start
1
2
end
```

프로미스 = 비동기로 이해하는 것은 바람직하지 않다. 프로미스를 생성하는 것 자체는 동기로 동작한다. 비동기로 동작하는 것, 즉 마이크로태스트 큐에 담기는 것은 생성자에 넘겨준 콜백이 아닌 후속처리 메소드(`then`)에 넘겨준 콜백이다.

```js
console.log("start");
new Promise((resolve) => {
  console.log("1");
  resolve();
}).then(() => {
  console.log("2");
});

new Promise((resolve) => {
  console.log("3");
  resolve();
}).then(() => {
  console.log("4");
});
console.log("end");
```

```txt
start
1
3
end
2
4
```

`then`의 콜백은 뒤에 실행되는 것을 알 수 있다. 무엇이 비동기로 동작하는 지 구분해야 실행 순서를 정확히 파악할 수 있다.

### `async`/`await`

Async/await은 비동기를 마치 동기처럼 구현하듯이 코드를 작성할 수 있도록 도와주는 키워드다. 그런데 헷갈리지 말아야 한다. 동기 처럼 구현하듯이 코드를 작성할 수 있다는 말이 동기로 동작하게 만든다는 말이 아니다.

다음 코드를 보자

```js
function sleep(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

const getTodo = async () => {
  console.log("start - getTodo");
  `await` sleep(0);
  console.log("end - getTodo");
  return {
    title: "Study",
    done: false,
  };
};

console.log("start");
getTodo();
console.log("end");
```

위 코드를 실행하면 로그는 어떻게 나타날까?

1. 먼저 console.log("start")를 실행하여 콘솔에는 start가 나온다.
2. getTodo()를 실행한다.
3. console.log("start - getTodo") 를 실행하여 콘솔에는 start - getTodo가 찍힌다.
4. `await` sleep(1500)을 실행한다. 이때, await은 프로미스가 settled상태가 될 때 까지 다음 코드의 실행을 대기한다. 그런데 다음 코드의 실행을 대기한다는 것이 자바스크립트 엔진을 잠시 멈춘다는 것이 아니다. 마치 `await` 이 후의 코드를 프로미스의 콜백 처럼 콜스택이 비워진 후 실행된다. 따라서 코드의 실행은 함수 밖으로 넘어가게 된다.
5. 코드의 실행이 밖으로 넘어가게 되어 console.log("end")를 실행하여 콘솔에는 end가 찍힌다.
6. await한 프로미스가 settled되어 이후 코드를 실행하게 된다. 따라서 console.log("end - getTodo")가 실행되어 콘솔에는 end - getTodo가 찍힌다.

따라서 콘솔에는 다음과 같이 찍힌다.

```txt
start
start - getTodo
end
end - getTodo
```

따라서 `async` / await은 비동기 작업을 동작하게 해준다. 동기적으로 동작하는 이유는 await이 프로미스가 settled될 때 까지 다음 코드를 대기하기 때문이다. 하지만 전체 코드의 실행을 동기로 바꿔주는 것이 아니다. 비동기 작업은 콜스택이 비워진 후 실행되는 것은 변함이 없다.

```js
(async () => {
  console.log("start");
  `await` Promise.resolve().then(() => {
    console.log("setteld");
  });
  console.log("end");
})();
console.log("last");
```

위 코드를 실행하면

```txt
start
last
settled
end
```

가 출력된다. 즉 `async` 함수 내부에서는 `await` 키워드를 통해 비동기 작업을 동기적으로 동작하게 해준다.

```js
(async () => {
  console.log("start");
  Promise.resolve().then(() => {
    console.log("setteld");
  });
  console.log("end");
})();
console.log("last");
```

반면 `await` 키워드를 빼면

```txt
start
end
last
setteld
```

가 출력된다. 여기에서 알 수 있는 것은 `async` 함수 내부에서 코드의 실행은 `await` 키워드가 있냐 없냐에 따라서 달라지게 된다.
