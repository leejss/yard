---
title: "React Native navigation cheatsheet"
date: 2023-02-21 21:56
categories:
  - react-native
---

# **Passing parameters to routes**

## Passing params

```typescript
navigation.navigate("ScreenName", params);
```

## Read params

```javascript
const DetailedScreen = ({ route }) => {
  const {} = route.params;
};
```

## Update params

```typescript
navigation.setParams(params); // update param state of the current screen
```

## Initial params

```typescript
<Stack.Screen initialParams={params} />
```

## Passing params to a previous screen

```typescript
navigation.navigate("Previous Screen", params);
```

# Type checking

## screen param mapping data

```typescript
type RootStackParamList = {
  Home: {};
  Profile: {};
  Setting: {} | undefined; // optional param
};
```

### pass type into createNavigator function ⇒ Type checking for Navigator and Screen components

```typescript
const RootStack = createStackNavigator<RootStackParamList>();
```

## Type checking screen props - navigation props and route prop

```typescript
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;
```

or we can do this.

```typescript
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;
```

## Type checking for hooks

```typescript
const navigation = useNavigation<ProfileScreenNavigationProp>();
const route = useRoute<ProfileScreenRouteProp>();
```
