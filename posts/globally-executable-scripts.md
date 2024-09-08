---
date: "2024-05-16"
title: "globally executable nodejs scripts"
---

# globally executable nodejs scripts

## `PATH`

`PATH` 환경 변수는 Unix-like 운영 체제에서 매우 중요한 역할을 합니다. `PATH`는 실행 파일을 검색할 디렉토리 목록을 정의합니다. 터미널에 명령어를 입력하면, 시스템은 `PATH`에 나열된 디렉토리에서 해당 실행 파일을 찾습니다.

`PATH` 환경 변수를 확인하려면 다음 명령어를 사용합니다:

`echo $PATH`

이 명령어를 실행하면 다음과 같은 출력이 나올 수 있습니다:

`/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`

각 디렉토리는 콜론(`:`)으로 구분됩니다. 이 목록에 있는 디렉토리에 실행 파일을 배치하면, 해당 파일을 어디서든지 실행할 수 있게 됩니다.

## `#!/usr/bin/env node`

`#!/usr/bin/env node`는 쉐방(shebang) 라인으로, 스크립트를 실행할 인터프리터를 지정합니다. 이 방법은 더 유연하고 이식성이 높습니다. 다음은 각 부분에 대한 설명입니다:

- `#!`: 쉐방의 시작을 나타냅니다.
- `/usr/bin/env`: `env` 명령어는 지정된 프로그램을 찾고 실행합니다. 이 경우, `node` 인터프리터를 찾습니다.
- `node`: 스크립트를 실행할 Node.js 인터프리터를 지정합니다.

`env` 명령어를 사용하면 시스템 `PATH`에서 인터프리터를 검색하기 때문에, Node.js가 표준 위치가 아닌 다른 위치에 설치되어 있어도 스크립트를 실행할 수 있습니다.

## 스크립트 작성, 실행

```javascript
#!/usr/bin/env node

// entries.mjs

import fs from "fs/promises";

const currentDir = process.cwd();

// how to get arguemtns from the command line
const arg = process.argv[2];
if (!arg) {
  console.log("Usage: stats <directory>");
  process.exit(1);
}

const targetDir = currentDir + "/" + arg;
const entries = await fs.readdir(targetDir);

console.log("entries: ", entries);
```

터미널을 열어 아무 디렉토리에서 다음 커맨드를 입력

```shell
entries.mjs .
```
