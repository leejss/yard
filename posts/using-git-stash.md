---
title: "git stash 활용하기"
date: 2022-09-03 15:47
categories:
  - css
---

- 작업을 하다가 다른 브랜치로 이동해야 하는 경우가 있다.
- 커밋하지 않은 변경사항이 있으면 다른 브랜치로 이동할 수 없다.
- 다른 브랜치로 이동하는 방법은 1. 지금 작업 내용을 커밋하던가 2. Stash한다.
- 브랜치 이동할 때마다 커밋하면 깃 히스토리가 못생겨지니까 stash를 활용하자.

# git stash

- stash는 modified, tracked files과 staged changes를 스택에 저장(push)하여 working directory를 깨끗하게 만든다.
- stash한 것들은 다시 브랜치로 돌아와서 reapply하거나 stash를 수행한 브랜치가 아닌 다른 브랜치에도 적용할 수 있다.
- 그래서 때때로 변경사항을 다른 브랜치로 옮길 때도 stash를 활용한다.

---

- stash를 제대로 활용하기 위해서는 1. stash를 생성해야 하고 2. 생성한 stash를 확인해야하고 3. stash에 저장한 변경사항을 적용해야 하고 4. stash를 삭제할 수 있어야 한다.

## stash 생성하기

```shell
git stash
```

- 위 명령어를 통해 stash를 생성할 수 있다.
- 스택이 만들어지면서 워킹 디렉토리는 비워진다.

```shell
git stash -u
git stash --include-untracked
```

- 만약 untracked까지 stash에 push하고 싶으면 위 옵션 플래그와 함께 커맨드를 입력해주자.

```shell
git stash -s
git stash --keep-index
```

- 스테이징 영역에 있는 것들은 stash하고 싶지 않으면 위 커맨드로 입력하자.

## stash 확인하기

```shell
git stash list # 저장한 stash 확인하기
```

## stash 적용하기

```shell
git stash apply
```

- 스택에 stash가 하나만 있으면 위와 같이 입력하면 되는데 여러 개의 stash가 있는 경우도 있다.
- 그럴 경우 `git stash list`로 stash 이름을 확인하고 적용하고자 하는 stash 이름도 명시해준다

```shell
git stash apply stash@{2}
```

- `git stash apply`의 기본 행동은 가장 최근 stash를 적용하는 것이다.
- 만약 staged까지 복원하려면 다음과 같이 입력한다.

```shell
git stash apply --index
```

- `git stash apply`는 stash를 삭제하지는 않는다.

## stash 삭제하기

```shell
git stash drop [stash이름] # 이름을 입력하지 않으면 가장 최근 stash drop
```

- apply와 동시에 drop하고 싶다면 다음과 같이 입력한다

```shell
git stash pop
```
