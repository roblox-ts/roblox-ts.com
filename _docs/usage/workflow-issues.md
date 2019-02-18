---
title: Workflow Issues
category: usage
order: 2
description: This page lists known workflow issues when using roblox-ts.
---

This page lists known workflow issues with **roblox-ts**.

## Unrestricted File Access and Auto-Imports
Any file in your project has the ability to import any given module file. You can also auto-import files in VS Code by attempting to reference an exported member of a given module.

However, a `ModuleScript` inside of `game.ServerStorage` should not be accessible by a `LocalScript`.

## Objects May Only Have String Keys
In TypeScript, objects may only have string keys, and arrays may only have numerical keys. This contrasts heavily with the wild west of Lua tables, where the keys can be mixed and of any type. In roblox-ts (and TypeScript), we can solve this problem by using a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object. Maps are objects that hold arbitrary key-value pairs of data. They also support generic types:

```ts
const playerMap = new Map<Player, number>
playerMap.set(somePlayer, 5)
```

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is another useful data type that holds a set of unique values. It is akin to an array, but uniqueness is enforced.