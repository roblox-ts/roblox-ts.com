---
title: Packages
order: 3
category: guides
description: Learn how to create your own roblox-ts TypeScript package and publish it to npm.
---
**roblox-ts supports npm packages!**

All roblox-ts npm packages must be published under the [@rbxts npm org](https://www.npmjs.com/~rbxts). To be automatically added to the org, click [here](/join-org/).
.
`rbxtsc --init package`

A detailed guide is coming soon.
{:.info}

{% comment %}

## Package Installation
To install packages, use `npm install` followed by the name of the package within your project directory.

Your `default.project.json` file should have a partition to sync the `include` folder into studio. Refer to the roblox-ts [quick start guide](/docs/quick-start) for more information.

## Package Creation
Creating your own package is easy.

1. Give your package a name.<br>
**roblox-ts package names should _always_ begin with the prefix `rbx-`.**<br>
For example, `rbx-my-awesome-package`.

2. Create an empty project directory for your package.

3. Inside of this directory, run `npm init -y` to create a `package.json` file.

## TypeScript Packages
*If your package will contain TypeScript code follow these steps, otherwise skip to the "Lua Packages" section.*<br>
For an example of how a TypeScript-based package might look, check out [rbx-services](https://github.com/roblox-ts/rbx-services).

1. Create a `src` folder and copy the `tsconfig.json` from the roblox-ts [quick start guide](/docs/quick-start).

2. Inside of your `tsconfig.json` file, you should:
    - Add the following under "compilerOptions":
    `"declaration": true,`
    - And the following in the root of your tsconfig.json:
      ```js
      "include": [
		"./src/**/*"
      ]
      ```

3. Create your .ts files within your `src` folder.

4. Run `rbxtsc --noInclude` to create your `out` folder with generated .lua and .d.ts files inside of it.

5. Add a `"main"` field to `package.json` and have it point to your primary .lua file.

6. Add a `"typings"` field to `package.json` and have it point to your primary .d.ts file.

## Lua Packages

1. Copy your .lua files into your project directory.<br>
Either be at the root of the directory or within a subfolder like `./out/`.

2. Create a .d.ts file for your type definitions<br>
Generally, you'll want to use an export declaration for lua packages:
```ts
declare const exportedValue: MyType;
export = exportedValue;
```

3. Add a `"main"` field to `package.json` and have it point to your primary .lua file.

4. Add a `"typings"` field to `package.json` and have it point to your primary .d.ts file.

## Package Publishing

1. Ensure your `package.json` file looks correct.<br>
This includes stuff like author, description, repository, and version fields.

2. If your package is a TypeScript-based package, be sure to run `rbxtsc --noInclude` to make sure everything is compiled before publishing.

3. Use `npm adduser` to login with npm.

4. `npm publish` *(need to run this using root!)*

5. Share! 🎉

{% endcomment %}