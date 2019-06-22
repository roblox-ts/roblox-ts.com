---
title: Usage with Lemur
order: 3
category: guides
description: Learn how to use Lemur with roblox-ts and set up a continuous integration testing suite.
---
You can use **roblox-ts** without Roblox Studio through the use of [LPGHatGuy's lemur](https://github.com/LPGhatguy/lemur).

This is only really useful for testing new changes to the compiler and only supports a small subset of Roblox features. However, it does enable you to use the runtime library functions without changing any compiled code.

[Please refer to the lemur project README for installation instructions.](https://github.com/LPGhatguy/lemur#readme)

It's easiest to copy the `lib` folder into your project directory and rename it to `lemur`.

From here, you can create a file called `test.lua` at the root of your project directory. It should look something like this:

```Lua
package.path = package.path .. ";?/init.lua"
local lemur = require("lemur")

local habitat = lemur.Habitat.new()

local ReplicatedStorage = habitat.game:GetService("ReplicatedStorage")

local includeFolder = habitat:loadFromFs("include")
includeFolder.Name = "include"
includeFolder.Parent = ReplicatedStorage

pcall(function()
	local moduleFolder = habitat:loadFromFs("include/node_modules")
	moduleFolder.Name = "node_modules"
	moduleFolder.Parent = includeFolder
end)

local out = habitat:loadFromFs("out")
out.Name = "out"
out.Parent = ReplicatedStorage

habitat:require(out.main)
```

You may need to edit that file based on your project needs.

You will also need a suitable `default.project.json` Rojo file to describe where your code is in Roblox (or Lemur in this case).

```JSON
{
	"name": "lemur-test",
	"tree": {
		"ReplicatedStorage": {
			"$className": "ReplicatedStorage",
			"include": {
				"$path": "include"
			},
			"out": {
				"$path": "out"
			}
		}
	}
}
```

Finally, just compile and run with:<br>
`rbxtsc && lua test.lua`