---
title: Usage with Lemur
order: 3
category: guides
description: Learn how to use Lemur with roblox-ts and set up a continuous integration testing suite.
---
You can use **roblox-ts** without Roblox Studio through the use of [LPGHatGuy's lemur](https://github.com/LPGhatguy/lemur).

This is only really useful for testing new changes to the compiler and only supports a small subset of Roblox features. However, it does enable you to use the runtime library functions without changing any compiled code.

[Please refer to the lemur project README for installation instructions.](https://github.com/LPGhatguy/lemur#readme)

It's easiest to copy the `lib` folder and `init.lua` into a folder called `lemur` within your project directory.

![image](https://i.imgur.com/1ot41M6.png)

From here, you can create a file called `test.lua` at the root of your project directory. It should look something like this:

```Lua
package.path = package.path .. ";?/init.lua"
local lemur = require("lemur")

local habitat = lemur.Habitat.new()

local ReplicatedStorage = habitat.game:GetService("ReplicatedStorage")

local robloxTsFolder = lemur.Instance.new("Folder")
robloxTsFolder.Name = "RobloxTS"
robloxTsFolder.Parent = ReplicatedStorage

local includeFolder = habitat:loadFromFs("include")
includeFolder.Name = "Include"
includeFolder.Parent = robloxTsFolder

local moduleFolder = habitat:loadFromFs("modules")
moduleFolder.Name = "Modules"
moduleFolder.Parent = robloxTsFolder

local out = habitat:loadFromFs("out")
out.Name = "out"

habitat:require(out.main)
```

You may need to edit that file based on your project needs.

Finally, just compile and run with:<br>
`rbxtsc && lua5.1 test.lua`