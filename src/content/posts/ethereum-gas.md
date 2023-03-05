---
title: 'Gas fee 이해하기'
date: 2023-03-05 19:58
categories:
  - ethereum
---

# Gas

transaction needs computation

unit of computation

Transaciton을 하기 위한

## Gas cost

스마트 컨트랙트는 컴파일이 되면서 명령의 집합인 OPCODES로 변환이 되는데 OPCODES의 명령을 수행하는데 고정된 gas cost가 발생한다.

[evm-opcodes](https://github.com/crytic/evm-opcodes)

## Gas fee

Transaction을 성사시키기 위해 유저가 지불해야 하는 요금. 단위는 gwei를 사용한다.

How gas fee is calculated?

## London Fork (London hard fork)

gas free가 계산되는 방식은 2021년 8월에 일어난 London Fork 전과 후가 다르다. 그전에 Fork가 무엇일까?

### Fork

Fork는 블록체인 네트워크 프로토콜 또는 내부 구현의 변화를 말한다. Fork를 통해서 새로운 EIP(Ethereum Improvement Proposals)가 반영되기도 한다. Fork는 변화 정도에 따라서 두 가지로 나뉜다.

- Hard fork : Fork후의 블록체인이 이전 블록체인과 호환되지 않을 정도의 변화. 즉, backward-compatible하지 않는 Fork다. 따라서 기존 노드가 새로운 블록체인에 참여하기 위해서는 업데이트가 필요하다.
- Soft fork : 새로운 프로토콜이 backward-compatible하여 기존 노드들은 여전히 참여할 수 있다.

어쨌든 Fork를 하게 되면 Fork를 하게 되면 전, 후 블록체인으로 나뉘게 된다.

### [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559#simple-summary)

London fork의 EIP-1559의 도입에 따라서 gas fee를 계산하는 방식이 달라지게 된다. 따라서 London fork 전과 후 gas fee를 계산하는 방식이 다르다.

### Pre London Fork

London Fork 이전의 gas fee를 계산하는 방식은 비교적 단순했다.

gas fee = gas spent \* gas price

transaciton을 실행하는데 들어간 gas와 지불하고자 하는 가격을 곱한 값이 gas fee가 된다. 여기서 주목할 점은 gas price는 유저가 지불하고자 하는(willing to pay) 가격이라는 점이다. 높은 가스 가격을 지불할 수록 mienr에게 경제적 요인으로 작용하기 때문에 트랜잭션이 블록체인에 더 빨리 반영이 된다. 따라서 현재 블록체인의 상황에 맞게 적당한 gas price를 설정하는 것이 중요하다.

메타마스크 같은 블록체인 지갑 애플리케이션이 적절한 가스가격을 estimate하기 때문에 유저 스스로 적절한 가스 가격을 계산할 필요는 없다. 원한다면 할 수는 있다고는 한다.

#### Gas Limit

트랜잭션에 들어가는 가스의 최대 값을 유저가 정한 값이다. 최대 이 정도 가스는 부담하겠다는 의미다. 가스 가격과 마찬가지로 애플리케이션 단에서 측정하여 설정해준다.

- gas used > gas limit: 트랜잭션은 실패하고 들어간 가스에 대한 비용은 유저가 지불해야 한다.
- gas used <= gas list: 트랜잭션은 성공하고 사용하지 않은 가스는 환불된다.

tx단위의 gas limit말고 block 단위의 gas limit도 있다. block gas limit이라고 한다.

### Post London Fork

London Fork 이후 gas fee를 계산하는 방식은 다음과 같이 바뀌었다.

gas fee = gas spent \* (base fee \* priority fee)

base fee: 트랜잭션이 다음 블록에 포함되기 위한 기본 fee. 유저가 정하는 것이 아닌, 네트워크가 정한 값이다. 트랜잭션이 성공하면 base fee \* gas used 만큼 burn되어 ETH의 전체 발행을 offset한다.

priority fee: 트랜잭션이 블록에 빨리 포함되기 위해 miner에게 지불하는 팁 개념이다. 그렇기 때문에 선택적이다. 즉, 0 일 수도 있다. 이더스캔에서 아무 tx를 눌러봐서 보면 gas price가 base fee로만 이루진 경우도 있다. 유저가 직접 설정할 수 있지만 애플리케이션 단에서 설정해준다.

#### base fee는 어떻게 계산되는가 ?

base fee는 네트워크가 계산한다고 했는데 그렇다면 어떻게 계산되는 걸까? 기본적으로 가격은 수요가 (공급보다) 많아지면 올란간다. base fee도 같은 매커니즘으로 움직인다. 네트워크에 대한 수요가 많아지면 base fee도 올라간다.

네트워크는 target gas limit(블록의 맥시멈 가스)를 가지고 있고 만약 현재 가스가 이를 초과한다면 다음 블록의 base fee는 올라가고 반대 경우엔 내려간다.
