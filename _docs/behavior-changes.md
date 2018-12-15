---
title: Changes in Behavior From Traditional TypeScript
order: 2
---
This page serves as a list of _intentional_ changes in behavior from traditional TypeScript functionality.

In general, these changes are made to remove bad behavior that TypeScript inherits from JavaScript.

***

## Conditional Truthiness of Empty Strings and 0
In general, conditionals in **roblox-ts** evaluate as you'd expect them to in Lua.

This means that `0`, `NaN`, and empty strings (`""`) are now truthy.

The only falsy values are `false` and `undefined`.

## Map and Set Values Are Not Ordered by Insertion
In TypeScript and JavaScript, `Map` and `Set` object values are kept in order by time of insertion when accessed. However, in roblox-ts, this is not the case for performance reasons, as [Maps are the only way we can represent all of the features of Lua tables](/docs/workflow-issues#objects-may-only-have-string-keys).

## Yielding
Because roblox-ts compiles down to Lua and in the Roblox API we have functions that can yield, it is possible to yield Lua the thread when writing roblox-ts code. This contrasts with JavaScript's concurrency model, where every function is non-blocking, using either callbacks or Promises for async operations. When you yield the current thread, the task scheduler in Roblox will resume another thread somewhere else in your code base automatically, and will resume your current thread at some time in the future (or possibly never if something goes wrong). This is a concept that is not present in JavaScript runtimes, so you should be aware of which functions yield in the Roblox API and understand the implications. Almost always, yielding should be avoided completely in favor of Promises in your own code.


***

## Removed Features
Some features from traditional TypeScript have been removed intentionally or not yet supported.
[You can find a list of them here.](https://github.com/roblox-ts/roblox-ts/wiki/Known-Unsupported-Features)
