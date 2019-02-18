---
title: Project Structure
category: usage
order: 4
description: Details on how the roblox-ts compiler deals with project structure and files.
---

It is recommended that you store your game code in a folder called `src`. This folder can contain both Lua and TypeScript files. TypeScript files will be compiled to Lua, and Lua files are simply passed through into your out folder.

## Using Existing Lua code from TypeScript

In order to use Lua files from TypeScript, you can create a type declaration file of the same name replacing `.lua` with `.d.ts` placed in the same directory as your Lua file. This file should contain [type declarations](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html) for your Lua module's exported members.

## Scripts inside scripts
Most script syncing plugins (such as Rojo) support placing scripts inside of other scripts by naming a Lua file `init.lua` inside the directory, which becomes the parent of all other files in the directory. 

There is a similar pattern in TypeScript wherein importing a folder will search for a file named `index.ts` inside of it. Accordingly, files named `index.ts` will be compiled to `init.lua` to enable compatibility with both systems.