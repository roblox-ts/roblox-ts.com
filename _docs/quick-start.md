---
title: Quick Start
order: 1
description: A guide for getting up and going with roblox-ts.
---

# Getting Started

## Installation & Usage

In order to start using roblox-ts, you'll need to have NodeJS and npm installed. [You can download both from here.](https://nodejs.org/)

Next, from your command line install roblox-ts: `npm install -g roblox-ts`

You can now run roblox-ts with the command `rbxtsc`.

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
_**(warning: do not change these values unless you know what you are doing!)**_

5. Create a file for syncing your compiled .lua files to Roblox Studio. If you're using Rojo, this should be a `rojo.json` file and look like:

```js
{
	"name": "my-project-name",
	"servePort": 8000,
	"partitions": {
		"include": {
			"path": "include",
			"target": "ReplicatedStorage.RobloxTS.Include"
		},
		"modules": {
			"path": "modules",
			"target": "ReplicatedStorage.RobloxTS.Modules"
		}
	}
}
```
You should add more partitions for the subfolders of your `out` folder.

6. Run `npm install rbx-types` to install the Roblox API type definitions.

7. Start roblox-ts in watch mode `rbxtsc -w`

8. Run your sync program. If you're using Rojo, this is `rojo serve`

9. Write code!

It is recommended that you peruse through all of the docs to the left as you get started!
