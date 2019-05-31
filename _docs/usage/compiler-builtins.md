---
title: Compiler Built-Ins
category: usage
order: 2
description: This page is a reference for all new APIs that roblox-ts adds that do not exist in Roblox.
---

roblox-ts adds extra API that do not exist in Roblox by default, both for convenience and to address shortcomings in the mapping process between TypeScript and Lua.

## `typeOf`

This function maps directly to Roblox's `typeof` function. The reason for this difference is because `typeof` is an operator in TypeScript, so it cannot be used directly.

## `typeIs`

This function is a type guard form of `typeOf`, which provides type narrowing. `typeIs` is compatible with any type that Lua's `typeof` function is compatible with. 

```ts
const x = new Vector3() as unknown; // "unknown"

if (typeIs(x, "Vector3")) {
  x; // "Vector3"
}
```

## `classIs`

`classIs` is similar to `typeIs`, but provides type narrowing for Instances via the `ClassName` property. Comparing the `ClassName` property by hand does not provide such narrowing, because TypeScript's structural typing makes implementation difficult and complex. The `classIs` function is a compromise that keeps things simple while still offering `ClassName` narrowing: 

```ts
const x = game.FindFirstChild("X");
if (x && classIs(x, "Model")) {
  x.BreakJoints();
}
```

## `opcall`

`opcall` (object pcall) is a function which makes working with pcall much easier by means of returning an object rather than a tuple with variant types.

The result object is in the shape:
```ts
{ success: true, value: T } | { success: false, error: string }
```