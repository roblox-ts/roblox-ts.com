---
title: Iteration
order: 5
category: guides
description: A guide on how to iterate in roblox-ts.
---

This page documents how to efficiently iterate in roblox-ts:

# `for..of` Loops
`Object.keys`/`Object.values`/`Object.entries`/`Array.entries` all return arrays in roblox-ts, which allows us to use them in for..of loops:

```ts
const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

for (const [i, num] of fibonacci.entries()) {
	print(i, num);
}
```

In roblox-ts, our `Array.reverse` method returns a new array (unlike traditional TypeScript). You can also use these in `for..of` loops and expect optimized compiled code:

```ts
for (const [i, num] of fibonacci.reverse().entries()) {
	print(i, num);
}
```

For objects, you can iterate through them using `Object.entries` (`Object.keys`/`Object.values` work similarly):

```ts
const obj = { a: 1, b: 2, c: 3 } as const;

for (const [i, v] of Object.entries(obj)) {
	print(i, v);
}
```

The following objects can all be directly iterated over via the for..of loop:

```ts
for (const x of [0, 1]);
for (const x of "Hello, world");
for (const x of new Set(["a", "b", "c", "d", "e"]));
for (const [i, x] of new Map([["a", 1], ["b", 2], ["c", 3]]));
for (const [x] of "I am so cool".gmatch("%S+"));
for (const x of {
	*[Symbol.iterator]() {
		yield 1;
	},
});
```

Since `Object.keys`/`Object.values`/`Object.entries`/`Array.entries`/`Array.reverse` are optimized to `pairs` and numeric for loops, these optimized loops may be affected by writing to the object which is being iterated through. It is considered bad practice to write to an object while iterating through it. If the intention is to cache `Object.entries` *and then* iterate through it, simply put it in a variable above the for..of loop instead of having it in-line. {:.warn}
