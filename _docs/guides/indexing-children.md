---
title: Instance indexing
order: 6
category: guides
description: A guide on how to index descendants of instances in roblox-ts.
---

# Indexing Descendants of Instances

Many aspiring roblox-ts developers open up their first project to find that TS doesn't appreciate their attempts at referencing instances via the dot operator. When one hovers over each element of a dot access, TS indicates the problem is something like the following:

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62830780-fa1cce80-bbd9-11e9-871a-f422ccf23ccd.png"></p>

This happens because `script` is defined as a `LuaSourceContainer` and TS doesn't know whether or not `script.Parent` exists. And, even if it did, it would just be an `Instance` and there would be no way of knowing whether `Configuration` exists either. Hence, TS tells you the `Configuration` object is of type `any`, because it doesn't have any idea what it could be.

There are a few ways to approach this problem.

## Approach 1: Define a type

One solution to this problem is to simply assert that you **know** what type a particular variable is, and define it as the particular object tree you know it is.

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62830908-6ef10800-bbdc-11e9-8199-e2ef26e90143.png"></p>

###### Explanation: Above, we redefine the global `script` variable as having the type `LuaSourceContainer`, with a `ScreenGui` as a `Parent` which has a `Configuration` instance it it with an `IntValue` called "NumItems". The `&` symbol defines a type intersection, which means that something is two different types at the same time (as opposed to `|`, which means something is only one of the operand types). You can think of it like adding or merging two or more types together. If we defined an object of the type `{ NumItems: IntValue }`, then in Lua it should be a table that looks like `{ NumItems = <IntValue Instance> }` (it can have other entries, but must at least have a "NumItems" field of the type `IntValue` to be considered an object of the aforementioned type). When we say something is `Configuration & { NumItems: IntValue }`, then we are defining a `Configuration` instance with an accessible "NumItems" member. Where we define `LuaSourceContainer & { Parent: ScreenGui }`, we are *overriding* the regular `LuaSourceContainer.Parent` property and redefining it as a `ScreenGui` instead of `Instance | undefined`.

Here is another example defining a reusable type:

```ts
enum ItemType { A, B, C, D }

type ItemScreen = ScreenGui & {
	Configuration: Configuration & {
		NumItems: IntValue;
		ItemType: IntValue; // Value should be 0-3
	};
};

function printNumItems(itemScreen: ItemScreen) {
	print(itemScreen.Configuration.NumItems.Value);
}

const parent = script.Parent as ItemScreen;
print(ItemType[parent.Configuration.ItemType.Value]);
printNumItems(parent);
```

This approach works great for when you just need to assert that you know something is something else, but the downside to this approach is that there is no way to validate such a defined tree at run-time, without writing a custom function which returns `object is ItemScreen`. For use cases such as this, see the following method(s).

## Approach 2: validate-tree library

If you want to define a robust instance tree layout which can be validated or yielded for at run-time, you are going to need a library made specifically to do that. Luckily, Validark graciously created [validate-tree](https://www.npmjs.com/package/@rbxts/validate-tree) for this very purpose. Its usage looks as follows:

```ts
import {
	validateTree,
	EvaluateInstanceTree,
	yieldForTree
} from "@rbxts/validate-tree";

enum ItemType { A, B, C, D }

// define a Rojo-esque object tree , which can be validated at run-time
const ItemScreen = {
	$className: "ScreenGui",
	Configuration: {
		$className: "Configuration",
		NumItems: "IntValue",
		ItemType: { $className: "IntValue" }
	}
} as const; // preserves the literal type of each member

type ItemScreen = EvaluateInstanceTree<typeof ItemScreen>;

function printItemTypeName(itemScreen: ItemScreen) {
	print(ItemType[itemScreen.Configuration.ItemType.Value]);
}

const { Parent: parent } = script;

// if parent is defined and it matches the ItemScreen tree:
if (parent && validateTree(parent, ItemScreen)) {
	// parent is the type `ItemScreen`
	print(parent.Configuration.NumItems.Value);
	printItemTypeName(parent);
}

if (parent) {
	// returns a promise which yields until `parent` matches `ItemScreen`
	yieldForTree(parent, ItemScreen).then(itemScreen => {
		++itemScreen.Configuration.NumItems.Value;
	});

	// per usual, promises can yield the current thread via the `await` operator in async contexts
	async () => {
		const itemScreen = await yieldForTree(parent, ItemScreen);
		++itemScreen.Configuration.NumItems.Value;
	};
}
```

# Helper Plugin
Validark open-sourced a plugin which can auto-generate the object tree definitions used above. Simply click on the plugin with nothing selected to open the settings, or click the plugin with an instance selected to generate a definition for it.

[rbxts-object-to-tree plugin](https://www.roblox.com/library/3379119778/rbxts-object-to-tree)

[GitHub repo](https://github.com/Validark/rbxts-Object-To-Tree)

<img src="https://user-images.githubusercontent.com/15217173/62832063-8933e180-bbee-11e9-8e08-6bbba914a8f6.png"><img src="https://user-images.githubusercontent.com/15217173/62832037-25111d80-bbee-11e9-942f-5c02673d8d6a.png">
