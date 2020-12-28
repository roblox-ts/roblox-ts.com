---
id: functions
title: Functions
---

### `assert()`
roblox-ts's assert uses "JavaScript truthiness" for it's condition. This means that `""` (empty string), `0`, and `NaN` values will cause the assertion to fail in addition to `undefined` and `false`.

The reason for this is so that we can take advantage of TypeScript's `asserts value` predicate feature.
```ts
function foo(instance: Instance) {
	assert(instance.IsA("Part"));
	print(instance.Size); // instance _must_ be a Part to reach this line
}
```

Because of this change, `assert(0)` or `assert("")` will cause an error in roblox-ts, but not in Luau.

### `typeOf()`
Unfortunately, TypeScript already has an operator named "typeof" in the form of `typeof x`. Because of this, we cannot expose the Luau `typeof()` function directly. To get around this, we compile `typeOf(value)` into `typeof(value)`.

### `typeIs()`
Checking types with `typeOf` is usually not very useful with roblox-ts unless you need the string value that is returned. This is because TypeScript cannot infer that your if-statement confirmed the value was type checked:

```ts
function foo(value: unknown) {
    if (typeOf(value) === "Vector3") {
        print(value.X); // error: value is still unknown!
    }
}
```

To get around this, `typeIs(value, "type")` compiles to `typeof(value) == "type"` and helps TypeScript infer the value was type checked:

```ts
function foo(value: unknown) {
    if (typeIs(value, "Vector3")) {
        print(value.X); // success!
    }
}
```

### `classIs()`
Similar to `typeIs`, `classIs(value, "ClassName")` compiles to `value.ClassName == "ClassName"`. This is useful for cases where you might want to avoid `instance.IsA()`.

```ts
function foo(value: Instance) {
    // value.IsA("Script") would return true for LocalScripts!
    if (classIs(value, "Script")) {
        print(value.Name);
    }
}
```

### `opcall()`
While `pcall` is available, it returns the type `LuaTuple<[false, string] | [true, T]>` which is difficult to use!

For example,
```ts
const [success, valueOrError] = pcall(() => 123);
// valueOrError is string | number
// if it worked -> number
// if it errored -> string

if (success) {
    print(valueOrError); // string | number
} else {
    print(valueOrError); // string | number
}
```

The problem here is that `success` and `valueOrError` are not linked after the destructure happens. You _can_ avoid destructuring the result, [but that makes things very hard to read](https://roblox-ts.com/playground/#code/MYewdgzgLgBATgUwgVwDawLwwA7AIaqoAURAlDBgHwwCMATAMykDcAUKwJYBmMRiK6ANoAGALrkA3qxgyYoSLABuBZAgrwkaKIJqi2snHA5goRZalUsYAemswwyALYAjBHFYBfGAlQQ1Ug3loGHNVdX4tHT1pWWwjEzMVBCtbGGh4gHNPIA).

To get around this, you can use `opcall` which works the same as `pcall`, but returns an object instead of the `LuaTuple<T>`.

```ts
// result is { success: true; value: T; } | { success: false; error: string; }
const result = opcall(() => 123);

if (result.success) {
    print(result.value); // number
} else {
    print(result.error); // string
}
```

### `identity()`

The `identity` macro compiles to just the inner value you pass into it, allowing for a zero-cost type constraint abstraction. This is useful for verifying that a given value is the type you expect:

```ts
interface MyInterface {
	a: number;
	b: string;
	c: boolean;
}

const objects = {
	abc: identity<MyInterface>({
		a: 123,
		b: "abc",
		c: true,
	}),
};
```