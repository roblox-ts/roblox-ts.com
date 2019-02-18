---
title: Types
order: 2
category: guides
description: A guide on how to validate and use types within roblox-ts.
---

# Type Assertions
Type assertions are a way to override the type of any value in TypeScript. Type assertions are an "escape hatch" from the type system, and by that nature are dangerous if used incorrectly. Asserting a value's type does **not** do anything to the value itself, it only overrides the type that the compiler treats the value as. For example:

```ts
const x = "not a number" as number;

x; // hovering over X reveals "number", even though it's really a string.
```

Type assertions should be avoided and only used as a last resort when you are unable to express types with any other mechanism. Abuse of type assertions can lead to unexpected behavior and bugs because type soundness will no longer be guaranteed.

Many Roblox API members accept generic parameters to influence the return value of the function. For example, `Instance.FindFirstChild` returns `Instance | undefined` by default, but you can provide a type variable to be more specific than `Instance`:

```ts
const maybePart = workspace.FindFirstChild<Part>("Baseplate"); // Part | undefined
```

This form is available for many methods in the API, such as `CollectionService.GetTagged`, `GetChildren`, `WaitForChild`, data stores, etc. You should prefer using this generic form instead of using a type assertion.

## Non-Null Type Assertion Operator

TypeScript provides a `!` operator to assert that a value's type is non-null (not undefined). Sometimes TypeScript will report a type as `T | undefined`, when you know that it's never going to be undefined, such as when using `FindFirstChild` or `Players.LocalPlayer`. In these cases, you can append the `!` operator to a value which will remove `undefined` from the type, only leaving `T`. For example:

```ts
const part = workspace.FindFirstChild<Part>("Baseplate")!; // Part
```

# Instances and Roblox data types

In general, anywhere that you use `X.new()` in Lua, you can use `new X()` in TypeScript.

For Instances, accessing any untyped index (not a property or method) will result in `Instance` to represent direct child access from Instances in Lua. However, just as in Lua, blindly indexing into an Instance can be unsafe if the requested child doesn't actually exist.

Indexing a child results in `Instance`. If you want a more specific type, you can either use a type assertion:

```ts
const part = workspace.Baseplate as Part
```

Type assertions are a dangerous feature and should generally be avoided outside of trivial cases like this. For more information, see [Type Assertions](#type-assertions).
{:.alert}

...or you can use a generic form of `FindFirstChild`:

```ts
const part = workspace.FindFirstChild<Part>("Baseplate")!
```

# Type Narrowing
TypeScript has a feature called *type narrowing* which allows TypeScript to intelligently narrow the possible type of a value when you use a *type guard* inside of a conditional. For example, the `typeof` operator is a type guard:

```ts
const x = "hello" as unknown; // hovering over x indicates "any"

if (typeof x === "string") {
  x; // hovering over X indicates "string"
}
```

This works because TypeScript has special rules for statically analyzing `typeof` and `instanceof` when used inside of a conditional. However, the `typeof` operator is not compatible with Lua or Roblox types.

Support for the `typeof` operator as a value may be [removed soon](https://github.com/roblox-ts/roblox-ts/issues/250).
{:.warn}

## `typeIs`
To solve this problem, roblox-ts adds a new global function `typeIs` to narrow types. `typeIs` is compatible with any type that Lua's `typeof` is compatible with.

```ts
const x = new Vector3() as unknown; // "unknown"

if (typeIs(x, "Vector3")) {
  x; // "Vector3"
}
```

## `typeOf`

This feature is [coming soon](https://github.com/roblox-ts/roblox-ts/issues/250).
{:.warn}

If you instead want access to the return value of Roblox Lua's `typeof` function, you can use `typeOf`. `typeOf` is compiled to `typeof` in Lua. The reason for the difference in name is because `typeof` is an operator in TypeScript.

# Enums

TypeScript has its own enum construct which is not directly compatible with Roblox Enums. Therefore, we generate Roblox Enums as TypeScript enums and convert them back to Roblox Enums in the compile step.

Roblox Enums differ from TypeScript enums in that Roblox Enums are objects that have properties whereas TypeScript enums are just stand-ins for primitive values. This is why TypeScript enums are assignable to number or string values (depending on how the enum is defined).

This is usually not a problem unless you want to access the members of Roblox Enum objects, such as [GetEnumItems](https://developer.roblox.com/articles/Enumeration) or the `Value` property. In this case, we provide a [rbx-enum](https://www.npmjs.com/package/rbx-enum) package which allows raw Roblox Enum access.

## Example

```ts
print(getEnumItem(Enum.RenderPriority.Camera).Value) // 200

getEnumItems(Enum.KeyCode).forEach(e => print(e.Name))
```