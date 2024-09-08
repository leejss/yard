---
date: "2024-01-11"
title: "Metamask extension의 PortStream 구조"
---

![](https://assets.vrite.io/64a1841b4969669109fb5334/RjZUdVajiLFOzoRCPJPqg.png)

## Port

Port는 message, connect, disconnect 등의 이벤트를 다루는 EventEmitter라고 볼 수 있다.

Port와 connected 상태인 다른 Port에 메시지를 보낼 수 있다.

```typescript
port.postMessage(message)
```

onMessage handler를 통해서 message를 다룰 수 있다.

```typescript
port.onMessage(msg => {/* handle message */})
```

chrome extension 경우, 서로 다른 runtime 간 data transfer를 위해서 `chrome.runtime.Port`를 이용한다.

```typescript
// in content script

const port = chrome.runtime.connect({name: "PORT_NAME"})

// in background script

chrome.runtime.onConnect.addListener(port => {
  if (port.name === "PORT_NAME") {

    // init something, register handlers, ...
    Engine.init(port)
  }
})


```

## PortStream

Metamask extension의 경우, data transfer를 위해 Port를 Stream으로 wrapping하여 PortStream을 만들어 사용한다.

```typescript
// in content script

const port = chrome.runtime.connect({name:"PORT_NAME"})
const portStream = new PortStream(port);
```

PortStream은 Duplex stream 즉, Readable + Writable stream이다. PortStream의 구현을 살펴 보면, Port에 message가 도착하면, message를 buffer에 push 한다.

[https://github.com/MetaMask/extension-port-stream/blob/main/src/index.ts#L18](https://github.com/MetaMask/extension-port-stream/blob/main/src/index.ts#L18)

PortStream이 다른 stream에 연결되어 있다면 buffer에 담긴 message는 stream은 이동한다.

[https://github.com/MetaMask/metamask-extension/blob/f0895f0028c44b8dfcc83d8906a827e3f59bfc23/app/scripts/contentscript.js#L263](https://github.com/MetaMask/metamask-extension/blob/f0895f0028c44b8dfcc83d8906a827e3f59bfc23/app/scripts/contentscript.js#L263)

`pump`는 stream을 서로 연결(pipe)하는 역할을 한다.

즉, 위 코드는 dapp page에서 발생한 message가 content를 타고 background까지 보내게 한다.

Port의 postMessage, onMessage의 로직을 Stream으로 감싸 data transfer의 flow를 보여준다.
