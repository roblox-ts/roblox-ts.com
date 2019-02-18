---
title: Roblox Enums
order: 3
category: guides
description: Usage information for Roblox Enums in roblox-ts
---

TypeScript has its own enum construct which is not directly compatible with Roblox Enums. Therefore, we generate Roblox Enums as TypeScript enums and convert them back to Roblox Enums in the compile step.

Roblox Enums differ from TypeScript enums in that Roblox Enums are objects that have properties whereas TypeScript enums are just stand-ins for primitive values. This is why TypeScript enums are assignable to number or string values (depending on how the enum is defined).

This is usually not a problem unless you want to access the members of Roblox Enum objects, such as [GetEnumItems](https://developer.roblox.com/articles/Enumeration) or the `Value` property. In this case, we provide a [rbx-enum](https://www.npmjs.com/package/rbx-enum) package which allows raw Roblox Enum access.

## Example

```ts
print(getEnumItem(Enum.RenderPriority.Camera).Value) // 200

getEnumItems(Enum.KeyCode).forEach(e => print(e.Name))
```