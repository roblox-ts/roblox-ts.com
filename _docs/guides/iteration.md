---
title: Iteration
order: 5
category: guides
description: A guide on how to iterate in roblox-ts.
---

This page documents how to efficiently iterate in roblox-ts.

# Iteration in roblox-ts is done through `for..of` loops

Since `v1.0.0-beta.5`, `Object` is now just a type. If you still want to use its functions (`Object.keys`/`Object.values`/`Object.entries`, etc.), you can import it from the [object-utils](https://www.npmjs.com/package/@rbxts/object-utils) package. {:.warn}

To iterate through an Array, you can use the `ipairs` or `pairs` iterators:

```ts
const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

for (const [i, num] of ipairs(fibonacci)) {
	print(i, num);
}
```
Or, for Arrays, you can just not use them at all if you don't need the index argument:

```ts
const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

for (const num of fibonacci) {
	print(num);
}
```

For objects, you can iterate through them using `pairs`:

```ts
const obj = { a: 1, b: 2, c: 3 } as const;

for (const [key, value] of pairs(obj)) {
	print(key, value);
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

It is considered bad practice to write to an Object while iterating through it. {:.warn}
