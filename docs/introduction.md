---
id: introduction
title: Introduction
slug: /
---

:::caution
**roblox-ts should not be used in production until v1.0**
:::

<center><img src={require("../static/img/roblox-ts-256.png").default} /></center>

## What is roblox-ts?

In short, roblox-ts is a way to use the tooling and ecosystem surrounding TypeScript for Roblox development. This includes intellisense, IDE extensions, linters, code formatters, and more! It allows you to write TypeScript code that is then compiled into Luau code for use inside of Roblox.

roblox-ts works with both **TypeScript** files (`.ts`) _and_ **Lua**/**Luau** files (`.lua`) which are paired with TypeScript type definition files (`.d.ts`).

Typings for the Roblox API are partially handwritten and partially automatically generated from the Roblox API dump and Developer Hub documentation.

## Why should you use roblox-ts?

roblox-ts is great for managing large scale projects. Static types and intellisense allow you and your IDE to understand what your code is doing on a deeper level without having to mentally track what's going on. TypeScript's typing system allows you to clearly describe what each function expects as inputs and gives back as an output.

roblox-ts, TypeScript, and most of the related tooling is open source! This means you can hack it, tweak it, and customize it to your liking. roblox-ts supports [TypeScript transformer plugins](https://github.com/roblox-ts/roblox-ts/discussions/categories/transformers) which allow you to modify the behavior of the compiler itself! You can also write your own ESLint plugins to enforce certain rules on your code.

## Why should you _not_ use roblox-ts?

The biggest downside to using roblox-ts is debugging. When you use the Roblox Studio debugger (or when you encounter an error), you will see the compiled Luau code instead of TypeScript code. While we actively work to make the compiled Luau code as readable as possible, this does still introduce a bit of complexity. Usually, it's pretty easy to mentally map your compiled Luau code to your TypeScript code.

The silver lining here is that most of your bugs should be logical bugs anyway!
