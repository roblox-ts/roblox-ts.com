---
title: Notable Supported Features
category: usage
order: 2
description: A list of some of the more notable and useful features supported by roblox-ts right now.
---

Here are some of the more notable and useful features of roblox-ts that are supported right now:

- The entire Roblox API is available and has type definitions, with automated generation and releases with Roblox updates.
- [Promises](/docs/guides/promises) with `new Promise`.
- async/await with promises.
- Promise cancellation.
- Map (Also WeakMap)
- Set (Also WeakSet)
- Array methods (.map, .filter, etc.)
- Object methods (.entries, .values, .keys)
- [String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods) (.concat, .split, etc.)
- Rest/spread syntax in objects and arrays
- [Try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) and object [throws](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
- Bitwise operations
- TSX for Roact with the [@rbxts/roact](https://github.com/roblox-ts/rbx-roact) package
- Files named `index.ts` will be compiled as `init.lua` in order to align with conventional [syncing plugin details](https://rojo.space/docs/latest/reference/sync-details/), allowing you to have scripts inside of other scripts in the game tree.
- Generator functions
- [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) with spread, destructuring, and loops

Some features of TypeScript are **not** supported for various reasons. You can view them under [Unsupported Features](/docs/usage/unsupported-features)
