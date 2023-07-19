---
title: "Typed event emitter"
date: 2023-02-25 00:27
categories:
  - typescript
---

Event emitter를 사용할 때, event name과 handler의 타입을 미리 정의하여 typed event emitter를 만들 수 있다. 그럴려면 먼저 event emitter가 필요한데 Nodejs와 브라우저 환경에서 모두 동작하는 `events` 패키지를 이용해본다.

## typed event emitter

```typescript
type Events = {
  approved: () => void;
  rejected: () => void;
  send: (message: string) => void;
};
```

먼저 eventName이 key고 value가 handler인 형태로 타입을 작성해준다. 이벤트이름을 사전에 정의하고 이에 대응하는 핸들러의 타입도 정의해준다.

```typescript
import EventEmitter from "events";

class TypedEventEmiiter extends EventEmitter {
  on<K extends keyof Event>(eventName: K, handlers: Events[K]) {
    return super.on(eventName, handler);
  }

  emit<K extends keyof Event>(eventName: K, ...args: Parameters<Events[K]>) {
    return super.emit(eventName, ...args);
  }
}
```

기본적으로 on과 emit만 구현해보도록 한다. once, remove 등도 이와 크게 다르지 않다.
