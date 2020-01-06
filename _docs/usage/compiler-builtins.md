---
title: Compiler Built-Ins
category: usage
order: 2
description: This page is a reference for all new APIs that roblox-ts adds that do not exist in Roblox.
---

roblox-ts adds extra API that do not exist in Roblox by default, both for convenience and to address shortcomings in the mapping process between TypeScript and Lua.

## Constructors

The following names exist as `new`able constructors:

- `Map`
    - `ReadonlyMap`
    - `WeakMap`
- `Set`
    - `ReadonlySet`
    - `WeakSet`
- `Array`

## `typeOf`

This function maps directly to Roblox's `typeof` function. The reason for this difference is because `typeof` is an operator in TypeScript, so it cannot be used directly.

## `typeIs`

This function is a type guard form of `typeOf`, which provides type narrowing. `typeIs` is compatible with any type that Lua's `typeof` function is compatible with.

```ts
const x = new Vector3() as unknown; // "unknown"

if (typeIs(x, "Vector3")) {
  x; // "Vector3"
}
```

## `classIs`

`classIs` is similar to `typeIs`, but provides type narrowing for Instances via the `ClassName` property. Comparing the `ClassName` property by hand does not provide such narrowing, because TypeScript's structural typing makes implementation difficult and complex. The `classIs` function is a compromise that keeps things simple while still offering `ClassName` narrowing:

```ts
const x = game.FindFirstChild("X");
if (x && classIs(x, "Model")) {
  x.BreakJoints();
}
```

## `opcall`

`opcall` (object pcall) is a function which makes working with pcall much easier by means of returning an object rather than a tuple with variant types.

The result object is in the shape:
```ts
{ success: true, value: T } | { success: false, error: string }
```
{:.no-compile}

## `PKG_VERSION`

`PKG_VERSION` is a global variable that is replaced with the version property from package.json at compile time.

`PKG_VERSION` is currently only available with `npm i roblox-ts@next`
{:.warn}

## `Object`

`Object` is a namespace which contains many utility methods for dealing with objects. These methods may be used on objects, arrays, Maps, and Sets.

### Methods

- `assign`
- `keys`
- `values`
- `isEmpty`
  - Returns true if the object is empty (`next(obj) == nil`).
- `copy`
  - Returns a shallow copy of the object.
- `deepCopy`
  - Returns a deep copy of the object.
- `deepEquals`
  - Returns true if the two objects are equal by value.

## `Promise`

`Promise` is a class which serves as our first-class async primitive. It also has many static utility methods, such as `Promise.resolve`. See [Promises](/docs/guides/promises) for more information.

## `Symbol`

`Symbol` is a function and a namespace which contains well-known symbols and utility methods.

To create a new symbol, you can call `Symbol('debug name')` just as in regular TypeScript.

### Well-known symbols

Currently, there is only one well-known symbol:

- `Symbol.iterator`
  - If this symbol is added as a method of an object or class, that object can then be directly iterated over in spread syntax (`...`) or `for..of` loops.

  ```ts
  const x = {
      [Symbol.iterator]: function*() {
          yield 1;
          yield 2;
          yield 3;
      }
  };

  print(...x);
  ```

### Methods

- `Symbol.for`
  - Returns a Symbol object from the global symbol registry matching the given key if found. Otherwise, returns a new symbol with this key.

- `Symbol.keyFor`
  - Returns the key name from the global symbol registry matching the given Symbol if found. Otherwise, returns a undefined.
