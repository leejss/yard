---
title: "[Threejs] Shadow 추가하기"
date: 2022-12-18 22:59
categories:
  - javascript
---

Threejs에서 Shadow를 추가하는 세 가지 방법

## 1. Light과 Shadow map

Shadow를 cast해줄 light를 추가해준다. `PointLight`, `DirectionalLight`, `SpotLight`이 Shadow를 cast할 수 있다.

```javascript
// ex. directionalLight
const directionalLight = new THREE.DirectionalLight(0xfff, 0.5);
// ...
directionalLight.castShadow = true;
// shadow property를 통해서 shadow를 설정
directioanlLight.shadow.radius = 10;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
```

shadow를 cast할 plane mesh에도 receiveShadow 프로퍼티를 설정해준다.

```javascript
plane.receiveShadow = true;
```

shadow camera helper를 통해서 shadow 디버그 UI 추가해준다.

```javascript
const directioanlLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directioanlLightCameraHelper);
```

renderer에서 shadowMap 사용을 설정해준다.

```javascript
const renderer = new THREE.WebGLRenderer({ canvas });
//...
renderer.shadowMap.enabled = true; // Shadowmap 사용
```

## 2. Baking shadow

Baking shadow는 Texture를 통해서 Material에 직접 shadow을 고정시키는 테크닉을 말한다.

먼저 텍스처를 로드 해준다.

```javascript
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/texture/bakedShadow.jpg"); // Shadow를 나타내줄 이미지를 로드
```

<img src="/images/threejs/bakedShadow.jpg" width=500 height=500 alt="shadow" />

그 다음 Shadow를 위치시킬 Mesh(여기서는 Plane)의 Material에 매핑 해준다.

```javascript
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({
    map: bakedShadow,
  }),
);
```

이렇게 하면 shadow이미지가 3D Object위에 나타난다. 텍스처 이기 때문에 빛에 반응하지 않는다. 따라서 정적인 3D Object를 나타내는 경우에만 유효하다.

## 3. Shadow Plane Mesh

shadow 역할을 할 Plane mesh를 만들어 추가하는 방식.

shadow 모양을 잡아줄 알파맵 텍스처를 추가해준다.

```javascript
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");
```

<img src="/images/threejs/simpleShadow.jpg" width=500 height=500 alt="shadow" />

plane mesh를 만들고 알파맵을 이용하여 shadow 모습을 만든다.

```javascript
const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x00000,
    transparent: true,
    alphaMap: simpleShadow,
  }),
);

// plane을 수평이 되도록 회전시켜준다.
shadowPlane.rotation.x = -Math.PI * 0.5;
// Z fighting을 방지하기 위해 y 포지션을 살짝 올려준다.
shadowPlane.position.y = plane.position.y + 0.01;
```

그 다음 shadow plane이 3D object에 따라 animate 되도록 설정한다.

```javascript
const render = () => {
  const elapsedTime = clock.getElapsedTime();

  // animate sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // move shadow
  shadowPlane.position.x = sphere.position.x;
  shadowPlane.position.z = sphere.position.z;
  shadowPlane.material.opacity = (1 - sphere.position.y) * 0.3;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
```
