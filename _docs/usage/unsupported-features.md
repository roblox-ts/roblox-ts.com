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
- `~` and `>>>` bitwise operators
- loop labels (used by `continue` and `break`)
- class or function prototypes
- class expressions
- regular expressions
- dynamic import expressions
- sparse arrays (`nil`/`undefined` in between valid elements)
