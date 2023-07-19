---
title: "Error message에 객체 타입 전달하기"
date: 2022-09-18 03:10
categories:
  - javascript
---

## Error 타입

```javascript
interface ErrorConstructor {
  new(message?: string, options?: ErrorOptions): Error;
  (message?: string, options?: ErrorOptions): Error;
}
```

JS에서 Error의 생성자는 string 타입의 message를 파라미터로 받는다.  
그래서 기본적으로 다음과 같이 사용해볼 수 있다.

```javascript
throw new Error("Something went wrong");
```

그런데 zod라는 schema validation 라이브러리를 쓰다가 Error message에 간접적으로 객체를 전달할 수 있는 방법을 알게 되었다.  
zod에서 validation에 실패하면 ZodError를 throw 한다.

```javascript
try {
  mySchema.parse(query); // throw new ZodError()
} catch (error) {
  console.log(error.message);
}
/*
[
  {
    "received": "register2",
    "code": "invalid_enum_value",
    "options": [
      "login",
      "register"
    ],
    "path": [],
    "message": "Invalid enum value. Expected 'login' | 'register', received 'register2'"
  }
]
*/
```

error.message를 로그로 보니 object 타입으로 보인다. 사실 로그로 보는 이 message는 string이다. message를 인자로 줄 때, `JSON.stringify()`를 이용하여 객체를 string으로 바꿔 전달하면 Error을 받을 때 string타입이지만 객체 모습으로 message를 받을 수 있다.

```javascript
throw new Error(
  JSON.stringify({
    message: "Bad request",
    code: 400,
  }),
);
// 이런 식으로 throw하고

const errorObj = JSON.parse(error.message);

// 이런 식으로 접근해서 사용한다.
```
