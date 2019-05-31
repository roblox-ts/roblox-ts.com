---
title: Types
order: 2
category: guides
description: A guide on how to validate and use types within roblox-ts.
---
# Method vs. Member Function Call Syntax
In Lua, there is a distinction between a standard member function call (`obj.func()`) and a method function call (`obj:method()`). The Lua method syntax implicitly passes the object itself as the first parameter in the call. Usually, this is used in combination with the function declaration shorthand which implicitly assigns the first parameter to the name `self` inside the function.

But in TypeScript, all member functions are indexed with a dot, as JavaScript has other rules on handling how `this` is set inside of a function. Additionally, TypeScript has two types of functions: *function declarations/expressions*, and *arrow functions*.

To reconcile the patterns found in the two languages when compiling to Lua, we assume that **arrow functions inside of objects are called as a regular function call**, and **function declarations/expressions are called with the method call syntax**. Arrow functions do not have a `this` binding in JavaScript, so it's reasonable to assume that this conceptually maps to a function called without a `self` value in Lua.

```ts
interface Example {
	calledWithMethodSyntax(): void
	
	calledWithDotSyntax: () => void
}
```
This feature of roblox-ts relies on **type information** to determine the correct Lua to emit, thus the types regarding calling related functions must be statically known at compile time. In other words, attempting to create a union type of a method-syntax and dot-syntax function will result in an error.
{:.warn}

## Overriding Method Call Behavior

As detailed above, by default function expressions/declarations are called with *method call syntax*. However, it is possible to override this behavior using a [`this` parameter](https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters).

```ts
interface Example {
	calledWithDotSyntax(this: void): void;
	calledWithMethodSyntax(): void;

	// Arrow function called with method syntax (opposite)
	arrowCalledWithMethodSyntax: (this: this) => void;
}
```
Above, we can see that the `this: void` annotation will override the default behavior, telling roblox-ts to call the function with the dot syntax.

Likewise, using `this: this` has the inverse effect: the function will be called with the method syntax. 

# Multiple Return Values
One of Lua's famous quirks is that its functions can return multiple values. Most languages, including TypeScript, do not have this capability, and model those situations with other constructs. In TypeScript, we generally use a [*tuple*](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple), which is just a fancy name for an array which has a set of known types in each of its indexes.

When writing type declarations for interacting with Lua code from TypeScript, it is often necessary to interface with functions that return multiple values. This is where the `LuaTuple<T>` type helper comes in: This is a generic type that tells the compiler to treat the given tuple as a *multiple return* instead of an array. If a function is typed as returning a `LuaTuple<T>`, its return values will be grouped into a TypeScript array/tuple automatically.

```ts
declare function returnsMultipleValues(): LuaTuple<[string, number]>;

// Result is wrapped in a Lua table, becoming an array:
const values = returnsMultipleValues(); // [string, number]

// Result is *not* wrapped in a table since it is destructured immediately:
const [theString, theNumber] = returnsMultipleValues();
```

You can also have your regular (non-declared) functions return a `LuaTuple<T>`, which functions semantically identically if you wish to write a function that returns multiple values with TypeScript.

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
TypeScript has a feature called *type narrowing* which allows TypeScript to intelligently narrow the possible type of a value when you use a *type guard* inside of a conditional. In vanilla TypeScript, the `typeof` operator can be used to narrow types. However, the `typeof` operator is not compatible with Lua or Roblox types, thus it is not allowed in roblox-ts code in the context of *values*. (The `typeof` operator in *types* is still valid: when `typeof` is used in a type, it converts a value into a type.) 

## `typeIs`
To solve this problem, roblox-ts adds a new global function `typeIs` to narrow types. `typeIs` is compatible with any type that Lua's `typeof` is compatible with.

```ts
const x = new Vector3() as unknown; // "unknown"

if (typeIs(x, "Vector3")) {
  x; // "Vector3"
}
```

See also: [Compiler Built-ins](/usage/compiler-builtins)
{:.info}

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4MTc1MTk0MzhdfQ==
-->