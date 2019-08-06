---
title: Quick Start
order: 2
description: A guide for getting up and going with roblox-ts.
---

# Getting Started

## Installation

In order to start using roblox-ts, you'll need to have the following installed:

- [NodeJS](https://nodejs.org/).
- A code editor. We recommend [VSCode](https://code.visualstudio.com/).
- [Rojo 0.5.x](https://rojo.space/docs/latest/guide/installation/). The easiest way to install it is through the [Rojo VSCode plugin](https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo). Make sure in your settings (`Ctrl + ,`) the "Rojo: Release Type" is set to "pre-release" if you install Rojo via the plugin.

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62527812-7cd01300-b801-11e9-981a-d97d8016176e.png"></p>

After installing NodeJS, you can install roblox-ts from the command line with:

```
npm install -g roblox-ts
```

## Usage

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
  --init                [string] [choices: "game", "model", "plugin", "package"]
  -v, --version      show version information                          [boolean]
  -h, --help         show help information                             [boolean]
```

## Project Folder Setup

Want an example? Check out our [demo project](https://github.com/roblox-ts/demo).
{:.info}

1\. Create a new folder and name it whatever you'd like. For example: `my-project`

2\. Open a terminal with the working directory set to your created folder. VSCode automatically does this when you `Open with Code`.

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62526363-b81d1280-b7fe-11e9-908e-8d476603c4e0.png"></p>

3\. Run `rbxtsc --init game` inside your folder. This will create the required files to get you started:

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62526796-92dcd400-b7ff-11e9-89cb-9a8ce31d818a.png"></p>

It's recommended that you don't run `rbxtsc --init` in a non-empty folder, as in the worst case it might lead to loss of data!
{:.alert}

4\. Open the file named `default.project.json`. This is where you can specify where the sub-folders of your `out` folder will sync into Studio. For more information, please read [Rojo's documentation](https://rojo.space/docs/latest/guide/new-game/).
{:.info}

The `include` folder should be placed in a shared container inside `ReplicatedStorage`.
{:.info}

5\. Start roblox-ts in watch mode via `rbxtsc -w`. You can exit watch mode later by clicking on the console and pressing `Ctrl+C` on your keyboard.

6\. Next, start up a Rojo server. If you are using the Rojo plugin, simply hit `Ctrl + Shift + P` and select "Start Server"

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62524010-83a75780-b7fa-11e9-8433-a522f06534df.png"></p>

Otherwise, open a new terminal and in it start Rojo via `rojo serve`. In VSCode a new terminal can be opened by pressing the `+` button.

<p align="center"><img src="https://user-images.githubusercontent.com/15217173/62504363-ba12b180-b7bd-11e9-9bfa-aa474ba6ee24.png"></p>

7\. Write code!

It is recommended that you peruse through the [Usage](/docs/usage/) and [Guides](/docs/guides/) sections as you get started.

roblox-ts is still in development and you may run into situations where invalid Lua is emitted. **Please report these cases to us** either by [creating an issue](https://github.com/roblox-ts/roblox-ts/issues) or joining our [Discord server](https://discord.gg/f6Rn6RY).
{:.warn}
