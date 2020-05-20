---
title: Unsupported Features
order: 6
category: roact
description: A list of limitations and unsupported features with the Roact library and roblox-ts.
---

These are the parts of JSX that arent supported by `roblox-ts/rbx-roact` right now, either due to limitations of Roact or due to not yet being implemented.

## Text between elements <small>Roact Limitation</small>
`roblox-ts` will explicitly show an error message about this during compilation.
```jsx
const element = <frame>Text here is not supported</frame>;
```

## Expressions <small>Roact Limitation</small>
### Disallowed
`roblox-ts` will explicitly error if you try and use literal expressions

String
```jsx
const element = <frame>{"Hello, World!"}</frame>;
```
Number, or any sort of numeric expression
```jsx
const element = <frame>{10}</frame>;
```
Variable 

In later versions of `roblox-ts` (`> 0.0.18`), Variables of type `Roact.Element[]` or `Roact.Element` are allowed.
{:.info}

```jsx
const element = <frame>{variable}</frame>;
```

Arrow Function
```jsx
const element = <frame>{() => ...}</frame>;
```

### Allowed
Function Call (Roact.Element return type only)
```jsx
function test(): Roact.Element {
    return <frame/>;
}

const element = <screengui>{test()}</screengui>;
```

The features below are only available `> 0.0.18`!
{:.warn}

Function/Variable that returns `Roact.Element[]`
```jsx
function test(): Roact.Element[] {
    return [<frame/>, <frame/>];
}

const element = <screengui>{test()}</screengui>;
```
```jsx
const variable = [<frame/>, <frame/>];
const element = <screengui>{variable}</screengui>;
```
