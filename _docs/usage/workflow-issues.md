---
title: Workflow Issues
category: usage
order: 2
description: This page lists known workflow issues when using roblox-ts.
---

This page lists known workflow issues with **roblox-ts**.

## `All files must be modules when the '--isolatedModules' flag is provided`

This error is encountered when a file in your project is not considered a module (referring to "modules" in JavaScript, not ModuleScripts). As per the ECMAScript specification, files are considered modules in TypeScript when they contain at least one import or export. If a file is *not* a module, then it will share its top-most scope with every other file in your project.

Therefore, the solution here is to ensure that every file in your project has at least one `import` or `export` statement. If you don't need either, then you can provide an empty export statement:

```ts
export {}
```

Unfortunately, there is no other workaround for this problem. Please **do not** remove the `isolatedModules` flag from your tsconfig file, as this does not fix the problem, it only suppresses the error.

<!-- Issue: https://github.com/Microsoft/TypeScript/issues/18232 -->

## Unrestricted File Access and Auto-Imports
Any file in your project has the ability to import any given module file. You can also auto-import files in VS Code by attempting to reference an exported member of a given module.

However, a `ModuleScript` inside of `game.ServerStorage` should not be accessible by a `LocalScript`.

## Objects May Only Have String Keys
In TypeScript, objects may only have string keys, and arrays may only have numerical keys. This contrasts heavily with the wild west of Lua tables, where the keys can be mixed and of any type. In roblox-ts (and TypeScript), we can solve this problem by using a [`Map`](/types/interfaces/_es_d_.map.html) object. Maps are objects that hold arbitrary key-value pairs of data. They also support generic types:

```ts
const playerMap = new Map<Player, number>()
playerMap.set(somePlayer, 5)
```

[`Set`](/types/interfaces/_es_d_.set.html) is another useful data type that holds a set of unique values. It is akin to an array, but uniqueness is enforced.
