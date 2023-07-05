---
title: "타입스크립트에서 클래스 다루기 - 1"
date: 2022-10-17 21:31
categories:
  - typescript
---

타입스크립트를 통해서 typed class를 만들 수 있다.

## Class Members

### fields

자바스크립트에서도 클래스 필드를 만들 수 있다.

```javascript
// javascript
class Person {
  name = "James"; // 선언과 동시에 초기화
  age; // 필드 선언
}
```

타입스크립트에서는 필드의 타입 어노테이션이 가능하다.

```typescript
class Person {
  name: string = "James";
  age: number;
}
```

**--strictPropertyInitialization**  
타입스크립트 컴파일러 옵션에서 위 옵션을 `true`로 할 시 (또는 strict가 true일 시) 선언된 필드가 생성자(constructor)에서 초기화를 안 할 시, 에러를 발생시킨다.

```typescript
// Error
class Person {
  age: number; // ❌ Property 'age' has no initializer and is not definitely assigned in the constructor.(2564)
  constructor() {}
}

// Do this
class Person {
  age: number;
  constructor(age: number) {
    this.age = age;
  }
}
```

**readonly**  
타입스크립트에서는 클래스 멤버의 성격와 행동을 제어할 수 있는 modifiers를 제공해준다.  
readonly인 클래스 필드는 생성자 밖에서 값이 바뀌는 것을 제한한다. => 오직 생성자를 통해서 초기화를 할 수 있는 필드임을 나타낸다.

```typescript
class Person {
  readonly age: number;
  constructor(age: number) {
    this.age = age;
  }

  setAge(age: number) {
    this.age = age; // ❌ Cannot assign to 'age' because it is a read-only property.(2540)
  }
}

const p = new Person(24);
p.age = 40; // ❌ Cannot assign to 'age' because it is a read-only property.(2540)
```

**implements**  
타입스크립트에서는 implements clause를 통해서 클래스의 implementation을 컴파일 단계에서 체크할 수 있다.

```typescript
interface Person {
  name: string;
}

class Main implements Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

> It doesn’t change the type of the class or its methods at all. A common source of error is to assume that an implements clause will change the class type - it doesn’t! - Typescript documentation

implements clause를 작성하면서 했던 실수는 `interface`를 통해서 타입 추론을 하려고 했던 것이다. 하지만 `implements`는 클래스의 타입을 바꾸지 않는다. 따라서 `interface`를 통해서 타입추론을 할 수 없다. `implements`는 말 그대로 implementation을 체크한다.

**Method overriding**

```typescript
class Person {
  greet() {}
}

class Man extends Person {
  greet(name: string) {} // Property 'greet' in type 'Man' is not assignable to the same property in base type 'Person'. Type '(name: string) => void' is not assignable to type '() => void'.(2416)
}
```

메소드 오버라이딩 과정에서 Base 클래스의 타입을 따라야 한다.

**Initialization order**

- base class field 초기화
- base constructor 호출
- derived class field 초기화
- derived constructor 호출

```typescript
class Base {
  name: string = "Base";
  constructor() {
    console.log(this.name);
  }
}

class Derived extends Base {
  name = "Derived";
}

const d = new Derived();
console.log(d.name);

// Base
// Derived
```

### Member Visibility

타입스크립트에서는 클래스 멤버의 visibility를 제어할 수 있는 세 가지 modifiers를 제공한다.

- `public`
- `protected`
- `private`

디폴트는 public이다.  
protected는 서브클래스에서만 접근이 가능하다. private는 오직 자기 자신 클래스에서만 사용이 가능하다.

**Exposure of protected members**  
protected 필드 선언시, modifier는 상속이 되지 않는다. 따라서 서브클래스에서도 protected를 명시해줘야 한다. (public으로 하는 것이 의도가 아니라면!)

```typescript
class Base {
  protected val = 123;
}

class Derived extends Base {
  val = 456; // Now it's public!
}

const d = new Derived();
console.log(d.val); // 456

// ========================================

class Base {
  protected val = 123;
}

class Derived extends Base {
  protected val = 456; // Protected를 명시해준다.
}

const d = new Derived();
console.log(d.val); // ❌ Property 'val' is protected and only accessible within class 'Derived' and its subclasses.
```

**Cross-hierarchy protected access**  
Derived 클래스의 인스턴스에서 Base 클래스 인스턴스의 protected 필드에 접근할 수 있을까?

```typescript
class Base {
  protected val = 123;
}

class Derived extends Base {
  getValFromBase(b: Base) {
    console.log(b.val); // ❌ Property 'val' is protected and only accessible through an instance of class 'Derived'. This is an instance of class 'Base'.
  }
}
```

타입스크립트에서는 불가능하다.

**Cross-instance private access**  
같은 클래스의 인스턴스 간, private 필드를 접근할 수 있을까?

```typescript
class Base {
  private val = 123;
  getVal(b: Base) {
    console.log(b.val); // No error
  }
}
```

타입스크립트에서는 가능하다.

## References

[Typescript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
