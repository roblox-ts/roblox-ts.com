---
title: Quick Start
order: 2
description: A guide for getting up and going with roblox-ts.
---

# Getting Started

## Installation & Usage

In order to start using roblox-ts, you'll need to have NodeJS and npm installed. [You can download both from here.](https://nodejs.org/)

You will also need to install [Rojo 0.5.x](https://rojo.space/docs/latest/guide/installation/).

Next, from your command line install roblox-ts: `npm install -g roblox-ts`

You can now run roblox-ts with the command `rbxtsc -h`.

```
Usage: rbxtsc [options]

Options:
  -w, --watch        enable watch mode                                 [boolean]
  -p, --project      project path                                 [default: "."]
  --noInclude        do not copy runtime files        [boolean] [default: false]
  -i, --includePath  folder to copy runtime files to        [default: "include"]
  --minify, --min    minify emitted Lua code          [boolean] [default: false]
  --onSuccess        Command to run on watch success               [default: ""]
  --rojo, -r         Manually select Rojo configuration file       [default: ""]
  --init                         [string] [choices: "game", "bundle", "package"]
  -v, --version      show version information                          [boolean]
  -h, --help         show help information                             [boolean]
```

## Project Folder Setup

Want an example? Check out our [demo project](https://github.com/roblox-ts/demo).
{:.info}

We recommend that you write your TypeScript in [VS Code](https://code.visualstudio.com/) for the best experience. However, other editors like [Sublime Text](https://www.sublimetext.com/) and [Atom](https://atom.io/) are supported.

1. Create a new folder and name it whatever you'd like. For example: `MyCoolProject`

2. Run `rbxtsc --init game` inside your folder. This will create the required files to get you started:

<p align="center"><img src=https://i.imgur.com/Rlrw534.png></p>

It's recommended that you don't run `rbxtsc --init` in a non-empty folder, as in the worst case it might lead to loss of data!
{:.alert}

3. After generation, your directory should look like this:

<p align="center"><img src=https://i.imgur.com/hNPk82S.png></p>

At the moment, we can ignore the files `package.json` and `package-lock.json`.

4. Open the file named `tsconfig.json` in your project folder. The contents should look similar to this:

```js
{
	"compilerOptions": {
		// required
		"allowSyntheticDefaultImports": true,
		"isolatedModules": true,
		"downlevelIteration": true,
		"module": "commonjs",
		"noLib": true,
		"strict": true,
		"target": "es6",
		"typeRoots": [ "node_modules/@rbxts" ],

		// required, configurable
		"rootDir": "src",
		"outDir": "out",

		// optional
		"baseUrl": "src",
		"declaration": false,

		// optional, non-configurable
		"jsx": "react",
		"jsxFactory": "Roact.createElement"
	}
}
```
The `typeRoots` field must end in "node_modules/@rbxts". For example: "../node_modules/@rbxts" is valid, but "../node_modules/@roblox-ts" is not!
{:.warn}

Do not change these values unless you know what you are doing!
{:.warn}

The `rootDir` and `outDir` specify, respectively, the folders where roblox-ts will fetch your `.ts` files and place the compiled `.lua` files. You can change them if you want, but for now we'll stick with those.
{:.info}

5. Open the file named `default.project.json`. It's contents should look like this:

roblox-ts requires [Rojo 0.5.x](https://rojo.space/docs/latest/)
{:.warn}

```js
{
	"name": "roblox-ts-game",
	"tree": {
		"$className": "DataModel",
		"ServerScriptService": {
			"$className": "ServerScriptService",
			"TS": {
				"$path": "out/server"
			}
		},
		"ReplicatedStorage": {
			"$className": "ReplicatedStorage",
			"rbxts_include": {
				"$path": "include"
			},
			"TS": {
				"$path": "out/shared"
			}
		},
		"StarterPlayer": {
			"$className": "StarterPlayer",
			"StarterPlayerScripts": {
				"$className": "StarterPlayerScripts",
				"TS": {
					"$path": "out/client"
				}
			}
		}
	}
}
```
You should add more partitions for the sub-folders of your `out` folder. For more information, please read [Rojo's documentation](https://rojo.space/docs/latest/guide/new-game/).
{:.info}

The `include` folder should be placed in a shared container that can be accessed from anywhere like `ReplicatedStorage`.

6. Start roblox-ts in watch mode `rbxtsc -w`

If you changed the `include` folder location, instead run `rbxtsc -w -i <path-to-include>` and make sure that path exists in the rojo filesystem.
{:.warn}

7. Start Rojo (`rojo serve`)

8. Write code!

It is recommended that you peruse through the [Usage](/docs/usage/) and [Guides](/docs/guides/) sections as you get started.

roblox-ts is still in development and you may run into situations where invalid Lua is emitted. **Please report these cases to us** either by [creating an issue](https://github.com/roblox-ts/roblox-ts/issues) or joining our [Discord server](https://discord.gg/f6Rn6RY).
{:.warn}
