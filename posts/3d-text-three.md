---
title: "[Threejs]Threejs를 이용한 3D Text"
date: 2022-12-13 23:56
categories:
  - javascript
---

Three.js를 이용하여 3D Text를 만들기 위해서는 `TextGeometry`를 사용해야 한다. `TextGeometry`는 `node_modules/three`가 아닌 `node_modules/three/examples/jsm/geometries/TextGeometry`에서 import를 해야 한다.

```js
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
```

그리고 폰트 스타일을 렌더링 하기 위해서는 json형태의 font 데이터가 필요하다. three/examples에 기본 폰트가 몇 개 추가되어 있으니 이를 활용하여 테스트 해볼 수 있다.

폰트를 적용하기 위해서는 FontLoader가 필요하다. TextGeometry와 마찬가지로 example 하위 디렉토리에서 import 해야 한다.

```js
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
```

이제 text mesh를 만들어서 scene에 추가해보자.

```js
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
  const textGeometry = new TextGeometry("3D TEXT", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 2,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial();
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});
```

여기 까지 threejs를 이용하여 간단하게 3D 텍스트를 만드는 방법이다.

전체 코드는 [여기에서](https://github.com/leejss/three-text) 확인할 수 있다.
