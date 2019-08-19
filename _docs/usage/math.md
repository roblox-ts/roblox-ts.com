---
title: Data Type Math
category: usage
order: 2
description: This page explains how to represent operator overloading in TypeScript for Roblox data types.
---
One of the few downsides to using TypeScript is that it does not support operator overloading.

Usually this is fine, but with Roblox there are a few built-in classes that require operator overloading to use:
- [CFrame](/types/interfaces/_roblox_d_.cframe.html) (used for Instance Translations)
- [UDim](/types/interfaces/_roblox_d_.udim.html)
- [UDim2](h/types/interfaces/_roblox_d_.udim2.html) (Used for Roblox GUI Translation & Sizing)
- [Vector2](/types/interfaces/_roblox_d_.vector2.html)
- [Vector2int16](/types/interfaces/_roblox_d_.vector2int16.html)
- [Vector3](/types/interfaces/_roblox_d_.vector3int16.html) (Used for Instance Positioning & Velocities)
- [Vector3int16](/types/interfaces/_roblox_d_.vector3int16.html) 

To get around this, roblox-ts introduces a few macro methods on each of these classes in the form of "add", "sub", "mul", and "div".

```ts
let v0 = new Vector3(1, 2);
let v1 = new Vector3(3, 4);
let v2 = v0.add(v1);
```

the following will compile into:
```lua
local v0 = Vector3.new(1, 2);
local v1 = Vector3.new(3, 4);
local v2 = (v0 + v1);
```

The macro calls are properly typed so that TypeScript understands statically what each call returns.
```ts
let cf = new CFrame();
let v3 = new Vector3();
let x = cf.mul(v3); // TypeScript knows that `x` is of type `Vector3`
```

Additionally, you can chain these calls together and additional parentheses will ensure that the intended order is followed:
```ts
let x = v0
    .add(v1)
    .mul(v2)
    .div(v3)
    .sub(v4);
```

which compiles into
```lua
local x = ((((v0 + v1) * v2) / v3) - v4);
```
