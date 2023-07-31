---
title: 'React Native navigation cheatsheet'
date: 2023-02-21 21:56
categories:
  - react-native
---

# **Passing parameters to routes**

## Passing params

```tsx
navigation.navigate('ScreenName', params)
```

## Read params

```jsx
const DetailedScreen = ({ route }) => {
  const {} = route.params
}
```

## Update params

```tsx
navigation.setParams(params) // update param state of the current screen
```

## Initial params

```tsx
<Stack.Screen initialParams={params} />
```

## Passing params to a previous screen

```tsx
navigation.navigate('Previous Screen', params)
```

# Type checking

## screen param mapping data

```tsx
type RootStackParamList = {
  Home: {}
  Profile: {}
  Setting: {} | undefined // optional param
}
```

### pass type into createNavigator function ⇒ Type checking for Navigator and Screen components

```tsx
const RootStack = createStackNavigator<RootStackParamList>()
```

## Type checking screen props - navigation props and route prop

```tsx
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>
```

or we can do this.

```tsx
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>
```

## Type checking for hooks

```tsx
const navigation = useNavigation<ProfileScreenNavigationProp>()
const route = useRoute<ProfileScreenRouteProp>()
```
