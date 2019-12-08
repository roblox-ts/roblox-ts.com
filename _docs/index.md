---
title: Introduction
order: 1
description: The roblox-ts docs.
---
Welcome to the **roblox-ts** docs!

roblox-ts aims to have feature parity with [TypeScript](http://www.typescriptlang.org/) where possible. However, a few features are not supported due to constraints when compiling to Lua.

When writing code with roblox-ts, all Lua built-in functions and APIs are available as well as the entire Roblox API.

These docs contain a list of articles specific to roblox-ts usage. If you're looking for more general TypeScript information, please refer to the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html).

## Motivation
As Roblox games become increasingly complex and larger in scope, efficiently writing safe code becomes challenging with Lua. In addition, Lua is difficult to make tooling for. Roblox Studio attempts to provide things like intellisense and autocomplete, but it's mostly just guessing.

roblox-ts is designed to solve these problems by compiling TypeScript code directly into Lua, tuned for use in Roblox specifically.

## Why TypeScript?
TypeScript is a type system that was built for a language without types (JavaScript). Because of the generic way that TypeScript is implemented, it's easy to use it for our purposes as well with Lua. TypeScript is also reasonably similar to Lua and already has ways to model many of the problems we need to solve.

From the user side of things, TypeScript already has *amazing* tooling support, something that Lua still lacks. VS Code has first-class support for TypeScript with a ton of workflow features that really shine when working with large code bases, such as go-to definition, rename symbol, peek definition, IntelliSense, import organization, automatic imports, and fixing imports upon moving a file just to name a few.

## Goals
*(What we want to do)*
- Provide static type checking for Roblox games.
- Always generate syntactically sound Lua.
- Maintain compatability with TypeScript tooling.
- Allow interoperability between TS<->Lua and Lua<->TS.
- Mirror data type APIs where there is missing functionality in Lua -- and augment data types in the spirit of JavaScript.
- Enable and encourage efficient development workflows.
- Optimize emitted Lua depending on context, but not at the cost of stability.

## Pillars
*(How we'll do it)*
- Stability over complexity.
- Prevent footguns wherever possible. Encourage falling into the pit of success!
- Do not assume developer intention when ambiguity arises.
- Be unopinionated about code style and project structure when feasible.

## Non-goals
*(What we don't want to do*)
- Implement/simulate the entire JavaScript API.
- Interoperability with vanilla TypeScript modules.
- Wrap or rename existing Lua APIs in order to make them more JavaScript-like.
- Take over the world.
