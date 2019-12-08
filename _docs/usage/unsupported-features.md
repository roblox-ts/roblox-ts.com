---
title: Unsupported Features
category: usage
order: 2
description: A list of intentional unsupported TypeScript features when using roblox-ts.
---

This page will keep track of TypeScript features that are unsupported within roblox-ts.

Any feature that is unsupported but not listed on this page is considered a bug! Please file an issue if you find something missing and it isn't listed here.

Some of these are intended removals, others may be added in the future!

- `null` (use `undefined` instead!)
- `delete` operator for dictionary key deletion is not type-safe so not supported (You should use a `Map` where possible)
- loop labels (used by `continue` and `break`)
- class or function prototypes
- regular expressions
- dynamic import expressions
- sparse arrays (`nil`/`undefined` in between valid elements)
- `typeof` operator in *values* (the `typeof` operator in *types* is still valid: when `typeof` is used in a type, it converts a value into a type.)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTcxMzI4ODg1XX0=
-->
