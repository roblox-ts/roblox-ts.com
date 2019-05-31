---
title: Quick Start
order: 2
description: A guide for getting up and going with roblox-ts.
---

# Getting Started

## Installation & Usage

In order to start using roblox-ts, you'll need to have NodeJS and npm installed. [You can download both from here.](https://nodejs.org/)

Next, from your command line install roblox-ts: `npm install -g roblox-ts`

You can now run roblox-ts with the command `rbxtsc -h`.

```
Usage: rbxtsc [options]

Options:
  -w, --watch        enable watch mode
  -p, --project      project path
  -i, --includePath  folder to copy runtime files to
  --noStrict         disable diagnostic checks (faster, unsafe)
  --noInclude        do not copy runtime files
  --modulesPath      folder to copy modules to
  --noHeuristics     disables api restriction heuristics
  -v, --version      show version information
  -h, --help         show help
```

## Project Folder Setup

We recommend that you write your TypeScript in [VS Code](https://code.visualstudio.com/) for the best experience. However, other editors like [Sublime Text](https://www.sublimetext.com/) and [Atom](https://atom.io/) are supported.

1. Create a new folder and name it whatever you'd like. For example: `MyCoolProject`

2. Run `npm init -y` inside of your folder. This will create your `package.json` file.

3. Create a folder called `src` to contain your TypeScript files.

4. Create a file named `tsconfig.json` in your project folder. The contents should look like this:

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
		"types": [ "rbx-types" ],

		// required, configurable
		"rootDir": "src",
		"outDir": "out",

		// optional
		"baseUrl": "src",
		"declaration": false,

		// optional, non-configurable
		"jsx": "react",
		"jsxFactory": "Roact.createElement"
	},
	"typeAcquisition": {
		"enable": true
	}
}
```
Do not change these values unless you know what you are doing!
{:.warn}

5\. Create Rojo project file for syncing your compiled .lua files to Roblox Studio. This should be a `default.project.json` file and look like:

```js
{
	"name": "roblox-ts-demo",
	"tree": {
		"$className": "DataModel",
		"ServerScriptService": {
			"$className": "ServerScriptService",
			"rbxts_include": {
				"$path": "include"
			},
			"TS": {
				"$path": "out/server"
			}
		},
		"ReplicatedStorage": {
			"$className": "ReplicatedStorage",
			"TS": {
				"$path": "out/shared"
			}
		},
		"StarterPlayer": {
			"$className": "StarterPlayer",
			"StarterPlayerScripts": {
				"$className": "StarterPlayerScripts",
				"TS": {
					"$path": "out/shared"
				}
			}
		}
	}
}
```
You should add more partitions for the sub-folders of your `out` folder.
The `include` folder should be placed in a shared container that can be accessed from anywhere like `ReplicatedStorage`.

6\. Run `npm install rbx-types` to install the Roblox API type definitions.

7\. Start roblox-ts in watch mode `rbxtsc -w`

8\. Start Rojo `rojo serve`

9\. Write code!

It is recommended that you peruse through the [Usage](/docs/usage/) and [Guides](/docs/guides/) sections as you get started.

roblox-ts is still in development and you may run into situations where invalid Lua is emitted. **Please report these cases to us** either by [creating an issue](https://github.com/roblox-ts/roblox-ts/issues) or joining our Discord server (link above).
{:.warn}