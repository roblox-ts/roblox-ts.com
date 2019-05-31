---
title: Installing from GitHub
order: 5
category: guides
description: Learn how to install roblox-ts from GitHub instead of NPM to be on the bleeding edge of new features and fixes.
---

If you'd like to use the latest features of **roblox-ts** before they get published to npm or you'd like to set up **roblox-ts** for local development, this guide can help.

1. Ensure your current copy of roblox-ts is uninstalled.:<br>
`npm remove -g roblox-ts`

2. `cd` into a directory where you'd like to keep your copy of **roblox-ts**<br>
`cd /path/to/dir`

3. Clone the **roblox-ts** git repo<br>
`git clone https://github.com/roblox-ts/roblox-ts.git`

4. `cd` into the cloned repo<br>
`cd roblox-ts`

5. Install TypeScript<br>
`npm install -g typescript`<br>
(use `sudo` if needed)

6. Install project dependencies<br>
`npm install`

7. Compile
`tsc`

8. Link to npm
`npm link`<br>
(use `sudo` if needed)

9. You can now run `rbxtsc` anywhere!

10. In order to update to the latest version<br>
`git pull` and then `tsc`